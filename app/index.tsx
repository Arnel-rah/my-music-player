import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(auth)/launch" />;
}

// return <Redirect href="/(tabs)/home" />;