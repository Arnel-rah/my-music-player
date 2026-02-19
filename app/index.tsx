import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#06A0B5" />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/launch"} />;
}
// return <Redirect href="/(tabs)/home" />;