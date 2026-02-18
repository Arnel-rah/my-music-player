import { View } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";

export default function Explore() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <ThemedText variant="title">Explore</ThemedText>
    </View>
  );
}