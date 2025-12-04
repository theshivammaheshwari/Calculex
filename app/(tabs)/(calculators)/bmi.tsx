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
import * as Haptics from "expo-haptics";

type Gender = "male" | "female";
type Unit = "metric" | "imperial";

export default function BMICalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<string>("33");
  const [height, setHeight] = useState<string>("173");
  const [weight, setWeight] = useState<string>("75");
  const [unit, setUnit] = useState<Unit>("metric");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const h = parseFloat(height) || 0;
    const w = parseFloat(weight) || 0;

    if (h <= 0 || w <= 0) {
      setBmi(null);
      setBmiCategory("");
      return;
    }

    let bmiValue: number;

    if (unit === "metric") {
      bmiValue = w / Math.pow(h / 100, 2);
    } else {
      bmiValue = 703 * (w / Math.pow(h, 2));
    }

    bmiValue = parseFloat(bmiValue.toFixed(2));
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setBmiCategory("Normal");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obesity");
    }
  }, [height, weight, unit]);



  const getColorByCategory = (category: string) => {
    switch (category) {
      case "Underweight":
        return "#F59E0B";
      case "Normal":
        return "#10B981";
      case "Overweight":
        return "#F97316";
      case "Obesity":
        return "#EF4444";
      default:
        return "#888";
    }
  };

  const toggleUnit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (unit === "metric") {
      setHeight((Math.round((parseFloat(height) || 0) / 2.54)).toString());
      setWeight((Math.round((parseFloat(weight) || 0) * 2.205)).toString());
      setUnit("imperial");
    } else {
      setHeight((Math.round((parseFloat(height) || 0) * 2.54)).toString());
      setWeight((Math.round((parseFloat(weight) || 0) / 2.205)).toString());
      setUnit("metric");
    }
  };

  const getBmiPosition = () => {
    if (!bmi) return 0;

    let position = 0;
    if (bmi < 18.5) {
      position = (bmi / 18.5) * 25;
    } else if (bmi < 25) {
      position = 25 + ((bmi - 18.5) / 6.5) * 25;
    } else if (bmi < 30) {
      position = 50 + ((bmi - 25) / 5) * 25;
    } else {
      position = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
    }

    return Math.min(Math.max(position, 0), 100);
  };

  const getMessage = () => {
    if (!bmiCategory) return null;

    if (bmiCategory === "Normal") {
      return (
        <Text style={styles.messageNormal}>
          Great job! You have a healthy weight.
        </Text>
      );
    }

    if (bmiCategory === "Underweight") {
      return (
        <Text style={styles.messageWarning}>
          Time to gain some weight!
        </Text>
      );
    }

    return (
      <View>
        <Text style={styles.messageDanger}>Time to run!</Text>
        <Text style={styles.messageSubtext}>
          By maintaining a healthy weight, you lower your risk of developing serious health problems.
        </Text>
      </View>
    );
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
            <View style={styles.genderSelector}>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setGender("male");
                }}
                style={[
                  styles.genderButton,
                  gender === "male" && styles.genderButtonMaleActive,
                ]}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === "male" && styles.genderButtonTextActive,
                  ]}
                >
                  Male
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setGender("female");
                }}
                style={[
                  styles.genderButton,
                  gender === "female" && styles.genderButtonFemaleActive,
                ]}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === "female" && styles.genderButtonTextActive,
                  ]}
                >
                  Female
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age (years)</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholder="Enter age"
                placeholderTextColor="#aaa"
              />
              <Text style={styles.hint}>Between 2 years to 120 years</Text>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Height ({unit === "metric" ? "cm" : "inches"})
                </Text>
                <Pressable onPress={toggleUnit}>
                  <Text style={styles.switchLink}>
                    Switch to {unit === "metric" ? "ft & in" : "cm"}
                  </Text>
                </Pressable>
              </View>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="Enter height"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="Enter weight"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {bmi ? (
            <View style={styles.resultsCard}>
              <LinearGradient
                colors={["#ff9a9e", "#fecfef", "#fecfef"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.resultsGradient}
              >
                <Text style={styles.resultsTitle}>Your BMI Result</Text>

                <View style={styles.bmiValueContainer}>
                  <Text style={styles.bmiLabel}>Your BMI is</Text>
                  <Text
                    style={[
                      styles.bmiValue,
                      { color: getColorByCategory(bmiCategory) },
                    ]}
                  >
                    {bmi}
                  </Text>
                  <Text
                    style={[
                      styles.bmiCategoryText,
                      { color: getColorByCategory(bmiCategory) },
                    ]}
                  >
                    {bmiCategory}
                  </Text>
                </View>

                <View style={styles.bmiScale}>
                  <View style={styles.bmiScaleBar}>
                    <View style={[styles.bmiScaleSegment, styles.scaleUnderweight]} />
                    <View style={[styles.bmiScaleSegment, styles.scaleNormal]} />
                    <View style={[styles.bmiScaleSegment, styles.scaleOverweight]} />
                    <View style={[styles.bmiScaleSegment, styles.scaleObesity]} />
                  </View>
                  <View
                    style={[
                      styles.bmiIndicator,
                      { left: `${getBmiPosition()}%` },
                    ]}
                  />
                  <View style={styles.bmiScaleLabels}>
                    <Text style={styles.scaleLabel}>Under</Text>
                    <Text style={styles.scaleLabel}>Normal</Text>
                    <Text style={styles.scaleLabel}>Over</Text>
                    <Text style={styles.scaleLabel}>Obese</Text>
                  </View>
                </View>

                <View style={styles.messageContainer}>{getMessage()}</View>

                <Text style={styles.healthyRange}>
                  Healthy BMI range: 18.5 - 25 kg/m²
                </Text>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderText}>
                Enter your details to calculate BMI
              </Text>
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
  genderSelector: {
    flexDirection: "row" as const,
    gap: 12,
    marginBottom: 16,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    alignItems: "center" as const,
  },
  genderButtonMaleActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  genderButtonFemaleActive: {
    backgroundColor: "#EC4899",
    borderColor: "#EC4899",
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#666",
  },
  genderButtonTextActive: {
    color: "#fff",
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#333",
    marginBottom: 8,
  },
  switchLink: {
    fontSize: 12,
    color: "#667eea",
    fontWeight: "600" as const,
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
  hint: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
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
    padding: 24,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#333",
    marginBottom: 24,
    textAlign: "center" as const,
  },
  bmiValueContainer: {
    alignItems: "center" as const,
    marginBottom: 32,
  },
  bmiLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 64,
    fontWeight: "800" as const,
    marginBottom: 8,
  },
  bmiCategoryText: {
    fontSize: 24,
    fontWeight: "700" as const,
  },
  bmiScale: {
    marginBottom: 24,
    position: "relative" as const,
  },
  bmiScaleBar: {
    flexDirection: "row" as const,
    height: 12,
    borderRadius: 6,
    overflow: "hidden" as const,
    marginBottom: 24,
  },
  bmiScaleSegment: {
    flex: 1,
  },
  scaleUnderweight: {
    backgroundColor: "#F59E0B",
  },
  scaleNormal: {
    backgroundColor: "#10B981",
  },
  scaleOverweight: {
    backgroundColor: "#F97316",
  },
  scaleObesity: {
    backgroundColor: "#EF4444",
  },
  bmiIndicator: {
    position: "absolute" as const,
    top: -2,
    width: 2,
    height: 16,
    backgroundColor: "#000",
    transform: [{ translateX: -1 }],
  },
  bmiScaleLabels: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
  },
  scaleLabel: {
    fontSize: 11,
    color: "#666",
    fontWeight: "600" as const,
  },
  messageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  messageNormal: {
    fontSize: 16,
    color: "#10B981",
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },
  messageWarning: {
    fontSize: 16,
    color: "#F59E0B",
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },
  messageDanger: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "600" as const,
    textAlign: "center" as const,
    marginBottom: 8,
  },
  messageSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center" as const,
    lineHeight: 20,
  },
  healthyRange: {
    fontSize: 14,
    color: "#666",
    textAlign: "center" as const,
  },
  placeholderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    alignItems: "center" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center" as const,
  },
});
