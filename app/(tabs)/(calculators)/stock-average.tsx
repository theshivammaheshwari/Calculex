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
import { TrendingUp, RefreshCw } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface StockEntry {
  units: number;
  price: number;
}

interface Results {
  totalUnits: number;
  averagePrice: number;
  totalAmount: number;
}

export default function StockAverageCalculator() {
  const [entries, setEntries] = useState<StockEntry[]>([
    { units: 0, price: 0 },
    { units: 0, price: 0 },
  ]);
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const updateEntry = (index: number, field: keyof StockEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: parseFloat(value) || 0 };
    setEntries(newEntries);
  };

  const calculateAverage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsCalculating(true);
    
    setTimeout(() => {
      const totalUnits = entries.reduce((sum, entry) => sum + entry.units, 0);
      const totalValue = entries.reduce((sum, entry) => sum + (entry.units * entry.price), 0);
      const averagePrice = totalUnits ? totalValue / totalUnits : 0;

      setResults({
        totalUnits,
        averagePrice,
        totalAmount: totalValue,
      });
      setIsCalculating(false);
    }, 500);
  };

  const clearFields = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEntries(entries.map(() => ({ units: 0, price: 0 })));
    setResults(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateInvestment = (entry: StockEntry) => {
    return entry.units * entry.price;
  };



  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {entries.map((entry, index) => (
            <View key={index} style={styles.entryCard}>
              <LinearGradient
                colors={index === 0 ? ["#1e40af", "#3b82f6"] : ["#7c3aed", "#a855f7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.entryHeader}
              >
                <TrendingUp color="#fff" size={20} />
                <Text style={styles.entryTitle}>
                  {index === 0 ? 'First Purchase' : 'Second Purchase'}
                </Text>
              </LinearGradient>

              <View style={styles.entryContent}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Units</Text>
                  <TextInput
                    style={styles.input}
                    value={entry.units ? entry.units.toString() : ''}
                    onChangeText={(value) => updateEntry(index, 'units', value)}
                    keyboardType="numeric"
                    placeholder="Enter units"
                    placeholderTextColor="#aaa"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Price per share</Text>
                  <View style={styles.inputContainer}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                      style={[styles.input, styles.inputWithSymbol]}
                      value={entry.price ? entry.price.toString() : ''}
                      onChangeText={(value) => updateEntry(index, 'price', value)}
                      keyboardType="numeric"
                      placeholder="Enter price"
                      placeholderTextColor="#aaa"
                    />
                  </View>
                </View>

                <View style={styles.investmentInfo}>
                  <Text style={styles.investmentLabel}>
                    Amount invested in the {index === 0 ? '1st' : '2nd'} purchase:
                  </Text>
                  <Text style={[styles.investmentValue, index === 0 ? styles.blueText : styles.pinkText]}>
                    {formatCurrency(calculateInvestment(entry))}
                  </Text>
                </View>
              </View>
            </View>
          ))}

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
              onPress={calculateAverage}
              disabled={isCalculating}
              style={({ pressed }) => [
                styles.button,
                styles.calculateButton,
                pressed && styles.buttonPressed,
                isCalculating && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </Text>
            </Pressable>
          </View>

          {results && (
            <View style={styles.resultsCard}>
              <LinearGradient
                colors={["#059669", "#10b981"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.resultsGradient}
              >
                <Text style={styles.resultsTitle}>Results</Text>



                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Total units</Text>
                  <Text style={styles.resultValue}>
                    {results.totalUnits.toLocaleString('en-IN')}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Average Price</Text>
                  <Text style={[styles.resultValue, styles.highlightValue]}>
                    {formatCurrency(results.averagePrice)}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Total Amount</Text>
                  <Text style={styles.resultValue}>
                    {formatCurrency(results.totalAmount)}
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
  entryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    padding: 16,
    gap: 12,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#fff",
  },
  entryContent: {
    padding: 16,
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
  investmentInfo: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
  },
  investmentLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  investmentValue: {
    fontSize: 18,
    fontWeight: "700" as const,
  },
  blueText: {
    color: "#1e40af",
  },
  pinkText: {
    color: "#7c3aed",
  },
  buttonRow: {
    flexDirection: "row" as const,
    gap: 12,
    marginVertical: 16,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700" as const,
  },
  resultsCard: {
    borderRadius: 16,
    overflow: "hidden" as const,
    marginTop: 8,
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
    alignItems: "center" as const,
    marginBottom: 20,
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
