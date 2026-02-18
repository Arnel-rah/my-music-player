import { useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ui/ThemedText";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const cardOpacity = useSharedValue(0);
  const cardY       = useSharedValue(40);
  const topOpacity  = useSharedValue(0);

  useEffect(() => {
    topOpacity.value  = withTiming(1, { duration: 800 });
    cardOpacity.value = withDelay(300, withTiming(1, { duration: 700 }));
    cardY.value       = withDelay(300, withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) }));
  }, []);

  const topStyle  = useAnimatedStyle(() => ({ opacity: topOpacity.value }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardY.value }],
  }));

  return (
    <View style={styles.container}>

      {/* Fond cyan en haut */}
      <Animated.View style={[topStyle, styles.topBg]}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />

        <SafeAreaView>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} className="ml-5">
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="flex-1 items-center justify-center">
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <ThemedText variant="title" className="text-white text-3xl">♪</ThemedText>
            </View>
          </View>
          <ThemedText variant="title" className="text-white text-3xl font-bold mt-4">
            Create account
          </ThemedText>
          <ThemedText variant="caption" style={{ color: "rgba(255,255,255,0.7)" }} className="mt-1">
            Join Musium today
          </ThemedText>
        </View>
      </Animated.View>

      {/* Card flottante */}
      <Animated.View style={[cardStyle, styles.card]}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Nom */}
          <View style={styles.inputWrapper} className="flex-row items-center px-4 mb-4 rounded-2xl">
            <Ionicons name="person-outline" size={18} color="#8A9A9D" />
            <TextInput
              placeholder="Full name"
              placeholderTextColor="#8A9A9D"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              style={styles.input}
            />
          </View>

          {/* Email */}
          <View style={styles.inputWrapper} className="flex-row items-center px-4 mb-4 rounded-2xl">
            <Ionicons name="mail-outline" size={18} color="#8A9A9D" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#8A9A9D"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper} className="flex-row items-center px-4 mb-4 rounded-2xl">
            <Ionicons name="lock-closed-outline" size={18} color="#8A9A9D" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#8A9A9D"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={18} color="#8A9A9D" />
            </TouchableOpacity>
          </View>

          {/* Confirm password */}
          <View style={styles.inputWrapper} className="flex-row items-center px-4 mb-6 rounded-2xl">
            <Ionicons name="shield-checkmark-outline" size={18} color="#8A9A9D" />
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#8A9A9D"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showConfirm}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons name={showConfirm ? "eye-outline" : "eye-off-outline"} size={18} color="#8A9A9D" />
            </TouchableOpacity>
          </View>

          {/* Bouton Create */}
          <TouchableOpacity style={styles.createBtn} className="w-full rounded-full py-4 items-center mb-6">
            <ThemedText variant="body" className="text-white font-bold text-base">
              Create account
            </ThemedText>
          </TouchableOpacity>

          {/* Séparateur */}
          <View className="flex-row items-center gap-3 mb-5">
            <View style={styles.divider} />
            <ThemedText variant="caption" style={{ color: "#8A9A9D" }} className="text-xs">or sign up with</ThemedText>
            <View style={styles.divider} />
          </View>

          {/* Icônes sociales */}
          <View className="flex-row justify-center gap-4 mb-6">
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-google" size={22} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-facebook" size={22} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-apple" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Login */}
          <View className="flex-row justify-center pb-6">
            <ThemedText variant="caption" style={{ color: "#8A9A9D" }}>Already have an account? </ThemedText>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <ThemedText variant="caption" className="font-semibold" style={{ color: "#06A0B5" }}>Log in</ThemedText>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E" },
  topBg: {
    height: "35%",
    backgroundColor: "#06A0B5",
    overflow: "hidden",
    paddingBottom: 20,
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
    height: "70%",
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
  inputWrapper: {
    backgroundColor: "#2E2E2E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    height: 56,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    marginLeft: 10,
  },
  createBtn: {
    backgroundColor: "#06A0B5",
    shadowColor: "#06A0B5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#333333" },
  socialIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#2E2E2E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    alignItems: "center",
    justifyContent: "center",
  },
});