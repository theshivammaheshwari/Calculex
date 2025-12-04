import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FutureValueCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>("100");
  const [rate, setRate] = useState<string>("10");
  const [years, setYears] = useState<string>("5");
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const principal = parseFloat(initialAmount) || 0;
    const interestRate = (parseFloat(rate) || 0) / 100;
    const timePeriod = parseFloat(years) || 0;

    if (principal > 0 && timePeriod >= 0) {
      const calculatedFutureValue = principal * Math.pow(1 + interestRate, timePeriod);
      const calculatedInterest = calculatedFutureValue - principal;
      
      setFutureValue(Number(calculatedFutureValue.toFixed(2)));
      setTotalInterest(Number(calculatedInterest.toFixed(2)));
    } else {
      setFutureValue(0);
      setTotalInterest(0);
    }
  }, [initialAmount, rate, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const principalAmount = parseFloat(initialAmount) || 0;
  const principalPercent = futureValue > 0 ? (principalAmount / futureValue) * 100 : 0;
  const interestPercent = futureValue > 0 ? (totalInterest / futureValue) * 100 : 0;

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
              <Text style={styles.label}>Initial Amount (₹)</Text>
              <TextInput
                style={styles.input}
                value={initialAmount}
                onChangeText={setInitialAmount}
                keyboardType="numeric"
                placeholder="Enter initial amount"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rate of Interest (%)</Text>
              <TextInput
                style={styles.input}
                value={rate}
                onChangeText={setRate}
                keyboardType="numeric"
                placeholder="Enter interest rate"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time Period (Years)</Text>
              <TextInput
                style={styles.input}
                value={years}
                onChangeText={setYears}
                keyboardType="numeric"
                placeholder="Enter time period"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          <View style={styles.resultsCard}>
            <LinearGradient
              colors={["#fa709a", "#fee140"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.resultsGradient}
            >
              <Text style={styles.resultsTitle}>Future Value</Text>
              <Text style={styles.futureValueAmount}>{formatCurrency(futureValue)}</Text>

              <View style={styles.chartContainer}>
                <View style={styles.chartBar}>
                  <View
                    style={[
                      styles.chartSegment,
                      styles.principalSegment,
                      { width: `${principalPercent}%` },
                    ]}
                  />
                  <View
                    style={[
                      styles.chartSegment,
                      styles.interestSegment,
                      { width: `${interestPercent}%` },
                    ]}
                  />
                </View>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.principalDot]} />
                    <Text style={styles.legendText}>Principal ({principalPercent.toFixed(1)}%)</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.interestDot]} />
                    <Text style={styles.legendText}>Interest ({interestPercent.toFixed(1)}%)</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Present Value</Text>
                <Text style={styles.summaryValue}>{formatCurrency(principalAmount)}</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Interest</Text>
                <Text style={[styles.summaryValue, styles.interestValue]}>
                  {formatCurrency(totalInterest)}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Future Value</Text>
                <Text style={[styles.summaryValue, styles.futureValue]}>
                  {formatCurrency(futureValue)}
                </Text>
              </View>
            </View>
          </View>
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
  input: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  resultsCard: {
    borderRadius: 16,
    overflow: "hidden" as const,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  resultsGradient: {
    padding: 24,
    alignItems: "center" as const,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#fff",
    marginBottom: 12,
  },
  futureValueAmount: {
    fontSize: 42,
    fontWeight: "800" as const,
    color: "#fff",
    marginBottom: 24,
  },
  chartContainer: {
    width: "100%",
    marginTop: 16,
  },
  chartBar: {
    flexDirection: "row" as const,
    height: 40,
    borderRadius: 20,
    overflow: "hidden" as const,
    marginBottom: 16,
  },
  chartSegment: {
    height: "100%",
  },
  principalSegment: {
    backgroundColor: "#1e3a8a",
  },
  interestSegment: {
    backgroundColor: "#ea580c",
  },
  chartLegend: {
    flexDirection: "row" as const,
    justifyContent: "space-around" as const,
  },
  legendItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  principalDot: {
    backgroundColor: "#1e3a8a",
  },
  interestDot: {
    backgroundColor: "#ea580c",
  },
  legendText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600" as const,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  summaryItem: {
    alignItems: "center" as const,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#333",
  },
  interestValue: {
    color: "#ea580c",
  },
  futureValue: {
    color: "#1e3a8a",
  },
});
