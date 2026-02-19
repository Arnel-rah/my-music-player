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
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useHomeData } from "@/hooks/useHomeData";

const { width } = Dimensions.get("window");
const GRID_ITEM_WIDTH = (width - 50) / 2;
const GENRES = ["All", "Pop", "Hip-Hop", "Jazz", "Lo-fi", "K-Pop"];

export default function Home() {
  const { user, logout } = useAuthStore();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeGenre, setActiveGenre] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  
  const { featured, trending, albums, loading } = useHomeData(GENRES[activeGenre]);

  const handleLogout = async () => {
    setShowMenu(false);
    await logout();
    router.replace("/(auth)/launch");
  };

  const hero = featured[0];

  return (
    <View style={styles.container}>
      <View style={[styles.headerWrapper, { paddingTop: insets.top + 6 }]}>
        <View style={styles.topRow}>
          <View style={styles.greetingRow}>
            <TouchableOpacity onPress={() => setShowMenu(true)}>
              <Image source={{ uri: user?.avatar ?? "https://picsum.photos/seed/avatar/100/100" }} style={styles.avatar} />
              <View style={styles.avatarOnline} />
            </TouchableOpacity>
            <View>
              <ThemedText style={styles.greeting}>GOOD EVENING</ThemedText>
              <ThemedText style={styles.userName}>{user?.name ?? "Guest"}</ThemedText>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}><Ionicons name="heart-outline" size={19} color="#fff" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => setShowMenu(true)}><Ionicons name="ellipsis-vertical" size={18} color="#fff" /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={17} color="#555" />
          <TextInput placeholder="Artists, songs, albums..." placeholderTextColor="#444" style={styles.searchInput} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genreRow}>
          {GENRES.map((g, i) => (
            <TouchableOpacity key={g} onPress={() => setActiveGenre(i)} style={[styles.chip, activeGenre === i && styles.chipActive]}>
              <ThemedText style={[styles.chipText, activeGenre === i && styles.chipTextActive]}>{g}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Profile Menu Modal */}
      <Modal visible={showMenu} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMenu(false)}>
          <View style={styles.menuCard}>
            <View style={styles.menuProfile}>
              <Image source={{ uri: user?.avatar ?? "https://picsum.photos/seed/avatar/100/100" }} style={styles.menuAvatar} />
              <View><ThemedText style={styles.menuName}>{user?.name}</ThemedText><ThemedText style={styles.menuEmail}>{user?.email}</ThemedText></View>
            </View>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={18} color="#FF5252" />
              <ThemedText style={[styles.menuItemText, { color: "#FF5252" }]}>Log out</ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {loading ? (
        <View style={styles.loadingContainer}><ActivityIndicator color="#06A0B5" size="large" /></View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {hero && (
            <View style={styles.heroSection}>
              <ImageBackground source={{ uri: hero.album_image }} style={styles.hero} imageStyle={{ borderRadius: 24 }}>
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} style={styles.heroGradient}>
                  <ThemedText style={styles.heroTitle}>{hero.name}</ThemedText>
                  <TouchableOpacity style={styles.heroPlayBtn}>
                    <Ionicons name="play" size={15} color="#fff" />
                    <ThemedText style={styles.heroPlayText}>Play Now</ThemedText>
                  </TouchableOpacity>
                </LinearGradient>
              </ImageBackground>
            </View>
          )}

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Trending {GENRES[activeGenre]}</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14 }}>
              {trending.map((track) => (
                <TouchableOpacity key={track.id} style={styles.recentCard}>
                  <Image source={{ uri: track.album_image }} style={styles.recentImage} />
                  <ThemedText style={styles.recentTitle} numberOfLines={1}>{track.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}

      {/* Bottom Bar */}
      <View style={[styles.bottomTab, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.tabItem}><Ionicons name="home" size={22} color="#06A0B5" /><ThemedText style={styles.tabActive}>Home</ThemedText></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Ionicons name="search-outline" size={22} color="#8A9A9D" /><ThemedText style={styles.tabInactive}>Explore</ThemedText></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Ionicons name="library-outline" size={22} color="#8A9A9D" /><ThemedText style={styles.tabInactive}>Library</ThemedText></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  headerWrapper: { backgroundColor: "#0D0D0D", paddingBottom: 12 },
  topRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", marginBottom: 15 },
  greetingRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, borderWidth: 1.5, borderColor: "#06A0B5" },
  avatarOnline: { position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: "#06A0B5", borderWidth: 2, borderColor: "#0D0D0D" },
  greeting: { color: "#555", fontSize: 9, fontWeight: "700" },
  userName: { color: "#fff", fontSize: 16, fontWeight: "800" },
  headerActions: { flexDirection: "row", gap: 10 },
  iconBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#181818", alignItems: "center", justifyContent: "center" },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#141414", marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 12, height: 42, marginBottom: 15, gap: 8 },
  searchInput: { flex: 1, color: "#fff" },
  genreRow: { paddingHorizontal: 20, gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "#181818" },
  chipActive: { backgroundColor: "#fff" },
  chipText: { color: "#666", fontWeight: "700" },
  chipTextActive: { color: "#000" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  heroSection: { paddingHorizontal: 20, marginVertical: 20 },
  hero: { width: "100%", height: 200 },
  heroGradient: { flex: 1, padding: 20, justifyContent: "flex-end", borderRadius: 24 },
  heroTitle: { color: "#fff", fontSize: 22, fontWeight: "900", marginBottom: 10 },
  heroPlayBtn: { flexDirection: "row", backgroundColor: "#06A0B5", alignSelf: "flex-start", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, alignItems: "center", gap: 5 },
  heroPlayText: { color: "#fff", fontWeight: "700" },
  section: { paddingLeft: 20, marginBottom: 30 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "800", marginBottom: 15 },
  recentCard: { width: 140, gap: 8 },
  recentImage: { width: 140, height: 140, borderRadius: 15 },
  recentTitle: { color: "#fff", fontSize: 12, fontWeight: "600" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center" },
  menuCard: { width: 250, backgroundColor: "#1A1A1A", borderRadius: 20, padding: 20 },
  menuProfile: { alignItems: "center", gap: 10, marginBottom: 15 },
  menuAvatar: { width: 60, height: 60, borderRadius: 30 },
  menuName: { color: "#fff", fontWeight: "800" },
  menuEmail: { color: "#555", fontSize: 12 },
  menuDivider: { height: 1, backgroundColor: "#333", marginVertical: 10 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10 },
  menuItemText: { fontSize: 14, fontWeight: "600" },
  bottomTab: { position: "absolute", bottom: 0, width: "100%", backgroundColor: "#0D0D0D", flexDirection: "row", justifyContent: "space-around", paddingTop: 10, borderTopWidth: 1, borderTopColor: "#1A1A1A" },
  tabItem: { alignItems: "center" },
  tabActive: { color: "#06A0B5", fontSize: 10, marginTop: 4 },
  tabInactive: { color: "#8A9A9D", fontSize: 10, marginTop: 4 },
});