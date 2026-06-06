import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const APP_NAME = "musium";
const SPLASH_DURATION = 3500;

const GLITCH_CONFIG = {
  duration: 80,
  rest: 1500,
};

function startGlitchAnimation(
  offset: SharedValue<number>,
  opacity: SharedValue<number>,
  direction: 1 | -1,
) {
  offset.value = withRepeat(
    withSequence(
      withTiming(4 * direction, {
        duration: GLITCH_CONFIG.duration,
      }),
      withTiming(-4 * direction, {
        duration: GLITCH_CONFIG.duration,
      }),
      withTiming(0, {
        duration: GLITCH_CONFIG.duration,
      }),
      withTiming(0, {
        duration: GLITCH_CONFIG.rest,
      }),
    ),
    -1,
  );

  opacity.value = withRepeat(
    withSequence(
      withTiming(0.7, {
        duration: GLITCH_CONFIG.duration,
      }),
      withTiming(0, {
        duration: GLITCH_CONFIG.duration,
      }),
      withTiming(0.5, {
        duration: GLITCH_CONFIG.duration,
      }),
      withTiming(0, {
        duration: GLITCH_CONFIG.rest,
      }),
    ),
    -1,
  );
}

function ScanLine() {
  const translateY = useSharedValue(-300);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(800, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="absolute w-full h-0.5 bg-primary opacity-15 z-10"
    />
  );
}

function GlitchText() {
  const redOffset = useSharedValue(0);
  const cyanOffset = useSharedValue(0);

  const redOpacity = useSharedValue(0);
  const cyanOpacity = useSharedValue(0);

  useEffect(() => {
    startGlitchAnimation(redOffset, redOpacity, 1);
    startGlitchAnimation(cyanOffset, cyanOpacity, -1);
  }, []);

  const redStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: redOffset.value }],
    opacity: redOpacity.value,
  }));

  const cyanStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: cyanOffset.value }],
    opacity: cyanOpacity.value,
  }));

  return (
    <View className="items-center justify-center">
      <Animated.Text
        style={[styles.glitchBase, styles.glitchRed, redStyle]}
        className="text-4xl font-bold tracking-widest"
      >
        {APP_NAME}
      </Animated.Text>

      <Animated.Text
        style={[styles.glitchBase, styles.glitchCyan, cyanStyle]}
        className="text-4xl font-bold tracking-widest"
      >
        {APP_NAME}
      </Animated.Text>

      <Text className="text-white text-4xl font-bold tracking-widest">
        {APP_NAME}
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
    logoOpacity.value = withTiming(1, {
      duration: 600,
    });

    logoScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.back(1.5)),
    });

    textOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 500,
      }),
    );

    lineOpacity.value = withDelay(
      800,
      withTiming(1, {
        duration: 300,
      }),
    );

    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [router]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const lineStyle = useAnimatedStyle(() => ({
    opacity: lineOpacity.value,
  }));

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
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
