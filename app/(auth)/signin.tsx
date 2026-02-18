import { ThemedText } from "@/components/ui/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

function SocialButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.socialBtn}
      className="w-full flex-row items-center justify-center px-5 py-4 mb-3 rounded-2xl gap-3"
    >
      {icon}
      <ThemedText variant="body" className="font-semibold text-base text-white">
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

export default function SignIn() {
  const router = useRouter();

  const cardOpacity = useSharedValue(0);
  const cardY = useSharedValue(40);
  const topOpacity = useSharedValue(0);

  useEffect(() => {
    topOpacity.value = withTiming(1, { duration: 800 });
    cardOpacity.value = withDelay(300, withTiming(1, { duration: 700 }));
    cardY.value = withDelay(300, withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) }));
  }, []);

  const topStyle = useAnimatedStyle(() => ({ opacity: topOpacity.value }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardY.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[topStyle, styles.topBg]}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />

        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <View style={styles.logoOuter}>
              <View style={styles.logoInner}>
                <ThemedText variant="title" className="text-white text-2xl">♪</ThemedText>
              </View>
            </View>
            <ThemedText variant="title" className="text-white text-2xl font-bold mt-3">
              Let's get you in
            </ThemedText>
            <ThemedText variant="caption" style={{ color: "rgba(255,255,255,0.7)" }} className="mt-1">
              Choose your preferred sign in method
            </ThemedText>
          </View>
        </SafeAreaView>
      </Animated.View>

      <Animated.View style={[cardStyle, styles.card]}>
        <SocialButton
          label="Continue with Google"
          icon={<Ionicons name="logo-google" size={20} color="#EA4335" />}
        />
        <SocialButton
          label="Continue with Facebook"
          icon={<Ionicons name="logo-facebook" size={20} color="#1877F2" />}
        />
        <SocialButton
          label="Continue with Apple"
          icon={<Ionicons name="logo-apple" size={20} color="#FFFFFF" />}
        />

        <View className="flex-row items-center gap-3 my-5">
          <View style={styles.divider} />
          <ThemedText variant="caption" style={{ color: "#8A9A9D" }} className="text-xs tracking-widest">
            OR
          </ThemedText>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          style={styles.loginBtn}
          className="w-full rounded-full py-4 items-center mb-5 flex-row justify-center gap-2"
        >
          <Ionicons name="lock-closed-outline" size={18} color="#fff" />
          <ThemedText variant="body" className="text-white font-bold text-base">
            Log in with a password
          </ThemedText>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <ThemedText variant="caption" style={{ color: "#8A9A9D" }}>
            Don't have an account?{" "}
          </ThemedText>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <ThemedText variant="caption" className="font-semibold" style={{ color: "#06A0B5" }}>
              Sign Up
            </ThemedText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E" },
  topBg: {
    height: "48%",
    backgroundColor: "#06A0B5",
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
  },
  circle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255,255,255,0.08)",
    top: -60,
    right: -60,
  },
  circle2: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.06)",
    bottom: 20,
    left: -50,
  },
  circle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: 60,
    left: 30,
  },
  backBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  logoOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "58%",
    backgroundColor: "#242424",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  socialBtn: {
    backgroundColor: "#2E2E2E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  divider: { flex: 1, height: 1, backgroundColor: "#333333" },
  loginBtn: {
    backgroundColor: "#06A0B5",
    shadowColor: "#06A0B5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
});

