import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";

export default function SongDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <ThemedText variant="title">Song {id}</ThemedText>
    </View>
  );
}