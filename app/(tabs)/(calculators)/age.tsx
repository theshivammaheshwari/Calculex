import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { differenceInDays, differenceInMonths, differenceInYears, format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date>(new Date(1990, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showBirthPicker, setShowBirthPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (birthDate > endDate) {
      setAge(null);
      return;
    }

    const years = differenceInYears(endDate, birthDate);
    const monthsAfterYears = differenceInMonths(
      endDate,
      new Date(birthDate.getFullYear() + years, birthDate.getMonth(), birthDate.getDate())
    );
    const yearMonthDate = new Date(
      birthDate.getFullYear() + years,
      birthDate.getMonth() + monthsAfterYears,
      birthDate.getDate()
    );
    const days = differenceInDays(endDate, yearMonthDate);

    setAge({
      years,
      months: monthsAfterYears,
      days,
    });
  }, [birthDate, endDate]);



  const onBirthDateChange = (event: any, selectedDate?: Date) => {
    setShowBirthPicker(Platform.OS === "ios");
    if (selectedDate) {
      setBirthDate(selectedDate);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === "ios");
    if (selectedDate) {
      setEndDate(selectedDate);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
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
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Birth Date</Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowBirthPicker(true);
                }}
                style={styles.dateButton}
              >
                <Calendar color="#667eea" size={20} />
                <Text style={styles.dateText}>{format(birthDate, "dd MMM yyyy")}</Text>
              </Pressable>
              {showBirthPicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="default"
                  onChange={onBirthDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>End Date (defaults to today)</Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowEndPicker(true);
                }}
                style={styles.dateButton}
              >
                <Calendar color="#667eea" size={20} />
                <Text style={styles.dateText}>{format(endDate, "dd MMM yyyy")}</Text>
              </Pressable>
              {showEndPicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={onEndDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>
          </View>

          {age ? (
            <View style={styles.resultsCard}>
              <LinearGradient
                colors={["#a8edea", "#fed6e3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.resultsGradient}
              >
                <Text style={styles.resultsTitle}>Age Result</Text>

                <View style={styles.ageBoxes}>
                  <View style={styles.ageBox}>
                    <Text style={styles.ageNumber}>{age.years}</Text>
                    <Text style={styles.ageLabel}>Years</Text>
                  </View>
                  <View style={[styles.ageBox, styles.ageBoxMiddle]}>
                    <Text style={styles.ageNumber}>{age.months}</Text>
                    <Text style={styles.ageLabel}>Months</Text>
                  </View>
                  <View style={styles.ageBox}>
                    <Text style={styles.ageNumber}>{age.days}</Text>
                    <Text style={styles.ageLabel}>Days</Text>
                  </View>
                </View>

                <View style={styles.totalAgeCard}>
                  <Text style={styles.totalAgeTitle}>Total Age</Text>
                  <Text style={styles.totalAgeText}>
                    {age.years} years, {age.months} months, and {age.days} days
                  </Text>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.errorCard}>
              <Text style={styles.errorText}>Birth date cannot be after end date</Text>
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#333",
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    gap: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600" as const,
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
  ageBoxes: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: 24,
    gap: 12,
  },
  ageBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center" as const,
  },
  ageBoxMiddle: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  ageNumber: {
    fontSize: 36,
    fontWeight: "800" as const,
    color: "#667eea",
    marginBottom: 4,
  },
  ageLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600" as const,
  },
  totalAgeCard: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
    padding: 16,
  },
  totalAgeTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#333",
    marginBottom: 8,
    textAlign: "center" as const,
  },
  totalAgeText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center" as const,
    lineHeight: 24,
  },
  errorCard: {
    backgroundColor: "#fee",
    borderRadius: 16,
    padding: 20,
    alignItems: "center" as const,
  },
  errorText: {
    fontSize: 16,
    color: "#e00",
    fontWeight: "600" as const,
  },
});
