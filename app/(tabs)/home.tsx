import { View } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";

export default function Home() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <ThemedText variant="title">Home</ThemedText>
    </View>
  );
}