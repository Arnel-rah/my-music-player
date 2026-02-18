import { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ui/ThemedText";

export default function Welcome() {
  const router = useRouter();

  const iconOpacity   = useSharedValue(0);
  const iconScale     = useSharedValue(0.8);
  const titleOpacity  = useSharedValue(0);
  const titleY        = useSharedValue(30);
  const dotOpacity    = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonY       = useSharedValue(30);

  useEffect(() => {
    // Icone
    iconOpacity.value = withTiming(1, { duration: 600 });
    iconScale.value   = withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) });

    // Texte
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 700 }));
    titleY.value       = withDelay(300, withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) }));

    // Pagination
    dotOpacity.value = withDelay(700, withTiming(1, { duration: 500 }));

    // Bouton
    buttonOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
    buttonY.value       = withDelay(1000, withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }));
  }, []);

  const iconStyle   = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));
  const titleStyle  = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));
  const dotStyle    = useAnimatedStyle(() => ({ opacity: dotOpacity.value }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonY.value }],
  }));

  return (
    <View className="flex-1 bg-background items-center justify-center px-8">

      {/* Icone animée */}
      <Animated.View style={iconStyle} className="mb-10">
        <View className="w-24 h-24 rounded-full bg-primary items-center justify-center">
          <ThemedText variant="title" className="text-background text-4xl">
            ♪
          </ThemedText>
        </View>
      </Animated.View>

      {/* Texte animé */}
      <Animated.View style={titleStyle} className="items-center mb-8">
        <ThemedText
          variant="body"
          className="text-white text-center text-xl font-semibold leading-8"
        >
          From the{" "}
          <ThemedText variant="body" className="text-primary">
            latest
          </ThemedText>
          {" "}to the{" "}
          <ThemedText variant="body" className="text-primary">
            greatest
          </ThemedText>
          {" "}hits, play your favorite tracks on{" "}
          <ThemedText variant="body" className="text-primary">
            musium
          </ThemedText>
          {" "}now!
        </ThemedText>
      </Animated.View>

      {/* Pagination */}
      <Animated.View style={dotStyle} className="flex-row gap-2 mb-10">
        <View className="w-8 h-1.5 rounded-full bg-primary" />
        <View className="w-4 h-1.5 rounded-full bg-muted" />
      </Animated.View>

      {/* Bouton */}
      <Animated.View style={buttonStyle} className="w-full">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/signin")}
          style={{ backgroundColor: "#06A0B5" }}
          className="w-full rounded-full py-4 items-center"
        >
          <ThemedText variant="body" className="text-white font-bold text-lg">
            Get Started
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
}