import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ThemedText } from "@/components/ui/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const GRID_ITEM_WIDTH = (width - 50) / 2;

const CONTINUE_LISTENING = [
  { id: "1", title: "Coffee & Jazz", image: "https://picsum.photos/seed/jazz/100/100" },
  { id: "2", title: "RELEASED", image: "https://picsum.photos/seed/released/100/100" },
  { id: "3", title: "Anything Goes", image: "https://picsum.photos/seed/anything/100/100" },
  { id: "4", title: "Anime OSTs", image: "https://picsum.photos/seed/anime/100/100" },
  { id: "5", title: "Harry's House", image: "https://picsum.photos/seed/harry/100/100" },
  { id: "6", title: "Lo-Fi Beats", image: "https://picsum.photos/seed/lofi/100/100" },
];

const TOP_MIXES = [
  { id: "1", title: "Pop Mix", genre: "Pop • Charts", color: ["#E57373", "#C62828"] as const, image: "https://picsum.photos/seed/pop/300/300" },
  { id: "2", title: "Chill Mix", genre: "Lo-fi • Relax", color: ["#4FC3F7", "#0277BD"] as const, image: "https://picsum.photos/seed/chill/300/300" },
  { id: "3", title: "K-Pop Mix", genre: "K-Pop • Korean", color: ["#F48FB1", "#880E4F"] as const, image: "https://picsum.photos/seed/kpop/300/300" },
  { id: "4", title: "Jazz Mix", genre: "Jazz • Classic", color: ["#80CBC4", "#00695C"] as const, image: "https://picsum.photos/seed/jazz2/300/300" },
];

const RECENT = [
  { id: "1", title: "Late Night", artist: "Various", image: "https://picsum.photos/seed/recent1/300/300" },
  { id: "2", title: "Dream Pop", artist: "Indie", image: "https://picsum.photos/seed/recent2/300/300" },
  { id: "3", title: "Soul Vibes", artist: "Classic", image: "https://picsum.photos/seed/recent3/300/300" },
  { id: "4", title: "Acoustic", artist: "Chill", image: "https://picsum.photos/seed/recent4/300/300" },
];

const GENRES = ["All", "Pop", "Hip-Hop", "Jazz", "Lo-fi", "K-Pop"];

export default function Home() {
  const { user, logout } = useAuthStore();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeGenre, setActiveGenre] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    setShowMenu(false);
    await logout();
    router.replace("/(auth)/launch");
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={[styles.headerWrapper, { paddingTop: insets.top + 6 }]}>
        <View style={styles.topRow}>
          <View style={styles.greetingRow}>
            {/* Avatar cliquable → menu */}
            <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.avatarWrapper}>
              <Image
                source={{ uri: user?.avatar ?? "https://picsum.photos/seed/avatar/100/100" }}
                style={styles.avatar}
              />
              <View style={styles.avatarOnline} />
            </TouchableOpacity>
            <View>
              <ThemedText style={styles.greeting}>GOOD EVENING</ThemedText>
              <ThemedText style={styles.userName}>{user?.name ?? "Guest"}</ThemedText>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="heart-outline" size={19} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={19} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => setShowMenu(true)}>
              <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={17} color="#555" />
          <TextInput
            placeholder="Artists, songs, podcasts..."
            placeholderTextColor="#444"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={16} color="#06A0B5" />
          </TouchableOpacity>
        </View>

        {/* Genre chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreRow}
        >
          {GENRES.map((g, i) => (
            <TouchableOpacity
              key={g}
              onPress={() => setActiveGenre(i)}
              style={[styles.chip, activeGenre === i && styles.chipActive]}
            >
              <ThemedText style={[styles.chipText, activeGenre === i && styles.chipTextActive]}>
                {g}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Profile menu modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMenu(false)}>
          <View style={styles.menuCard}>
            {/* Profile info */}
            <View style={styles.menuProfile}>
              <Image
                source={{ uri: user?.avatar ?? "https://picsum.photos/seed/avatar/100/100" }}
                style={styles.menuAvatar}
              />
              <View>
                <ThemedText style={styles.menuName}>{user?.name ?? "Guest"}</ThemedText>
                <ThemedText style={styles.menuEmail}>{user?.email ?? ""}</ThemedText>
              </View>
            </View>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={18} color="#8A9A9D" />
              <ThemedText style={styles.menuItemText}>My Profile</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={18} color="#8A9A9D" />
              <ThemedText style={styles.menuItemText}>Settings</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="moon-outline" size={18} color="#8A9A9D" />
              <ThemedText style={styles.menuItemText}>Sleep timer</ThemedText>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={18} color="#FF5252" />
              <ThemedText style={[styles.menuItemText, { color: "#FF5252" }]}>Log out</ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom, paddingTop: 16 }}
      >

        {/* Hero */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: "https://picsum.photos/seed/hero/700/400" }}
            style={styles.hero}
            imageStyle={{ borderRadius: 24 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.9)"]}
              style={styles.heroGradient}
            >
              <View style={styles.heroBadge}>
                <View style={styles.heroBadgeDot} />
                <ThemedText style={styles.heroBadgeText}>NOW TRENDING</ThemedText>
              </View>
              <ThemedText style={styles.heroTitle}>Top Hits 2024</ThemedText>
              <ThemedText style={styles.heroSub}>Most streamed this week • 48 songs</ThemedText>
              <View style={styles.heroActions}>
                <TouchableOpacity style={styles.heroPlayBtn}>
                  <Ionicons name="play" size={15} color="#fff" />
                  <ThemedText style={styles.heroPlayText}>Play now</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.heroSaveBtn}>
                  <Ionicons name="heart-outline" size={17} color="#06A0B5" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.heroSaveBtn}>
                  <Ionicons name="ellipsis-horizontal" size={17} color="#8A9A9D" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Continue Listening */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Continue Listening</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAll}>See all</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {CONTINUE_LISTENING.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.gridImage} />
                <ThemedText style={styles.gridTitle} numberOfLines={1}>{item.title}</ThemedText>
                <View style={styles.gridPlay}>
                  <Ionicons name="play" size={11} color="#06A0B5" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Mixes */}
        <View style={[styles.section, { paddingHorizontal: 0 }]}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 20 }]}>
            <ThemedText style={styles.sectionTitle}>Your Top Mixes</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAll}>See all</ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, gap: 14, paddingRight: 20 }}>
            {TOP_MIXES.map((mix) => (
              <TouchableOpacity key={mix.id} style={styles.mixCard}>
                <Image source={{ uri: mix.image }} style={styles.mixImage} />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.82)"]} style={styles.mixGradient} />
                <LinearGradient colors={mix.color} style={styles.mixAccent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
                <View style={styles.mixInfo}>
                  <ThemedText style={styles.mixGenre}>{mix.genre}</ThemedText>
                  <ThemedText style={styles.mixTitle}>{mix.title}</ThemedText>
                </View>
                <TouchableOpacity style={styles.mixPlayBtn}>
                  <Ionicons name="play" size={15} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent */}
        <View style={[styles.section, { paddingHorizontal: 0 }]}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 20 }]}>
            <ThemedText style={styles.sectionTitle}>Based on your listening</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAll}>See all</ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, gap: 14, paddingRight: 20 }}>
            {RECENT.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recentCard}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.82)"]} style={styles.recentGradient} />
                <View style={styles.recentInfo}>
                  <ThemedText style={styles.recentTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.recentArtist}>{item.artist}</ThemedText>
                </View>
                <TouchableOpacity style={styles.recentPlayBtn}>
                  <Ionicons name="play" size={13} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  topRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 10,
  },
  greetingRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatarWrapper: { position: "relative" },
  avatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: "#06A0B5" },
  avatarOnline: {
    position: "absolute", bottom: 0, right: 0,
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: "#06A0B5", borderWidth: 1.5, borderColor: "#0D0D0D",
  },
  greeting: { color: "#555", fontSize: 9, fontWeight: "700", letterSpacing: 1.2 },
  userName: { color: "#fff", fontSize: 16, fontWeight: "800", marginTop: -1 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 7 },
  iconBtn: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: "#181818", alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#252525",
  },
  notifDot: {
    position: "absolute", top: 7, right: 7,
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: "#06A0B5", zIndex: 1,
  },

  searchBar: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#141414",
    marginHorizontal: 20, borderRadius: 12,
    paddingHorizontal: 12, height: 40,
    borderWidth: 1, borderColor: "#222",
    marginBottom: 10, gap: 8,
  },
  searchInput: { flex: 1, color: "#fff", fontSize: 13 },
  filterBtn: {
    width: 26, height: 26, borderRadius: 6,
    backgroundColor: "rgba(6,160,181,0.1)",
    alignItems: "center", justifyContent: "center",
  },

  genreRow: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 10, backgroundColor: "#141414",
    borderWidth: 1, borderColor: "#222",
  },
  chipActive: { backgroundColor: "#fff", borderColor: "#fff" },
  chipText: { color: "#555", fontSize: 12, fontWeight: "700" },
  chipTextActive: { color: "#000" },

  // Modal menu
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-start", alignItems: "flex-end",
    paddingTop: 100, paddingRight: 16,
  },
  menuCard: {
    backgroundColor: "#1C1C1C",
    borderRadius: 18, padding: 6,
    width: 230,
    borderWidth: 1, borderColor: "#2A2A2A",
    shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5, shadowRadius: 20, elevation: 20,
  },
  menuProfile: {
    flexDirection: "row", alignItems: "center", gap: 10,
    padding: 12, paddingBottom: 10,
  },
  menuAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: "#06A0B5" },
  menuName: { color: "#fff", fontSize: 14, fontWeight: "700" },
  menuEmail: { color: "#555", fontSize: 11, marginTop: 1 },
  menuDivider: { height: 1, backgroundColor: "#252525", marginHorizontal: 6, marginVertical: 4 },
  menuItem: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12,
  },
  menuItemText: { color: "#ccc", fontSize: 14, fontWeight: "500" },

  heroSection: { paddingHorizontal: 20, marginBottom: 28 },
  hero: { width: "100%", height: 215 },
  heroGradient: { flex: 1, borderRadius: 24, padding: 18, justifyContent: "flex-end" },
  heroBadge: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "rgba(6,160,181,0.25)",
    borderWidth: 1, borderColor: "rgba(6,160,181,0.6)",
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3,
    alignSelf: "flex-start", marginBottom: 8,
  },
  heroBadgeDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#06A0B5" },
  heroBadgeText: { color: "#00E5FF", fontSize: 9, fontWeight: "700", letterSpacing: 1.5 },
  heroTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 3 },
  heroSub: { color: "rgba(255,255,255,0.55)", fontSize: 11, marginBottom: 14 },
  heroActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  heroPlayBtn: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "#06A0B5", borderRadius: 22,
    paddingHorizontal: 18, paddingVertical: 9,
  },
  heroPlayText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  heroSaveBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },

  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", marginBottom: 14,
  },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  seeAll: { color: "#06A0B5", fontSize: 12, fontWeight: "600" },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 10 },
  gridItem: {
    width: GRID_ITEM_WIDTH, flexDirection: "row", alignItems: "center",
    backgroundColor: "#181818", borderRadius: 14,
    overflow: "hidden", height: 56,
    borderWidth: 1, borderColor: "#222",
  },
  gridImage: { width: 56, height: 56 },
  gridTitle: { color: "#fff", fontSize: 12, fontWeight: "600", flex: 1, marginLeft: 10, marginRight: 4 },
  gridPlay: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: "rgba(6,160,181,0.15)",
    alignItems: "center", justifyContent: "center",
    marginRight: 8, flexShrink: 0,
  },

  mixCard: { width: 155, height: 205, borderRadius: 18, overflow: "hidden" },
  mixImage: { width: "100%", height: "100%", position: "absolute" },
  mixGradient: { position: "absolute", width: "100%", height: "100%" },
  mixAccent: { position: "absolute", bottom: 0, left: 0, right: 0, height: 3 },
  mixInfo: { position: "absolute", bottom: 44, left: 12, right: 12 },
  mixGenre: { color: "rgba(255,255,255,0.5)", fontSize: 9, marginBottom: 2 },
  mixTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  mixPlayBtn: {
    position: "absolute", bottom: 10, right: 10,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },

  recentCard: { width: 140, height: 170, borderRadius: 18, overflow: "hidden" },
  recentImage: { width: "100%", height: "100%", position: "absolute" },
  recentGradient: { position: "absolute", width: "100%", height: "100%" },
  recentInfo: { position: "absolute", bottom: 10, left: 10, right: 10 },
  recentTitle: { color: "#fff", fontSize: 12, fontWeight: "700" },
  recentArtist: { color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 1 },
  recentPlayBtn: {
    position: "absolute", top: 9, right: 9,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "rgba(6,160,181,0.85)",
    alignItems: "center", justifyContent: "center",
  },
});

