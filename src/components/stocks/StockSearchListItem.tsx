import { FC, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import { StockRow } from "./StockRow";
import { Modal } from "../ui/Modal";
import { ThemedText } from "../ui/ThemedText";
import { ThemedView } from "../ui/ThemedView";
import { Loading } from "../ui/Loading";
import { Stock, getStockRecommendations } from "@/api/stocks";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Button, ButtonText } from "../ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { LegendDot } from "./LegendDot";

export interface StockSearchListItemProps extends TouchableOpacityProps {
  stock: Stock;
}

export const StockSearchListItem: FC<StockSearchListItemProps> = ({
  stock,
  ...props
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["stock", stock.symbol],
    queryFn: () => getStockRecommendations({ symbol: stock.symbol }),
    enabled: isOpen,
  });

  const { recommendations = [], quote } = data ?? {};
  const chartWidth = Dimensions.get("window").width - Spacing.five * 2;

  const renderInfo = () => {
    if (!isOpen) return null;
    if (isLoading || isRefetching)
      return <Loading style={{ marginBlock: Spacing.five }} />;
    if (error)
      return (
        <View>
          <ThemedText type="small" themeColor="error">
            Failed to load recommendations
          </ThemedText>
          <Button onPress={() => refetch()}>
            <ButtonText>Try Again</ButtonText>
          </Button>
        </View>
      );

    return (
      <ScrollView contentContainerStyle={{ gap: Spacing.five }}>
        {renderStats()}
        {renderRecommendations()}
      </ScrollView>
    );
  };

  const renderStats = () => {
    if (!quote) return null;
    const quoteDetails = {
      High: `$${quote?.highPriceOfTheDay}`,
      Low: `$${quote?.lowPriceOfTheDay}`,
      Open: `$${quote?.openPriceOfTheDay}`,
      "Prev Close": `$${quote?.previousClosePrice}`,
    };

    const up = quote?.percentChange > 0;
    return (
      <>
        <View>
          <ThemedText type="link" style={styles.price}>
            ${quote?.currentPrice}
            {"  "}
            <ThemedText type="default" style={up ? styles.up : styles.down}>
              <Ionicons name={up ? "chevron-up-sharp" : "chevron-down-sharp"} />{" "}
              {quote?.percentChange}%
            </ThemedText>
          </ThemedText>
        </View>
        <View>
          <ThemedText type="smallBold" style={styles.subtitle}>
            Stats
          </ThemedText>
          <View style={styles.stats}>
            {Object.entries(quoteDetails).map(([key, value]) => (
              <ThemedText type="smallBold" key={key}>
                {key}
                {"\n"}
                <ThemedText type="small">{value}</ThemedText>
              </ThemedText>
            ))}
          </View>
        </View>
      </>
    );
  };

  const renderRecommendations = () => {
    if (recommendations.length === 0)
      return (
        <ThemedText type="small" themeColor="textSecondary">
          No recommendations available
        </ThemedText>
      );
    const stackData = recommendations.map((rec) => ({
      stacks: [
        { value: rec.strongSell, color: "#c0392b" },
        { value: rec.sell, color: "#e67e22" },
        { value: rec.hold, color: "#f1c40f" },
        { value: rec.buy, color: "#2ecc71" },
        { value: rec.strongBuy, color: "#27ae60" },
      ],
      label: new Date(rec.period).toLocaleDateString(),
    }));
    return (
      <View style={styles.recommendations}>
        <ThemedText type="smallBold" style={styles.subtitle}>
          Recommendations
        </ThemedText>
        <BarChart
          stackData={stackData}
          spacing={50}
          noOfSections={5}
          width={chartWidth}
          barWidth={30}
          isAnimated
          xAxisColor={theme.textSecondary}
          yAxisColor={theme.textSecondary}
          yAxisTextStyle={{ color: theme.textSecondary }}
          xAxisLabelTextStyle={{ color: theme.textSecondary }}
        />
        <ThemedView style={styles.legend}>
          <LegendDot color="#27ae60" label="Strong buy" />
          <LegendDot color="#2ecc71" label="Buy" />
          <LegendDot color="#f1c40f" label="Hold" />
          <LegendDot color="#e67e22" label="Sell" />
          <LegendDot color="#c0392b" label="Strong sell" />
        </ThemedView>
      </View>
    );
  };

  return (
    <TouchableOpacity {...props} onPress={() => setIsOpen(!isOpen)}>
      <StockRow stock={stock} />
      <Modal visible={isOpen} onRequestClose={() => setIsOpen(false)}>
        <ThemedText type="subtitle">
          {stock.description}{" "}
          <ThemedText type="small" themeColor="textSecondary">
            ({stock.displaySymbol})
          </ThemedText>
        </ThemedText>
        {renderInfo()}
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
    justifyContent: "center",
  },
  up: {
    color: "#27ae60",
  },
  down: {
    color: "#c0392b",
  },
  price: {
    fontSize: 24,
  },
  stats: {
    flexDirection: "row",
    columnGap: Spacing.five,
    flexWrap: "wrap",
  },
  subtitle: { fontSize: 18, marginBottom: Spacing.two },
  recommendations: {
    gap: Spacing.two,
  },
});
