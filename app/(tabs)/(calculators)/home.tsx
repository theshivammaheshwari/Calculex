import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import {
  TrendingUp,
  Split,
  IndianRupee,
  Coins,
  DollarSign,
  MapPin,
  Calendar,
  Weight,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

interface CalculatorCardProps {
  title: string;
  icon: React.ComponentType<{ color?: string; size?: number }>;
  route: string;
  colors: readonly [string, string, ...string[]];
  delay: number;
}

function CalculatorCard({
  title,
  icon: Icon,
  route,
  colors,
  delay,
}: CalculatorCardProps) {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, fadeAnim, scaleAnim]);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(pressScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [
            { scale: Animated.multiply(scaleAnim, pressScale) },
          ],
        },
      ]}
    >
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push(route as any);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.iconContainer}>
            <Icon color="#fff" size={32} />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export default function CalculatorsHome() {
  const calculators = [
    {
      title: "Stock Average",
      icon: TrendingUp,
      route: "/(tabs)/(calculators)/stock-average",
      colors: ["#1e40af", "#3b82f6"] as const,
      delay: 100,
    },
    {
      title: "Stock Split",
      icon: Split,
      route: "/(tabs)/(calculators)/stock-split",
      colors: ["#7c3aed", "#a855f7"] as const,
      delay: 150,
    },
    {
      title: "EMI",
      icon: IndianRupee,
      route: "/(tabs)/(calculators)/emi",
      colors: ["#0891b2", "#06b6d4"] as const,
      delay: 200,
    },
    {
      title: "SIP",
      icon: Coins,
      route: "/(tabs)/(calculators)/sip",
      colors: ["#059669", "#10b981"] as const,
      delay: 250,
    },
    {
      title: "Future Value",
      icon: DollarSign,
      route: "/(tabs)/(calculators)/future-value",
      colors: ["#dc2626", "#f59e0b"] as const,
      delay: 300,
    },
    {
      title: "Trip",
      icon: MapPin,
      route: "/(tabs)/(calculators)/trip",
      colors: ["#0284c7", "#0ea5e9"] as const,
      delay: 350,
    },
    {
      title: "Age",
      icon: Calendar,
      route: "/(tabs)/(calculators)/age",
      colors: ["#8b5cf6", "#c084fc"] as const,
      delay: 400,
    },
    {
      title: "BMI",
      icon: Weight,
      route: "/(tabs)/(calculators)/bmi",
      colors: ["#f43f5e", "#fb7185"] as const,
      delay: 450,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1e40af", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Choose Calculator</Text>
        <Text style={styles.headerSubtitle}>
          Select a calculator to get started
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {calculators.map((calc, index) => (
            <CalculatorCard key={index} {...calc} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500" as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
    justifyContent: "space-between" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#fff",
  },
});
