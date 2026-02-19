import { ThemedText } from "@/components/ui/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTINUE_LISTENING = [
  { id: "1", title: "Coffee & Jazz", image: "https://picsum.photos/seed/jazz/100/100" },
  { id: "2", title: "RELEASED", image: "https://picsum.photos/seed/released/100/100" },
  { id: "3", title: "Anything Goes", image: "https://picsum.photos/seed/anything/100/100" },
  { id: "4", title: "Anime OSTs", image: "https://picsum.photos/seed/anime/100/100" },
  { id: "5", title: "Harry's House", image: "https://picsum.photos/seed/harry/100/100" },
  { id: "6", title: "Lo-Fi Beats", image: "https://picsum.photos/seed/lofi/100/100" },
];

const TOP_MIXES = [
  { id: "1", title: "Pop Mix", color: "#E57373", image: "https://picsum.photos/seed/pop/300/300" },
  { id: "2", title: "Chill Mix", color: "#F4D03F", image: "https://picsum.photos/seed/chill/300/300" },
  { id: "3", title: "K-Pop Mix", color: "#F8BBD0", image: "https://picsum.photos/seed/kpop/300/300" },
];

const RECENT = [
  { id: "1", image: "https://picsum.photos/seed/recent1/300/300" },
  { id: "2", image: "https://picsum.photos/seed/recent2/300/300" },
  { id: "3", image: "https://picsum.photos/seed/recent3/300/300" },
  { id: "4", image: "https://picsum.photos/seed/recent4/300/300" },
];

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="flex-row items-center gap-3">
            <Image
              source={{ uri: "https://picsum.photos/seed/avatar/100/100" }}
              style={styles.avatar}
            />
            <View>
              <ThemedText variant="subtitle" className="text-white font-bold text-base">
                Welcome back !
              </ThemedText>
              <ThemedText variant="caption" style={{ color: "#8A9A9D" }}>
                chandrama
              </ThemedText>
            </View>
          </View>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <Ionicons name="stats-chart-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Listening */}
        <View className="px-5 mb-6">
          <ThemedText variant="subtitle" className="text-white font-bold text-xl mb-4">
            Continue Listening
          </ThemedText>
          <View style={styles.grid}>
            {CONTINUE_LISTENING.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.gridImage} />
                <ThemedText variant="caption" className="text-white font-semibold ml-2 flex-1" numberOfLines={1}>
                  {item.title}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Your Top Mixes */}
        <View className="mb-6">
          <ThemedText variant="subtitle" className="text-white font-bold text-xl mb-4 px-5">
            Your Top Mixes
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, gap: 12 }}>
            {TOP_MIXES.map((mix) => (
              <TouchableOpacity key={mix.id} style={styles.mixCard}>
                <Image source={{ uri: mix.image }} style={styles.mixImage} />
                <View style={[styles.mixOverlay, { backgroundColor: "rgba(0,0,0,0.3)" }]} />
                <View style={[styles.mixBottom, { backgroundColor: mix.color }]} />
                <View style={styles.mixPlayBtn}>
                  <Ionicons name="play-circle" size={48} color="rgba(255,255,255,0.9)" />
                </View>
                <ThemedText variant="body" className="text-white font-bold absolute bottom-8 left-3">
                  {mix.title}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Based on recent listening */}
        <View className="px-5 mb-8">
          <ThemedText variant="subtitle" className="text-white font-bold text-xl mb-4">
            Based on your recent listening
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {RECENT.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recentCard}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E" },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    overflow: "hidden",
    height: 56,
  },
  gridImage: {
    width: 56,
    height: 56,
  },
  mixCard: {
    width: 160,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  mixImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mixOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  mixBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
  },
  mixPlayBtn: {
    position: "absolute",
    bottom: 12,
    right: 8,
  },
  recentCard: {
    width: 160,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
  },
  recentImage: {
    width: "100%",
    height: "100%",
  },
});

