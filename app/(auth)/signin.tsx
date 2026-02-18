import { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ui/ThemedText";
import { LinearGradient } from "expo-linear-gradient";

function SocialButton({ label, icon, index, onPress }: any) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(500 + index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(500 + index * 100, withSpring(0));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.97))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
        style={styles.socialBtn}
        className="w-full flex-row items-center px-6 py-4 mb-4 rounded-2xl"
      >
        <View className="w-6">{icon}</View>
        <ThemedText className="flex-1 text-center font-bold text-[15px]" style={{ color: "#2D3436" }}>
          {label}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

export default function SignIn() {
  const router = useRouter();
  const headerOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFB" }}>
      <LinearGradient colors={["#FFFFFF", "#F0F4F7"]} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        <View className="px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#1E1E1E" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-8 justify-center">
          <Animated.View style={[headerStyle, { marginBottom: 40 }]}>
            <View style={styles.brandBadge}>
              <ThemedText style={styles.brandNote}>♪</ThemedText>
            </View>
            <ThemedText style={styles.heroTitle}>
              Welcome{"\n"}
              <ThemedText style={[styles.heroTitle, { color: "#06A0B5" }]}>to Musium</ThemedText>
            </ThemedText>
            <ThemedText style={styles.subTitle}>
              Connect with your soul through music.
            </ThemedText>
          </Animated.View>

          <View>
            <SocialButton
              index={0}
              label="Continue with Google"
              icon={<Ionicons name="logo-google" size={20} color="#EA4335" />}
            />
            <SocialButton
              index={1}
              label="Continue with Apple"
              icon={<Ionicons name="logo-apple" size={20} color="#000" />}
            />

            <View className="flex-row items-center my-8">
              <View style={styles.line} />
              <ThemedText style={styles.orText}>OR</ThemedText>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/(auth)/login")}
              style={styles.mainLoginBtn}
            >
              <LinearGradient
                colors={["#06A0B5", "#048698"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                <ThemedText style={styles.mainBtnText}>Sign in with Password</ThemedText>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View className="mt-10 flex-row justify-center">
            <ThemedText style={{ color: "#636E72", fontSize: 14 }}>New here? </ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: "#06A0B5", fontWeight: "700", fontSize: 14 }}>
                Create Account
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    width: 45,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  brandBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#06A0B5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  brandNote: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  heroTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "#2D3436",
    lineHeight: 48,
    letterSpacing: -1,
  },
  subTitle: {
    fontSize: 16,
    color: "#636E72",
    marginTop: 10,
    fontWeight: "500",
  },
  socialBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  },
  line: { flex: 1, height: 1, backgroundColor: "#E1E8EB" },
  orText: {
    marginHorizontal: 15,
    color: "#B2BEC3",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  mainLoginBtn: {
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#06A0B5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  gradientBtn: {
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  mainBtnText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});