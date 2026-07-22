import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ui/ThemedText";

const { width } = Dimensions.get("window");

// --- TYPES ---
interface LibraryItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  isLocal: boolean;
  isPlaying?: boolean;
  gradientColors: [string, string];
  type: "Playlist" | "Album" | "Artist" | "Download";
}

interface PinnedItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
  accentColor: string;
}

// --- DATA ---
const FILTERS = ["Playlists", "Artists", "Albums", "Downloaded"];

const PINNED_ITEMS: PinnedItem[] = [
  {
    id: "p1",
    title: "Liked Songs",
    subtitle: "142 tracks",
    icon: "heart",
    gradient: ["#FF0055", "#7A0026"],
    accentColor: "#FF0055",
  },
  {
    id: "p2",
    title: "Daily Mix 1",
    subtitle: "By Musium",
    icon: "disc",
    gradient: ["#00F2FE", "#4FACFE"],
    accentColor: "#00F2FE",
  },
];

const MOCK_LIBRARY: LibraryItem[] = [
  {
    id: "1",
    title: "Rust & Chill",
    subtitle: "Playlist • 45 tracks",
    icon: "musical-notes",
    isLocal: false,
    isPlaying: true,
    type: "Playlist",
    gradientColors: ["#0D3D42", "#06A0B5"],
  },
  {
    id: "2",
    title: "Lo-Fi Beats for Coding",
    subtitle: "Album • Continuous mix",
    icon: "cafe",
    isLocal: false,
    type: "Album",
    gradientColors: ["#3D2A0D", "#8B5E1A"],
  },
  {
    id: "3",
    title: "Downloaded Tracks",
    subtitle: "28 files",
    icon: "download",
    isLocal: true,
    type: "Download",
    gradientColors: ["#0D381E", "#2E7D32"],
  },
  {
    id: "4",
    title: "Rock Essentials",
    subtitle: "Playlist • 67 tracks",
    icon: "flash",
    isLocal: false,
    type: "Playlist",
    gradientColors: ["#3A0D3F", "#7B1FA2"],
  },
  {
    id: "5",
    title: "Top Charts 2026",
    subtitle: "Playlist • 100 tracks",
    icon: "flame",
    isLocal: false,
    type: "Playlist",
    gradientColors: ["#3F0D0D", "#C62828"],
  },
];

// --- COMPONENTS ---

// Animation de rebond tactile
function SpringPress({
  children,
  onPress,
  style,
  scaleTo = 0.96,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
  scaleTo?: number;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 40,
      bounciness: 3,
    }).start();

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.9}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

// Égaliseur audio animé pour le titre en cours de lecture
function AnimatedEqualizer({ color = "#00F2FE" }: { color?: string }) {
  const bar1 = useRef(new Animated.Value(0.3)).current;
  const bar2 = useRef(new Animated.Value(0.8)).current;
  const bar3 = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const createAnim = (val: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, { toValue: 1, duration, useNativeDriver: true }),
          Animated.timing(val, { toValue: 0.2, duration, useNativeDriver: true }),
        ])
      );

    const a1 = createAnim(bar1, 400);
    const a2 = createAnim(bar2, 600);
    const a3 = createAnim(bar3, 350);

    a1.start();
    a2.start();
    a3.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [bar1, bar2, bar3]);

  return (
    <View style={styles.eqContainer}>
      {[bar1, bar2, bar3].map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.eqBar,
            {
              backgroundColor: color,
              transform: [{ scaleY: bar }],
            },
          ]}
        />
      ))}
    </View>
  );
}

// Skeletons de chargement
function SkeletonBox({
  width,
  height,
  borderRadius = 8,
}: {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
}) {
  const shimmer = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmer]);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#20252B",
        opacity: shimmer,
      }}
    />
  );
}

function SkeletonLibrary() {
  return (
    <View style={{ paddingTop: 8 }}>
      <SkeletonBox width={70} height={12} borderRadius={4} />
      <View style={{ flexDirection: "row", gap: 12, marginVertical: 14 }}>
        <SkeletonBox width={(width - 52) / 2} height={100} borderRadius={18} />
        <SkeletonBox width={(width - 52) / 2} height={100} borderRadius={18} />
      </View>

      <View style={{ marginTop: 16, marginBottom: 14 }}>
        <SkeletonBox width={80} height={12} borderRadius={4} />
      </View>

      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.skeletonRow}>
          <SkeletonBox width={56} height={56} borderRadius={12} />
          <View style={{ gap: 8, flex: 1 }}>
            <SkeletonBox width="60%" height={14} borderRadius={4} />
            <SkeletonBox width="35%" height={10} borderRadius={4} />
          </View>
        </View>
      ))}
    </View>
  );
}

function PinnedCard({ item }: { item: PinnedItem }) {
  return (
    <SpringPress style={{ flex: 1 }}>
      <LinearGradient
        colors={[...item.gradient, "rgba(20, 24, 30, 0.9)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.pinnedCard}
      >
        <View style={styles.pinnedIconWrapper}>
          <Ionicons name={item.icon} size={20} color="#FFF" />
        </View>
        <View>
          <Text style={styles.pinnedTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.pinnedSubtitle}>{item.subtitle}</Text>
        </View>
      </LinearGradient>
    </SpringPress>
  );
}

function LibraryListItem({ item }: { item: LibraryItem }) {
  const accentColor = item.gradientColors[1];

  return (
    <SpringPress scaleTo={0.98}>
      <View style={styles.listItem}>
        <View style={styles.coverWrapper}>
          <LinearGradient
            colors={item.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.coverGradient}
          >
            <Ionicons name={item.icon} size={24} color="rgba(255,255,255,0.85)" />
          </LinearGradient>

          {item.isPlaying && (
            <View style={styles.playingOverlay}>
              <AnimatedEqualizer color="#FFF" />
            </View>
          )}
        </View>
        <View style={styles.itemInfo}>
          <Text
            numberOfLines={1}
            style={[
              styles.itemTitle,
              item.isPlaying && { color: "#00F2FE", fontWeight: "700" },
            ]}
          >
            {item.title}
          </Text>

          <View style={styles.itemMeta}>
            {item.isLocal && (
              <View style={styles.offlineBadge}>
                <Ionicons name="arrow-down-circle" size={11} color="#10B981" />
                <Text style={styles.offlineText}>Downloaded</Text>
              </View>
            )}
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="ellipsis-horizontal" size={18} color="rgba(255,255,255,0.3)" />
        </TouchableOpacity>
      </View>
    </SpringPress>
  );
}
export default function Library() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 1200);
    return () => clearTimeout(timer);
  }, [contentOpacity]);

  const toggleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const renderItem = useCallback(
    ({ item }: { item: LibraryItem }) => <LibraryListItem item={item} />,
    []
  );

  const filteredData = activeFilter
    ? MOCK_LIBRARY.filter((item) =>
        activeFilter === "Downloaded" ? item.isLocal : item.type === activeFilter.slice(0, -1)
      )
    : MOCK_LIBRARY;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={["#00F2FE", "#4FACFE"]}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>S</Text>
          </LinearGradient>
          <Text style={styles.headerTitle}>Your Library</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <SpringPress
                key={filter}
                scaleTo={0.94}
                onPress={() => toggleFilter(filter)}
              >
                <View style={[styles.chip, isActive && styles.chipActive]}>
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {filter}
                  </Text>
                  {isActive && (
                    <Ionicons name="close-circle" size={14} color="#0A0C0E" style={{ marginLeft: 4 }} />
                  )}
                </View>
              </SpringPress>
            );
          })}
        </ScrollView>
      </View>
      {isLoading ? (
        <View style={{ paddingHorizontal: 20 }}>
          <SkeletonLibrary />
        </View>
      ) : (
        <Animated.View style={[{ flex: 1, opacity: contentOpacity }]}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={renderItem}
            ListHeaderComponent={
              !activeFilter ? (
                <>
                  <Text style={styles.sectionHeader}>Pinned</Text>
                  <View style={styles.pinnedGrid}>
                    {PINNED_ITEMS.map((p) => (
                      <PinnedCard key={p.id} item={p} />
                    ))}
                  </View>
                  <Text style={styles.sectionHeader}>Recent</Text>
                </>
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="disc-outline" size={56} color="rgba(255,255,255,0.15)" />
                <Text style={styles.emptyTitle}>No items found</Text>
                <Text style={styles.emptySubtitle}>Try clearing your search filters.</Text>
              </View>
            }
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0C0E",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarGradient: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontWeight: "800",
    fontSize: 14,
    color: "#0A0C0E",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: -0.4,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  filterSection: {
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
  },
  chipActive: {
    backgroundColor: "#00F2FE",
    borderColor: "#00F2FE",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  chipTextActive: {
    color: "#0A0C0E",
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    marginTop: 8,
    marginBottom: 12,
  },
  pinnedGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  pinnedCard: {
    padding: 14,
    borderRadius: 18,
    height: 104,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  pinnedIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  pinnedTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFF",
  },
  pinnedSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 14,
  },
  coverWrapper: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  coverGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
  },
  itemMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  offlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  offlineText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#10B981",
  },
  itemSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  eqContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 14,
  },
  eqBar: {
    width: 3,
    height: "100%",
    borderRadius: 1.5,
  },
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginVertical: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
  },
});
