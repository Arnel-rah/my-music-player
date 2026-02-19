// app/(tabs)/explore.tsx
import React, { useState, useCallback } from "react";
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
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { searchTracks, getTrendingTracks, getTracksByGenre, getNewAlbums, JamendoTrack, JamendoAlbum } from "@/services/jamendo";
import { useEffect } from "react";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 52) / 2;

const CATEGORIES = [
  { id: "1", title: "Pop", color: ["#E57373", "#C62828"] as const },
  { id: "2", title: "Hip-Hop", color: ["#FFB74D", "#E65100"] as const },
  { id: "3", title: "Jazz", color: ["#80CBC4", "#00695C"] as const },
  { id: "4", title: "Lo-fi", color: ["#4FC3F7", "#0277BD"] as const },
  { id: "5", title: "Rock", color: ["#CE93D8", "#6A1B9A"] as const },
  { id: "6", title: "Electronic", color: ["#B39DDB", "#4527A0"] as const },
  { id: "7", title: "R&B", color: ["#A5D6A7", "#2E7D32"] as const },
  { id: "8", title: "Classical", color: ["#FFF176", "#F57F17"] as const },
];

const TABS = ["Discover", "Charts", "New"];

export default function Explore() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [trending, setTrending] = useState<JamendoTrack[]>([]);
  const [newAlbums, setNewAlbums] = useState<JamendoAlbum[]>([]);
  const [searchResults, setSearchResults] = useState<JamendoTrack[]>([]);
  const [genreTracks, setGenreTracks] = useState<JamendoTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, a] = await Promise.all([getTrendingTracks(), getNewAlbums()]);
        setTrending(t);
        setNewAlbums(a);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSearch = useCallback(async (q: string) => {
    setSearch(q);
    if (q.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const results = await searchTracks(q);
      setSearchResults(results);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleCategory = async (genre: string) => {
    if (activeCategory === genre) { setActiveCategory(null); setGenreTracks([]); return; }
    setActiveCategory(genre);
    const tracks = await getTracksByGenre(genre.toLowerCase());
    setGenreTracks(tracks);
  };

  const isSearching = search.length >= 2;

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

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={17} color="#555" />
          <TextInput
            placeholder="Search songs, artists, albums..."
            placeholderTextColor="#444"
            value={search}
            onChangeText={handleSearch}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {searching ? (
            <ActivityIndicator size="small" color="#06A0B5" />
          ) : search.length > 0 ? (
            <TouchableOpacity onPress={() => { setSearch(""); setSearchResults([]); }}>
              <Ionicons name="close-circle" size={17} color="#555" />
            </TouchableOpacity>
          ) : null}
        </View>

        {!isSearching && (
          <View style={styles.tabRow}>
            {TABS.map((tab, i) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(i)}
                style={[styles.tab, activeTab === i && styles.tabActive]}
              >
                <ThemedText style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#06A0B5" size="large" />
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 + insets.bottom, paddingTop: 16 }}
        >

          {/* Search results */}
          {isSearching ? (
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                {searchResults.length} results for "{search}"
              </ThemedText>
              <View style={{ marginTop: 14 }}>
                {searchResults.map((track) => (
                  <TouchableOpacity key={track.id} style={styles.trendingItem}>
                    <Image source={{ uri: track.album_image }} style={styles.trendingImage} />
                    <View style={styles.trendingInfo}>
                      <ThemedText style={styles.trendingTitle} numberOfLines={1}>{track.name}</ThemedText>
                      <ThemedText style={styles.trendingArtist} numberOfLines={1}>{track.artist_name}</ThemedText>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="play-circle" size={34} color="#06A0B5" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
                {searchResults.length === 0 && !searching && (
                  <View style={styles.emptyState}>
                    <Ionicons name="search-outline" size={40} color="#333" />
                    <ThemedText style={styles.emptyText}>No results found</ThemedText>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <>

              {/* Trending */}
              {trending.length > 0 && (
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
                  {trending.map((item, index) => (
                    <TouchableOpacity key={item.id} style={styles.trendingItem}>
                      <ThemedText style={styles.trendingRank}>{String(index + 1).padStart(2, "0")}</ThemedText>
                      <Image source={{ uri: item.album_image }} style={styles.trendingImage} />
                      <View style={styles.trendingInfo}>
                        <ThemedText style={styles.trendingTitle} numberOfLines={1}>{item.name}</ThemedText>
                        <ThemedText style={styles.trendingArtist} numberOfLines={1}>{item.artist_name}</ThemedText>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="play-circle" size={34} color="#06A0B5" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* New Albums */}
              {newAlbums.length > 0 && (
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
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, gap: 12, paddingRight: 20 }}>
                    {newAlbums.map((album) => (
                      <TouchableOpacity key={album.id} style={styles.newCard}>
                        <Image source={{ uri: album.image }} style={styles.newImage} />
                        <LinearGradient colors={["transparent", "rgba(0,0,0,0.88)"]} style={styles.newGradient} />
                        <View style={styles.newInfo}>
                          <ThemedText style={styles.newTitle} numberOfLines={1}>{album.name}</ThemedText>
                          <ThemedText style={styles.newArtist} numberOfLines={1}>{album.artist_name}</ThemedText>
                        </View>
                        <TouchableOpacity style={styles.newPlayBtn}>
                          <Ionicons name="play" size={13} color="#fff" />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Genre tracks */}
              {activeCategory && genreTracks.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <View style={[styles.sectionDot, { backgroundColor: "#80CBC4" }]} />
                      <ThemedText style={styles.sectionTitle}>{activeCategory}</ThemedText>
                    </View>
                    <TouchableOpacity onPress={() => { setActiveCategory(null); setGenreTracks([]); }}>
                      <Ionicons name="close" size={18} color="#555" />
                    </TouchableOpacity>
                  </View>
                  {genreTracks.map((track) => (
                    <TouchableOpacity key={track.id} style={styles.trendingItem}>
                      <Image source={{ uri: track.album_image }} style={styles.trendingImage} />
                      <View style={styles.trendingInfo}>
                        <ThemedText style={styles.trendingTitle} numberOfLines={1}>{track.name}</ThemedText>
                        <ThemedText style={styles.trendingArtist} numberOfLines={1}>{track.artist_name}</ThemedText>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="play-circle" size={34} color="#06A0B5" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* by genre */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <View style={[styles.sectionDot, { backgroundColor: "#FFB74D" }]} />
                    <ThemedText style={styles.sectionTitle}>Browse by Genre</ThemedText>
                  </View>
                </View>
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[styles.categoryCard, activeCategory === cat.title && styles.categoryCardActive]}
                      onPress={() => handleCategory(cat.title)}
                    >
                      <LinearGradient
                        colors={cat.color}
                        style={styles.categoryGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      />
                      <ThemedText style={styles.categoryTitle}>{cat.title}</ThemedText>
                      {activeCategory === cat.title && (
                        <View style={styles.categoryCheck}>
                          <Ionicons name="checkmark" size={12} color="#fff" />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  loadingText: { color: "#555", fontSize: 13 },

  headerWrapper: { backgroundColor: "#0D0D0D", borderBottomWidth: 1, borderBottomColor: "#181818", paddingBottom: 10 },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: "#181818", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#252525" },

  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#141414", marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 12, height: 40, borderWidth: 1, borderColor: "#222", marginBottom: 10, gap: 8 },
  searchInput: { flex: 1, color: "#fff", fontSize: 13 },

  tabRow: { flexDirection: "row", paddingHorizontal: 20, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 10, backgroundColor: "#141414", borderWidth: 1, borderColor: "#222" },
  tabActive: { backgroundColor: "#06A0B5", borderColor: "#06A0B5" },
  tabText: { color: "#555", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#fff" },

  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#06A0B5" },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  seeAll: { color: "#06A0B5", fontSize: 12, fontWeight: "600" },

  trendingItem: { flexDirection: "row", alignItems: "center", paddingVertical: 8, gap: 12, borderBottomWidth: 1, borderBottomColor: "#141414" },
  trendingRank: { color: "#333", fontSize: 14, fontWeight: "800", width: 22, textAlign: "center" },
  trendingImage: { width: 46, height: 46, borderRadius: 10 },
  trendingInfo: { flex: 1 },
  trendingTitle: { color: "#fff", fontSize: 13, fontWeight: "600" },
  trendingArtist: { color: "#555", fontSize: 11, marginTop: 2 },

  newCard: { width: 140, height: 170, borderRadius: 16, overflow: "hidden" },
  newImage: { width: "100%", height: "100%", position: "absolute" },
  newGradient: { position: "absolute", width: "100%", height: "100%" },
  newInfo: { position: "absolute", bottom: 10, left: 10, right: 10 },
  newTitle: { color: "#fff", fontSize: 12, fontWeight: "700" },
  newArtist: { color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 1 },
  newPlayBtn: { position: "absolute", top: 9, right: 9, width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(6,160,181,0.85)", alignItems: "center", justifyContent: "center" },

  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryCard: { width: CARD_WIDTH, height: 75, borderRadius: 14, overflow: "hidden", justifyContent: "center", alignItems: "center" },
  categoryCardActive: { borderWidth: 2, borderColor: "#fff" },
  categoryGradient: { position: "absolute", width: "100%", height: "100%" },
  categoryTitle: { color: "#fff", fontSize: 15, fontWeight: "800" },
  categoryCheck: { position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },

  emptyState: { alignItems: "center", paddingVertical: 40, gap: 12 },
  emptyText: { color: "#333", fontSize: 14 },
});

