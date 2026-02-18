import { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";

export default function Launch() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center">
      {/* Logo */}
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-32 h-32"
        resizeMode="contain"
      />

      {/* App name */}
      <ThemedText variant="title" className="text-cyan-400 text-2xl mt-4 tracking-widest">
        musium
      </ThemedText>
    </View>
  );
}