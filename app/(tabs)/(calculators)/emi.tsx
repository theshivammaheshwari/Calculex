import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IndianRupee } from "lucide-react-native";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState<string>("1000000");
  const [rate, setRate] = useState<string>("10.5");
  const [time, setTime] = useState<string>("5");
  const [emi, setEMI] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const P = parseFloat(principal) || 0;
    const R = (parseFloat(rate) || 0) / (12 * 100);
    const N = (parseFloat(time) || 0) * 12;

    if (P > 0 && R > 0 && N > 0) {
      const emiAmount = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalAmountPayable = emiAmount * N;
      const totalInterestAmount = totalAmountPayable - P;

      setEMI(emiAmount);
      setTotalInterest(totalInterestAmount);
      setTotalAmount(totalAmountPayable);
    }
  }, [principal, rate, time]);



  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const principalPercent = totalAmount > 0 ? (parseFloat(principal) / totalAmount) * 100 : 0;
  const interestPercent = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Loan Amount (₹)</Text>
              <TextInput
                style={styles.input}
                value={principal}
                onChangeText={setPrincipal}
                keyboardType="numeric"
                placeholder="Enter loan amount"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Interest Rate (% per annum)</Text>
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
              <Text style={styles.label}>Loan Term (Years)</Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={setTime}
                keyboardType="numeric"
                placeholder="Enter loan term"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          <View style={styles.emiCard}>
            <LinearGradient
              colors={["#4F46E5", "#7C3AED"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emiGradient}
            >
              <IndianRupee color="#fff" size={32} />
              <Text style={styles.emiLabel}>Monthly EMI</Text>
              <Text style={styles.emiValue}>{formatCurrency(emi)}</Text>
            </LinearGradient>
          </View>

          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Loan Breakdown</Text>
            
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

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Principal Amount</Text>
                <Text style={[styles.detailValue, styles.principalText]}>
                  {formatCurrency(parseFloat(principal) || 0)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Interest</Text>
                <Text style={[styles.detailValue, styles.interestText]}>
                  {formatCurrency(totalInterest)}
                </Text>
              </View>
              <View style={[styles.detailRow, styles.totalRow]}>
                <Text style={[styles.detailLabel, styles.totalLabel]}>Total Amount</Text>
                <Text style={[styles.detailValue, styles.totalValue]}>
                  {formatCurrency(totalAmount)}
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
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
  emiCard: {
    borderRadius: 16,
    overflow: "hidden" as const,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  emiGradient: {
    padding: 24,
    alignItems: "center" as const,
  },
  emiLabel: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 12,
    fontWeight: "600" as const,
  },
  emiValue: {
    fontSize: 36,
    fontWeight: "800" as const,
    color: "#fff",
    marginTop: 8,
  },
  breakdownCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  breakdownTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#333",
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 24,
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
    backgroundColor: "#4F46E5",
  },
  interestSegment: {
    backgroundColor: "#EF4444",
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
    backgroundColor: "#4F46E5",
  },
  interestDot: {
    backgroundColor: "#EF4444",
  },
  legendText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600" as const,
  },
  detailsContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  detailRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500" as const,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "700" as const,
  },
  principalText: {
    color: "#4F46E5",
  },
  interestText: {
    color: "#EF4444",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#e0e0e0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#333",
  },
  totalValue: {
    fontSize: 20,
    color: "#10B981",
  },
});
