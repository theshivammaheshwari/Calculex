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
import { Coins, Wallet, ArrowUpRight } from "lucide-react-native";
import * as Haptics from "expo-haptics";

type CalculationType = "sip" | "lumpsum" | "step-up";

export default function SIPCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>("sip");
  const [amount, setAmount] = useState<string>("5000");
  const [years, setYears] = useState<string>("10");
  const [rate, setRate] = useState<string>("12");
  const [lumpsum, setLumpsum] = useState<string>("100000");
  const [stepUpRate, setStepUpRate] = useState<string>("10");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const calculateSIP = () => {
    const monthlyAmount = parseFloat(amount) || 0;
    const monthlyRate = (parseFloat(rate) || 0) / (12 * 100);
    const months = (parseFloat(years) || 0) * 12;
    
    if (months <= 0 || monthlyRate <= 0) return { futureValue: 0, totalInvestment: 0, totalReturns: 0 };
    
    const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = monthlyAmount * months;
    const totalReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
    };
  };

  const calculateStepUpSIP = () => {
    let totalInvestment = 0;
    let futureValue = 0;
    let monthlyAmount = parseFloat(amount) || 0;
    const monthlyRate = (parseFloat(rate) || 0) / (12 * 100);
    const yearsPeriod = parseFloat(years) || 0;
    const stepUp = parseFloat(stepUpRate) || 0;

    for (let year = 0; year < yearsPeriod; year++) {
      for (let month = 0; month < 12; month++) {
        totalInvestment += monthlyAmount;
        futureValue = (futureValue + monthlyAmount) * (1 + monthlyRate);
      }
      monthlyAmount += monthlyAmount * (stepUp / 100);
    }

    const totalReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
    };
  };

  const calculateLumpsum = () => {
    const principal = parseFloat(lumpsum) || 0;
    const annualRate = (parseFloat(rate) || 0) / 100;
    const yearsPeriod = parseFloat(years) || 0;
    
    const futureValue = principal * Math.pow(1 + annualRate, yearsPeriod);
    const totalReturns = futureValue - principal;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(principal),
      totalReturns: Math.round(totalReturns),
    };
  };

  const result = calculationType === "sip" 
    ? calculateSIP() 
    : calculationType === "step-up"
    ? calculateStepUpSIP()
    : calculateLumpsum();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const investmentPercent = result.futureValue > 0 ? (result.totalInvestment / result.futureValue) * 100 : 0;
  const returnsPercent = result.futureValue > 0 ? (result.totalReturns / result.futureValue) * 100 : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.typeSelector}>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCalculationType("sip");
              }}
              style={({ pressed }) => [
                styles.typeButton,
                calculationType === "sip" && styles.typeButtonActive,
                pressed && styles.buttonPressed,
              ]}
            >
              <Coins color={calculationType === "sip" ? "#fff" : "#667eea"} size={20} />
              <Text style={[styles.typeButtonText, calculationType === "sip" && styles.typeButtonTextActive]}>
                SIP
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCalculationType("step-up");
              }}
              style={({ pressed }) => [
                styles.typeButton,
                calculationType === "step-up" && styles.typeButtonActive,
                pressed && styles.buttonPressed,
              ]}
            >
              <ArrowUpRight color={calculationType === "step-up" ? "#fff" : "#667eea"} size={20} />
              <Text style={[styles.typeButtonText, calculationType === "step-up" && styles.typeButtonTextActive]}>
                Step-up
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCalculationType("lumpsum");
              }}
              style={({ pressed }) => [
                styles.typeButton,
                calculationType === "lumpsum" && styles.typeButtonActive,
                pressed && styles.buttonPressed,
              ]}
            >
              <Wallet color={calculationType === "lumpsum" ? "#fff" : "#667eea"} size={20} />
              <Text style={[styles.typeButtonText, calculationType === "lumpsum" && styles.typeButtonTextActive]}>
                Lumpsum
              </Text>
            </Pressable>
          </View>

          <View style={styles.inputCard}>
            {calculationType === "lumpsum" ? (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lumpsum Amount (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={lumpsum}
                  onChangeText={setLumpsum}
                  keyboardType="numeric"
                  placeholder="Enter lumpsum amount"
                  placeholderTextColor="#aaa"
                />
              </View>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Monthly Investment (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="Enter monthly amount"
                  placeholderTextColor="#aaa"
                />
              </View>
            )}

            {calculationType === "step-up" && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Annual Step-up Rate (%)</Text>
                <TextInput
                  style={styles.input}
                  value={stepUpRate}
                  onChangeText={setStepUpRate}
                  keyboardType="numeric"
                  placeholder="Enter step-up rate"
                  placeholderTextColor="#aaa"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Expected Return Rate (% per annum)</Text>
              <TextInput
                style={styles.input}
                value={rate}
                onChangeText={setRate}
                keyboardType="numeric"
                placeholder="Enter return rate"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Investment Period (Years)</Text>
              <TextInput
                style={styles.input}
                value={years}
                onChangeText={setYears}
                keyboardType="numeric"
                placeholder="Enter years"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          <View style={styles.resultsCard}>
            <LinearGradient
              colors={["#43e97b", "#38f9d7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.resultsGradient}
            >
              <Text style={styles.resultsTitle}>Investment Summary</Text>

              <View style={styles.chartContainer}>
                <View style={styles.chartBar}>
                  <View
                    style={[
                      styles.chartSegment,
                      styles.investmentSegment,
                      { width: `${investmentPercent}%` },
                    ]}
                  />
                  <View
                    style={[
                      styles.chartSegment,
                      styles.returnsSegment,
                      { width: `${returnsPercent}%` },
                    ]}
                  />
                </View>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.investmentDot]} />
                    <Text style={styles.legendText}>Investment ({investmentPercent.toFixed(1)}%)</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.returnsDot]} />
                    <Text style={styles.legendText}>Returns ({returnsPercent.toFixed(1)}%)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Total Investment</Text>
                <Text style={styles.resultValue}>
                  {formatCurrency(result.totalInvestment)}
                </Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Total Returns</Text>
                <Text style={styles.resultValue}>
                  {formatCurrency(result.totalReturns)}
                </Text>
              </View>

              <View style={[styles.resultRow, styles.totalRow]}>
                <Text style={[styles.resultLabel, styles.totalLabel]}>Future Value</Text>
                <Text style={[styles.resultValue, styles.totalValue]}>
                  {formatCurrency(result.futureValue)}
                </Text>
              </View>
            </LinearGradient>
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
  typeSelector: {
    flexDirection: "row" as const,
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  typeButtonActive: {
    backgroundColor: "#667eea",
    borderColor: "#667eea",
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#667eea",
  },
  typeButtonTextActive: {
    color: "#fff",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
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
  investmentSegment: {
    backgroundColor: "#4F46E5",
  },
  returnsSegment: {
    backgroundColor: "#10B981",
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
  investmentDot: {
    backgroundColor: "#4F46E5",
  },
  returnsDot: {
    backgroundColor: "#10B981",
  },
  legendText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600" as const,
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
  totalRow: {
    marginTop: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 22,
  },
});
