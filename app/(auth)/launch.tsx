import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
const GLITCH_CONFIG = {
  duration: 80,
  rest: 1500,
};

function ScanLine() {
  const translateY = useSharedValue(-300);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(800, { duration: 2000, easing: Easing.linear }),
      -1,
    );
  }, [translateY]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[animStyle]}
      className="absolute w-full h-0.5 bg-primary opacity-15 z-10"
    />
  );
}

function GlitchText() {
  const offsetX1 = useSharedValue(0);
  const offsetX2 = useSharedValue(0);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);

  useEffect(() => {
    offsetX1.value = withRepeat(
      withSequence(
        withTiming(4, { duration: GLITCH_CONFIG.duration }),
        withTiming(-4, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.rest }),
      ),
      -1,
    );
    opacity1.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.duration }),
        withTiming(0.5, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.rest }),
      ),
      -1,
    );
    offsetX2.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: GLITCH_CONFIG.duration }),
        withTiming(4, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.rest }),
      ),
      -1,
    );
    opacity2.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.duration }),
        withTiming(0.5, { duration: GLITCH_CONFIG.duration }),
        withTiming(0, { duration: GLITCH_CONFIG.rest }),
      ),
      -1,
    );
  }, [offsetX1, offsetX2, opacity1, opacity2]);

  const redStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX1.value }],
    opacity: opacity1.value,
  }));
  const cyanStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX2.value }],
    opacity: opacity2.value,
  }));

  return (
    <View className="items-center justify-center">
      <Animated.Text
        style={[styles.glitchBase, styles.glitchRed, redStyle]}
        className="text-4xl font-bold tracking-widest"
      >
        musium
      </Animated.Text>
      <Animated.Text
        style={[styles.glitchBase, styles.glitchCyan, cyanStyle]}
        className="text-4xl font-bold tracking-widest"
      >
        musium
      </Animated.Text>
      <Text className="text-white text-4xl font-bold tracking-widest">
        musium
      </Text>
    </View>
  );
}

export default function Launch() {
  const router = useRouter();

  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);
  const lineOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.back(1.5)),
    });
    textOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));
    lineOpacity.value = withDelay(800, withTiming(1, { duration: 300 }));

    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 3500);

    return () => clearTimeout(timer);
  }, [router, logoOpacity, logoScale, textOpacity, lineOpacity]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));
  const lineStyle = useAnimatedStyle(() => ({ opacity: lineOpacity.value }));

  return (
    <View className="flex-1 bg-[#0A0A0A] items-center justify-center">
      <ScanLine />
      <Animated.View style={logoStyle} className="mb-6">
        <View style={styles.logoOuter}>
          <View className="w-[72px] h-[72px] rounded-full bg-primary items-center justify-center">
            <Text className="text-[#0A0A0A] text-3xl font-bold">♪</Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View style={textStyle} className="mb-5">
        <GlitchText />
      </Animated.View>
      <Animated.View style={lineStyle} className="flex-row items-center gap-3">
        <View className="w-14 h-px bg-primary opacity-50" />
        <Text className="text-primary text-[10px] tracking-[4px] opacity-70">
          MUSIC PLAYER
        </Text>
        <View className="w-14 h-px bg-primary opacity-50" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#00C2CB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00C2CB",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  glitchBase: {
    position: "absolute",
  },
  glitchRed: {
    color: "#FF003C",
  },
  glitchCyan: {
    color: "#00C2CB",
  },
});
