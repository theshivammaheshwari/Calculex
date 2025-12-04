import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RefreshCw } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface Results {
  newPrice: number;
  additionalShares: number;
  totalShares: number;
  refundAmount: number;
}

export default function StockSplitCalculator() {
  const [currentPrice, setCurrentPrice] = useState<string>("100");
  const [splitRatio, setSplitRatio] = useState<string>("1:2");
  const [sharesOwned, setSharesOwned] = useState<string>("100");
  const [results, setResults] = useState<Results | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const calculateSplit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const [newShares, oldShares] = splitRatio.split(":").map(Number);
    const price = parseFloat(currentPrice);
    const shares = parseFloat(sharesOwned);

    if (!newShares || !oldShares || newShares <= 0 || oldShares <= 0 || !price || !shares) {
      return;
    }

    const additionalSharesFloat = (shares / oldShares) * newShares;
    const additionalShares = Math.floor(additionalSharesFloat);
    const totalShares = shares + additionalShares;
    const newPrice = (price * shares) / totalShares;
    const fractionalShares = additionalSharesFloat - additionalShares;
    const refundAmount = fractionalShares * newPrice;

    setResults({
      newPrice: Number(newPrice.toFixed(2)),
      additionalShares,
      totalShares,
      refundAmount: Number(refundAmount.toFixed(2)),
    });
  };

  const clearFields = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentPrice("100");
    setSplitRatio("1:2");
    setSharesOwned("100");
    setResults(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.inputCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Stock Price</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={[styles.input, styles.inputWithSymbol]}
                  value={currentPrice}
                  onChangeText={setCurrentPrice}
                  keyboardType="numeric"
                  placeholder="Enter current price"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Stock Split Ratio</Text>
              <TextInput
                style={styles.input}
                value={splitRatio}
                onChangeText={setSplitRatio}
                placeholder="e.g., 1:2"
                placeholderTextColor="#aaa"
              />
              <Text style={styles.hint}>Format: New:Old (e.g., 1:2)</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of Shares Owned</Text>
              <TextInput
                style={styles.input}
                value={sharesOwned}
                onChangeText={setSharesOwned}
                keyboardType="numeric"
                placeholder="Enter number of shares"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              onPress={clearFields}
              style={({ pressed }) => [
                styles.button,
                styles.clearButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <RefreshCw color="#fff" size={20} />
              <Text style={styles.buttonText}>Clear</Text>
            </Pressable>

            <Pressable
              onPress={calculateSplit}
              style={({ pressed }) => [
                styles.button,
                styles.calculateButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Calculate</Text>
            </Pressable>
          </View>

          {results && (
            <View style={styles.resultsCard}>
              <LinearGradient
                colors={["#f093fb", "#f5576c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.resultsGradient}
              >
                <Text style={styles.resultsTitle}>Split Results</Text>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>New Stock Price</Text>
                  <Text style={styles.resultValue}>
                    {formatCurrency(results.newPrice)}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Additional Shares</Text>
                  <Text style={styles.resultValue}>
                    {results.additionalShares.toLocaleString("en-IN")}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Total Shares</Text>
                  <Text style={[styles.resultValue, styles.highlightValue]}>
                    {results.totalShares.toLocaleString("en-IN")}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Refund Amount</Text>
                  <Text style={styles.resultValue}>
                    {formatCurrency(results.refundAmount)}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    position: "relative" as const,
  },
  currencySymbol: {
    position: "absolute" as const,
    left: 16,
    top: 14,
    fontSize: 16,
    color: "#666",
    zIndex: 1,
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputWithSymbol: {
    paddingLeft: 36,
  },
  hint: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row" as const,
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  clearButton: {
    backgroundColor: "#ff9800",
  },
  calculateButton: {
    backgroundColor: "#43e97b",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700" as const,
  },
  resultsCard: {
    borderRadius: 16,
    overflow: "hidden" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  resultsGradient: {
    padding: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center" as const,
  },
  resultRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600" as const,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#fff",
  },
  highlightValue: {
    fontSize: 20,
  },
});
