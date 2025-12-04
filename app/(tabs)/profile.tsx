import { Phone, Mail, Instagram, Facebook, Linkedin, Heart, Sparkles } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Animated, Linking, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

interface ContactItemProps {
  icon: React.ComponentType<{ color?: string; size?: number }>;
  label: string;
  value: string;
  onPress: () => void;
  delay: number;
}

function ContactItem({ icon: Icon, label, value, onPress, delay }: ContactItemProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, fadeAnim, slideAnim]);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.contactCard,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress();
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.contactContent}
      >
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={["#1e40af", "#3b82f6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Icon color="#fff" size={20} />
          </LinearGradient>
        </View>
        <View style={styles.contactTextContainer}>
          <Text style={styles.contactLabel}>{label}</Text>
          <Text style={styles.contactValue}>{value}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

interface SocialButtonProps {
  icon: React.ComponentType<{ color?: string; size?: number }>;
  label: string;
  url: string;
  colors: readonly [string, string, ...string[]];
  delay: number;
}

function SocialButton({ icon: Icon, label, url, colors, delay }: SocialButtonProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
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
      toValue: 0.9,
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
        styles.socialButton,
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
          Linking.openURL(url);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.socialButtonContent}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.socialGradient}
        >
          <Icon color="#fff" size={22} />
          <Text style={styles.socialLabel}>{label}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-50)).current;
  const sparkleRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(headerSlide, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleRotate, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleRotate, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [headerFade, headerSlide, sparkleRotate]);

  const spin = sparkleRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9468955596",
      onPress: () => Linking.openURL("tel:+919468955596"),
      delay: 200,
    },
    {
      icon: Mail,
      label: "Email",
      value: "247shivam@gmail.com",
      onPress: () => Linking.openURL("mailto:247shivam@gmail.com"),
      delay: 300,
    },
  ];

  const socialButtons = [
    {
      icon: Instagram,
      label: "Instagram",
      url: "https://instagram.com/shivam.maheshwary1",
      colors: ["#f09433", "#e6683c", "#dc2743"] as const,
      delay: 500,
    },
    {
      icon: Facebook,
      label: "Facebook",
      url: "https://facebook.com/theshivammaheshwari",
      colors: ["#4267B2", "#3b5998"] as const,
      delay: 600,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/shivammaheshwary1",
      colors: ["#0077b5", "#00a0dc"] as const,
      delay: 700,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1e40af", "#3b82f6", "#60a5fa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerFade,
              transform: [{ translateY: headerSlide }],
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={["#fff", "#f0f0f0"]}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>SM</Text>
            </LinearGradient>
            <Animated.View
              style={[
                styles.sparkle,
                { transform: [{ rotate: spin }] },
              ]}
            >
              <Sparkles color="#FFD700" size={24} />
            </Animated.View>
          </View>
          
          <Text style={styles.name}>Shivam Maheshwari</Text>
          <Text style={styles.title}>Mobile App Developer</Text>
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          {contactItems.map((item, index) => (
            <ContactItem key={index} {...item} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect</Text>
          <View style={styles.socialGrid}>
            {socialButtons.map((item, index) => (
              <SocialButton key={index} {...item} />
            ))}
          </View>
        </View>

        <Animated.View
          style={[
            styles.acknowledgmentCard,
            {
              opacity: headerFade,
            },
          ]}
        >
          <BlurView intensity={20} style={styles.blurCard}>
            <View style={styles.acknowledgmentContent}>
              <Heart color="#ff6b9d" size={20} fill="#ff6b9d" />
              <Text style={styles.acknowledgmentText}>
                Grateful to{" "}
                <Text
                  style={styles.acknowledgmentLink}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    Linking.openURL("https://linkedin.com/in/abhishek-jain007");
                  }}
                >
                  Abhishek Jain
                </Text>
                {" "}for insightful suggestions
              </Text>
            </View>
          </BlurView>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ in India</Text>
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
  backgroundGradient: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center" as const,
    paddingTop: 60,
    paddingBottom: 40,
  },
  avatarContainer: {
    position: "relative" as const,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "700" as const,
    color: "#1e40af",
  },
  sparkle: {
    position: "absolute" as const,
    top: -5,
    right: -5,
  },
  name: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500" as const,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1a1a1a",
    marginBottom: 16,
    marginLeft: 4,
  },
  contactCard: {
    marginBottom: 12,
  },
  contactContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
    fontWeight: "600" as const,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "600" as const,
  },
  socialGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 12,
  },
  socialButton: {
    width: (width - 52) / 2,
  },
  socialButtonContent: {
    borderRadius: 16,
    overflow: "hidden" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  socialGradient: {
    padding: 20,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    minHeight: 100,
  },
  socialLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700" as const,
    marginTop: 8,
  },
  acknowledgmentCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden" as const,
  },
  blurCard: {
    borderRadius: 20,
    overflow: "hidden" as const,
  },
  acknowledgmentContent: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
  },
  acknowledgmentText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  acknowledgmentLink: {
    fontWeight: "700" as const,
    color: "#1e40af",
  },
  footer: {
    alignItems: "center" as const,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500" as const,
  },
});
