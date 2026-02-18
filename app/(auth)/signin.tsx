import { View } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";

export default function SignIn() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <ThemedText variant="title">Sign In</ThemedText>
    </View>
  );
}