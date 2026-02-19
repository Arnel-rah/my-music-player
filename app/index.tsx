import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/launch"} />;
}

// return <Redirect href="/(tabs)/home" />;