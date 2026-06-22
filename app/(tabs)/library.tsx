import { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ui/ThemedText";

interface LibraryItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  isLocal: boolean;
  isPlaying?: boolean;
  accentColor?: string;
}

interface PinnedItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
}

const FILTERS = ["Playlists", "Artists", "Albums", "Downloaded"];

const PINNED_ITEMS: PinnedItem[] = [
  {
    id: "p1",
    title: "Liked Songs",
    subtitle: "142 songs",
    icon: "heart",
    iconColor: "#FF003C",
    iconBg: "rgba(255, 0, 60, 0.12)",
  },
  {
    id: "p2",
    title: "Daily Mix 1",
    subtitle: "By musium",
    icon: "disc-outline",
    iconColor: "#06A0B5",
    iconBg: "rgba(6, 160, 181, 0.12)",
  },
];

const MOCK_LIBRARY: LibraryItem[] = [
  {
    id: "1",
    title: "Rust & Chill",
    subtitle: "Playlist • 45 tracks",
    icon: "musical-notes-outline",
    isLocal: false,
    isPlaying: true,
    accentColor: "#06A0B5",
  },
  {
    id: "2",
    title: "Lo-Fi Beats for Coding",
    subtitle: "Album • Continuous mix",
    icon: "cafe-outline",
    isLocal: false,
  },
  {
    id: "3",
    title: "Downloaded Tracks",
    subtitle: "28 files",
    icon: "download-outline",
    isLocal: true,
  },
  {
    id: "4",
    title: "Rock Essentials",
    subtitle: "Playlist • 67 tracks",
    icon: "mic-outline",
    isLocal: false,
  },
];

// ─── Pinned card ────────────────────────────────────────────────────────────
function PinnedCard({ item }: { item: PinnedItem }) {
  return (
    <TouchableOpacity
      className="flex-1 rounded-2xl p-3.5 border border-white/[0.07]"
      style={{ backgroundColor: "#1a1a1a" }}
      activeOpacity={0.7}
    >
      <View
        className="w-10 h-10 rounded-xl items-center justify-center mb-2.5"
        style={{ backgroundColor: item.iconBg }}
      >
        <Ionicons name={item.icon} size={20} color={item.iconColor} />
      </View>
      <ThemedText
        variant="body"
        className="text-white font-semibold text-sm mb-0.5"
        numberOfLines={1}
      >
        {item.title}
      </ThemedText>
      <ThemedText variant="caption" className="text-muted text-xs">
        {item.subtitle}
      </ThemedText>
    </TouchableOpacity>
  );
}

// ─── Library list item ───────────────────────────────────────────────────────
function LibraryListItem({ item }: { item: LibraryItem }) {
  const isDownloaded = item.isLocal;
  const accentColor = item.accentColor ?? "#06A0B5";

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between py-2.5 border-b border-white/[0.05]"
      activeOpacity={0.6}
    >
      {/* Art */}
      <View className="flex-row items-center gap-3.5">
        <View
          className="w-[52px] h-[52px] rounded-xl items-center justify-center border border-white/[0.07] overflow-hidden"
          style={{ backgroundColor: isDownloaded ? "#1a1f1a" : "#1f1f1f" }}
        >
          <Ionicons
            name={item.icon}
            size={22}
            color={
              item.isPlaying
                ? accentColor
                : isDownloaded
                ? "#4CAF50"
                : "rgba(255,255,255,0.35)"
            }
          />
          {/* Bottom stripe */}
          <View
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{
              backgroundColor: isDownloaded ? "#4CAF50" : accentColor,
              opacity: item.isPlaying || isDownloaded ? 0.7 : 0,
            }}
          />
        </View>

        {/* Text */}
        <View>
          <View className="flex-row items-center gap-2 mb-0.5">
            <ThemedText
              variant="body"
              className="font-semibold text-sm"
              style={{ color: item.isPlaying ? accentColor : "#fff" }}
              numberOfLines={1}
            >
              {item.title}
            </ThemedText>
            {/* Playing dot */}
            {item.isPlaying && (
              <View
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </View>

          <View className="flex-row items-center gap-1.5">
            {isDownloaded ? (
              <View
                className="flex-row items-center gap-1 px-1.5 py-0.5 rounded-md"
                style={{ backgroundColor: "rgba(76,175,80,0.12)" }}
              >
                <Ionicons name="checkmark-circle" size={10} color="#4CAF50" />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: "#4CAF50",
                  }}
                >
                  Offline
                </Text>
              </View>
            ) : null}
            <ThemedText variant="caption" className="text-muted text-xs">
              {item.subtitle}
            </ThemedText>
          </View>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.2)" />
    </TouchableOpacity>
  );
}

// ─── Section label ───────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <ThemedText
      variant="caption"
      className="text-muted text-xs font-semibold tracking-widest uppercase mb-3"
      style={{ letterSpacing: 0.8 }}
    >
      {label}
    </ThemedText>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function Library() {
  const [activeFilter, setActiveFilter] = useState("Playlists");

  const renderItem = useCallback(
    ({ item }: { item: LibraryItem }) => <LibraryListItem item={item} />,
    []
  );

  const ListHeader = (
    <>
      {/* Pinned */}
      <SectionLabel label="Pinned" />
      <View className="flex-row gap-2.5 mb-7">
        {PINNED_ITEMS.map((p) => (
          <PinnedCard key={p.id} item={p} />
        ))}
      </View>

      {/* Recent */}
      <SectionLabel label="Recent" />
    </>
  );

  return (
    <SafeAreaView className="flex-1 px-5" style={{ backgroundColor: "#111" }}>
      {/* Header */}
      <View className="flex-row justify-between items-center mt-4 mb-6">
        <View className="flex-row items-center gap-2.5">
          <View
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{ backgroundColor: "#06A0B5" }}
          >
            <ThemedText
              variant="body"
              className="font-bold text-sm"
              style={{ color: "#111" }}
            >
              S
            </ThemedText>
          </View>
          <ThemedText
            variant="title"
            className="text-white font-bold"
            style={{ fontSize: 22, letterSpacing: -0.5 }}
          >
            Your Library
          </ThemedText>
        </View>

        <View className="flex-row gap-[18px]">
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="search" size={22} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="add" size={24} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <View className="mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.7}
                className="px-4 py-[7px] rounded-full"
                style={{
                  backgroundColor: isActive ? "#06A0B5" : "transparent",
                  borderWidth: 1.5,
                  borderColor: isActive
                    ? "#06A0B5"
                    : "rgba(255,255,255,0.15)",
                }}
              >
                <ThemedText
                  variant="caption"
                  className="font-semibold text-[13px]"
                  style={{ color: isActive ? "#111" : "rgba(255,255,255,0.7)" }}
                >
                  {filter}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* List */}
      <FlatList
        data={MOCK_LIBRARY}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View className="items-center justify-center pt-20">
            <Ionicons
              name="folder-open-outline"
              size={48}
              color="rgba(255,255,255,0.2)"
            />
            <ThemedText variant="body" className="text-muted mt-4 text-sm">
              Your collection is empty
            </ThemedText>
          </View>
        }
      />
    </SafeAreaView>
  );
}
