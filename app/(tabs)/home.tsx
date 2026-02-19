import { useAuthStore } from "@/store/useAuthStore";
import { ThemedText } from "@/components/ui/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
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
  { id: "4", title: "Jazz Mix", color: "#80CBC4", image: "https://picsum.photos/seed/jazz2/300/300" },
];

const RECENT = [
  { id: "1", title: "Late Night", artist: "Various", image: "https://picsum.photos/seed/recent1/300/300" },
  { id: "2", title: "Dream Pop", artist: "Indie", image: "https://picsum.photos/seed/recent2/300/300" },
  { id: "3", title: "Soul Vibes", artist: "Classic", image: "https://picsum.photos/seed/recent3/300/300" },
  { id: "4", title: "Acoustic", artist: "Chill", image: "https://picsum.photos/seed/recent4/300/300" },
];

export default function Home() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
          <View className="flex-row items-center gap-3">
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: user?.avatar ?? "https://picsum.photos/seed/avatar/100/100" }}
                style={styles.avatar}
              />
              <View style={styles.onlineDot} />
            </View>
            <View>
              <ThemedText variant="caption" style={{ color: "#8A9A9D" }} className="text-xs tracking-widest">
                GOOD EVENING
              </ThemedText>
              <ThemedText variant="subtitle" className="text-white font-bold text-lg">
                {user?.name ?? "Guest"}
              </ThemedText>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Banner */}
        <View className="px-5 mb-8">
          <ImageBackground
            source={{ uri: "https://picsum.photos/seed/banner/600/300" }}
            style={styles.banner}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.bannerOverlay}>
              <View style={styles.bannerBadge}>
                <ThemedText variant="caption" style={{ color: "#06A0B5" }} className="text-xs font-bold tracking-widest">
                  TRENDING
                </ThemedText>
              </View>
              <ThemedText variant="title" className="text-white text-2xl font-bold mt-2">
                Top Hits 2024
              </ThemedText>
              <ThemedText variant="caption" style={{ color: "rgba(255,255,255,0.7)" }} className="mt-1 mb-4">
                The most played songs this week
              </ThemedText>
              <TouchableOpacity style={styles.bannerBtn} className="flex-row items-center gap-2 self-start">
                <Ionicons name="play" size={14} color="#fff" />
                <ThemedText variant="caption" className="text-white font-bold">Play now</ThemedText>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Continue Listening */}
        <View className="px-5 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <ThemedText variant="subtitle" className="text-white font-bold text-lg">
              Continue Listening
            </ThemedText>
            <TouchableOpacity>
              <ThemedText variant="caption" style={{ color: "#06A0B5" }} className="text-xs font-semibold">
                See all
              </ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {CONTINUE_LISTENING.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.gridImage} />
                <ThemedText variant="caption" className="text-white font-semibold ml-3 flex-1" numberOfLines={1}>
                  {item.title}
                </ThemedText>
                <TouchableOpacity className="pr-2">
                  <Ionicons name="play" size={16} color="#06A0B5" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Your Top Mixes */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4 px-5">
            <ThemedText variant="subtitle" className="text-white font-bold text-lg">
              Your Top Mixes
            </ThemedText>
            <TouchableOpacity>
              <ThemedText variant="caption" style={{ color: "#06A0B5" }} className="text-xs font-semibold">
                See all
              </ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, gap: 12, paddingRight: 20 }}>
            {TOP_MIXES.map((mix) => (
              <TouchableOpacity key={mix.id} style={styles.mixCard}>
                <Image source={{ uri: mix.image }} style={styles.mixImage} />
                <View style={styles.mixOverlay} />
                <View style={[styles.mixBottom, { backgroundColor: mix.color }]} />
                <View style={styles.mixContent}>
                  <ThemedText variant="body" className="text-white font-bold text-base">
                    {mix.title}
                  </ThemedText>
                  <View style={styles.mixPlayBtn}>
                    <Ionicons name="play" size={18} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Based on recent listening */}
        <View className="px-5 mb-10">
          <View className="flex-row items-center justify-between mb-4">
            <ThemedText variant="subtitle" className="text-white font-bold text-lg">
              Based on your listening
            </ThemedText>
            <TouchableOpacity>
              <ThemedText variant="caption" style={{ color: "#06A0B5" }} className="text-xs font-semibold">
                See all
              </ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {RECENT.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recentCard}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <View style={styles.recentOverlay} />
                <View className="absolute bottom-3 left-3">
                  <ThemedText variant="caption" className="text-white font-bold">{item.title}</ThemedText>
                  <ThemedText variant="caption" style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{item.artist}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161616" },
  avatarWrapper: { position: "relative" },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#06A0B5",
    borderWidth: 2,
    borderColor: "#161616",
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    height: 180,
    justifyContent: "flex-end",
  },
  bannerOverlay: {
    padding: 20,
    borderRadius: 20,
    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  bannerBadge: {
    backgroundColor: "rgba(6,160,181,0.2)",
    borderWidth: 1,
    borderColor: "#06A0B5",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  bannerBtn: {
    backgroundColor: "#06A0B5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  gridItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242424",
    borderRadius: 12,
    overflow: "hidden",
    height: 58,
    borderWidth: 1,
    borderColor: "#2E2E2E",
  },
  gridImage: { width: 58, height: 58 },
  mixCard: {
    width: 155,
    height: 195,
    borderRadius: 16,
    overflow: "hidden",
  },
  mixImage: { width: "100%", height: "100%", position: "absolute" },
  mixOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  mixBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  mixContent: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mixPlayBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  recentCard: {
    width: 155,
    height: 155,
    borderRadius: 16,
    overflow: "hidden",
  },
  recentImage: { width: "100%", height: "100%" },
  recentOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});

