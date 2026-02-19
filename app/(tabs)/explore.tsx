import React, { useState } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const CATEGORIES = [
  { id: "1", title: "Pop", color: ["#E57373", "#C62828"] as const, image: "https://picsum.photos/seed/pop/300/300" },
  { id: "2", title: "Hip-Hop", color: ["#FFB74D", "#E65100"] as const, image: "https://picsum.photos/seed/hiphop/300/300" },
  { id: "3", title: "Jazz", color: ["#80CBC4", "#00695C"] as const, image: "https://picsum.photos/seed/jazz2/300/300" },
  { id: "4", title: "Lo-fi", color: ["#4FC3F7", "#0277BD"] as const, image: "https://picsum.photos/seed/lofi2/300/300" },
  { id: "5", title: "K-Pop", color: ["#F48FB1", "#880E4F"] as const, image: "https://picsum.photos/seed/kpop/300/300" },
  { id: "6", title: "Rock", color: ["#CE93D8", "#6A1B9A"] as const, image: "https://picsum.photos/seed/rock/300/300" },
  { id: "7", title: "R&B", color: ["#A5D6A7", "#2E7D32"] as const, image: "https://picsum.photos/seed/rnb/300/300" },
  { id: "8", title: "Classical", color: ["#FFF176", "#F57F17"] as const, image: "https://picsum.photos/seed/classical/300/300" },
  { id: "9", title: "Electronic", color: ["#B39DDB", "#4527A0"] as const, image: "https://picsum.photos/seed/electronic/300/300" },
  { id: "10", title: "Anime", color: ["#EF9A9A", "#B71C1C"] as const, image: "https://picsum.photos/seed/anime2/300/300" },
];

const TRENDING = [
  { id: "1", title: "Espresso", artist: "Sabrina Carpenter", plays: "2.1M", image: "https://picsum.photos/seed/tr1/300/300" },
  { id: "2", title: "Cruel Summer", artist: "Taylor Swift", plays: "1.8M", image: "https://picsum.photos/seed/tr2/300/300" },
  { id: "3", title: "Flowers", artist: "Miley Cyrus", plays: "1.5M", image: "https://picsum.photos/seed/tr3/300/300" },
  { id: "4", title: "Vampire", artist: "Olivia Rodrigo", plays: "1.2M", image: "https://picsum.photos/seed/tr4/300/300" },
  { id: "5", title: "Anti-Hero", artist: "Taylor Swift", plays: "980K", image: "https://picsum.photos/seed/tr5/300/300" },
];

const NEW_RELEASES = [
  { id: "1", title: "Midnight Rain", artist: "Luna", image: "https://picsum.photos/seed/nr1/300/300" },
  { id: "2", title: "Golden Hour", artist: "Kacey M.", image: "https://picsum.photos/seed/nr2/300/300" },
  { id: "3", title: "Stargazer", artist: "Nova", image: "https://picsum.photos/seed/nr3/300/300" },
  { id: "4", title: "Neon Lights", artist: "Arc", image: "https://picsum.photos/seed/nr4/300/300" },
];

const TABS = ["Discover", "Charts", "Podcasts"];

const CARD_WIDTH = (width - 52) / 2;

export default function Explore() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={[styles.headerWrapper, { paddingTop: insets.top + 6 }]}>
        <View style={styles.headerTop}>
          <ThemedText style={styles.headerTitle}>Explore</ThemedText>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="mic-outline" size={19} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={17} color="#555" />
          <TextInput
            placeholder="Search songs, artists, albums..."
            placeholderTextColor="#444"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={17} color="#555" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(i)}
              style={[styles.tab, activeTab === i && styles.tabActive]}
            >
              <ThemedText style={[styles.tabText, activeTab === i && styles.tabTextActive]}>
                {tab}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom, paddingTop: 16 }}
      >

        {/* Trending now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionDot} />
              <ThemedText style={styles.sectionTitle}>Trending Now</ThemedText>
            </View>
            <TouchableOpacity>
              <ThemedText style={styles.seeAll}>See all</ThemedText>
            </TouchableOpacity>
          </View>

          {TRENDING.map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.trendingItem}>
              <ThemedText style={styles.trendingRank}>
                {String(index + 1).padStart(2, "0")}
              </ThemedText>
              <Image source={{ uri: item.image }} style={styles.trendingImage} />
              <View style={styles.trendingInfo}>
                <ThemedText style={styles.trendingTitle} numberOfLines={1}>{item.title}</ThemedText>
                <ThemedText style={styles.trendingArtist}>{item.artist}</ThemedText>
              </View>
              <View style={styles.trendingRight}>
                <ThemedText style={styles.trendingPlays}>{item.plays}</ThemedText>
                <TouchableOpacity>
                  <Ionicons name="play-circle" size={34} color="#06A0B5" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* New Releases */}
        <View style={[styles.section, { paddingHorizontal: 0 }]}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 20 }]}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionDot, { backgroundColor: "#F48FB1" }]} />
              <ThemedText style={styles.sectionTitle}>New Releases</ThemedText>
            </View>
            <TouchableOpacity>
              <ThemedText style={styles.seeAll}>See all</ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, gap: 12, paddingRight: 20 }}
          >
            {NEW_RELEASES.map((item) => (
              <TouchableOpacity key={item.id} style={styles.newCard}>
                <Image source={{ uri: item.image }} style={styles.newImage} />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} style={styles.newGradient} />
                <View style={styles.newInfo}>
                  <ThemedText style={styles.newTitle} numberOfLines={1}>{item.title}</ThemedText>
                  <ThemedText style={styles.newArtist}>{item.artist}</ThemedText>
                </View>
                <TouchableOpacity style={styles.newPlayBtn}>
                  <Ionicons name="play" size={13} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Browse categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionDot, { backgroundColor: "#80CBC4" }]} />
              <ThemedText style={styles.sectionTitle}>Browse by Genre</ThemedText>
            </View>
          </View>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard}>
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                <LinearGradient
                  colors={[...cat.color.map(c => c + "CC"), cat.color[1] + "FF"] as any}
                  style={styles.categoryOverlay}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <ThemedText style={styles.categoryTitle}>{cat.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },

  headerWrapper: {
    backgroundColor: "#0D0D0D",
    borderBottomWidth: 1,
    borderBottomColor: "#181818",
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 12,
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  iconBtn: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: "#181818", alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#252525",
  },

  searchBar: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#141414",
    marginHorizontal: 20, borderRadius: 12,
    paddingHorizontal: 12, height: 40,
    borderWidth: 1, borderColor: "#222",
    marginBottom: 12, gap: 8,
  },
  searchInput: { flex: 1, color: "#fff", fontSize: 13 },

  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: 10, backgroundColor: "#141414",
    borderWidth: 1, borderColor: "#222",
  },
  tabActive: { backgroundColor: "#06A0B5", borderColor: "#06A0B5" },
  tabText: { color: "#555", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#fff" },

  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", marginBottom: 14,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#06A0B5" },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  seeAll: { color: "#06A0B5", fontSize: 12, fontWeight: "600" },

  trendingItem: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 8, gap: 12,
    borderBottomWidth: 1, borderBottomColor: "#151515",
  },
  trendingRank: { color: "#333", fontSize: 14, fontWeight: "800", width: 22, textAlign: "center" },
  trendingImage: { width: 46, height: 46, borderRadius: 10 },
  trendingInfo: { flex: 1 },
  trendingTitle: { color: "#fff", fontSize: 13, fontWeight: "600" },
  trendingArtist: { color: "#555", fontSize: 11, marginTop: 2 },
  trendingRight: { alignItems: "center", gap: 2 },
  trendingPlays: { color: "#444", fontSize: 10 },

  newCard: { width: 140, height: 170, borderRadius: 16, overflow: "hidden" },
  newImage: { width: "100%", height: "100%", position: "absolute" },
  newGradient: { position: "absolute", width: "100%", height: "100%" },
  newInfo: { position: "absolute", bottom: 10, left: 10, right: 10 },
  newTitle: { color: "#fff", fontSize: 12, fontWeight: "700" },
  newArtist: { color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 1 },
  newPlayBtn: {
    position: "absolute", top: 9, right: 9,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "rgba(6,160,181,0.85)",
    alignItems: "center", justifyContent: "center",
  },

  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryCard: {
    width: CARD_WIDTH, height: 80,
    borderRadius: 14, overflow: "hidden",
  },
  categoryImage: { width: "100%", height: "100%", position: "absolute" },
  categoryOverlay: {
    position: "absolute", width: "100%", height: "100%",
    justifyContent: "center", alignItems: "center",
  },
  categoryTitle: { color: "#fff", fontSize: 15, fontWeight: "800", textAlign: "center" },
});

