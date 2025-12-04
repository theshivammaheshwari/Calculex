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
import { Plus, X } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface ExpenseItem {
  type: string;
  amount: number;
}

export default function TripCalculator() {
  const [distance, setDistance] = useState<string>("530");
  const [fuelEfficiency, setFuelEfficiency] = useState<string>("15");
  const [fuelCostPerLiter, setFuelCostPerLiter] = useState<string>("100");
  const [people, setPeople] = useState<string>("4");
  const [additionalExpenses, setAdditionalExpenses] = useState<ExpenseItem[]>([
    { type: "Food", amount: 500 },
  ]);
  const [expenseType, setExpenseType] = useState<string>("Food");
  const [expenseAmount, setExpenseAmount] = useState<string>("");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fuelRequired = (parseFloat(distance) || 0) / (parseFloat(fuelEfficiency) || 1);
  const fuelCost = fuelRequired * (parseFloat(fuelCostPerLiter) || 0);
  const totalAdditionalExpenses = additionalExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalTripCost = fuelCost + totalAdditionalExpenses;
  const peopleCount = parseFloat(people) || 1;
  const costPerPerson = peopleCount > 0 ? totalTripCost / peopleCount : totalTripCost;

  const handleAddExpense = () => {
    if (expenseAmount && Number(expenseAmount) > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setAdditionalExpenses([
        ...additionalExpenses,
        { type: expenseType, amount: Number(expenseAmount) },
      ]);
      setExpenseAmount("");
    }
  };

  const handleRemoveExpense = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updatedExpenses = [...additionalExpenses];
    updatedExpenses.splice(index, 1);
    setAdditionalExpenses(updatedExpenses);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
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
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trip Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Distance (km)</Text>
              <TextInput
                style={styles.input}
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
                placeholder="Enter distance"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fuel Efficiency (km/L)</Text>
              <TextInput
                style={styles.input}
                value={fuelEfficiency}
                onChangeText={setFuelEfficiency}
                keyboardType="numeric"
                placeholder="Enter fuel efficiency"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fuel Cost per Liter (₹)</Text>
              <TextInput
                style={styles.input}
                value={fuelCostPerLiter}
                onChangeText={setFuelCostPerLiter}
                keyboardType="numeric"
                placeholder="Enter fuel cost"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of People</Text>
              <TextInput
                style={styles.input}
                value={people}
                onChangeText={setPeople}
                keyboardType="numeric"
                placeholder="Enter number of people"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Additional Expenses</Text>
            
            <View style={styles.addExpenseRow}>
              <TextInput
                style={[styles.input, styles.expenseTypeInput]}
                value={expenseType}
                onChangeText={setExpenseType}
                placeholder="Type (e.g., Food)"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={[styles.input, styles.expenseAmountInput]}
                value={expenseAmount}
                onChangeText={setExpenseAmount}
                keyboardType="numeric"
                placeholder="Amount"
                placeholderTextColor="#aaa"
              />
              <Pressable
                onPress={handleAddExpense}
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Plus color="#fff" size={20} />
              </Pressable>
            </View>

            <View style={styles.expensesList}>
              {additionalExpenses.map((expense, index) => (
                <View key={index} style={styles.expenseItem}>
                  <View style={styles.expenseInfo}>
                    <Text style={styles.expenseType}>{expense.type}</Text>
                    <Text style={styles.expenseAmount}>{formatCurrency(expense.amount)}</Text>
                  </View>
                  <Pressable
                    onPress={() => handleRemoveExpense(index)}
                    style={({ pressed }) => [
                      styles.removeButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <X color="#EF4444" size={20} />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.summaryCard}>
            <LinearGradient
              colors={["#30cfd0", "#330867"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryGradient}
            >
              <Text style={styles.summaryTitle}>Trip Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Fuel Required</Text>
                <Text style={styles.summaryValue}>{fuelRequired.toFixed(2)} L</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Fuel Cost</Text>
                <Text style={styles.summaryValue}>{formatCurrency(fuelCost)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Additional Expenses</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalAdditionalExpenses)}</Text>
              </View>

              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={[styles.summaryLabel, styles.totalLabel]}>Total Trip Cost</Text>
                <Text style={[styles.summaryValue, styles.totalValue]}>
                  {formatCurrency(totalTripCost)}
                </Text>
              </View>

              <View style={[styles.summaryRow, styles.perPersonRow]}>
                <Text style={[styles.summaryLabel, styles.perPersonLabel]}>Per Person</Text>
                <Text style={[styles.summaryValue, styles.perPersonValue]}>
                  {formatCurrency(costPerPerson)}
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
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#333",
    marginBottom: 16,
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
  addExpenseRow: {
    flexDirection: "row" as const,
    gap: 8,
    marginBottom: 16,
  },
  expenseTypeInput: {
    flex: 1,
  },
  expenseAmountInput: {
    flex: 1,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: "#10B981",
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  expensesList: {
    gap: 8,
  },
  expenseItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
  },
  expenseInfo: {
    flex: 1,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginRight: 12,
  },
  expenseType: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600" as const,
  },
  expenseAmount: {
    fontSize: 14,
    color: "#667eea",
    fontWeight: "700" as const,
  },
  removeButton: {
    width: 32,
    height: 32,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  summaryCard: {
    borderRadius: 16,
    overflow: "hidden" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryGradient: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center" as const,
  },
  summaryRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600" as const,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#fff",
  },
  totalRow: {
    marginTop: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 20,
  },
  perPersonRow: {
    marginTop: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  perPersonLabel: {
    fontSize: 16,
  },
  perPersonValue: {
    fontSize: 22,
  },
});
