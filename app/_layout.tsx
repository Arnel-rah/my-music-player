import "../global.css";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const { loadSession } = useAuthStore();

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#1E1E1E" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="song/[id]" />
        <Stack.Screen name="playlist/[id]" />
      </Stack>
    </>
  );
}