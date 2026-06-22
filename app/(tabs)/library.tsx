import { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
  gradientColors: [string, string];
  stripeColor?: string;
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
    gradientColors: ["#0d3d42", "#06A0B5"],
    stripeColor: "#06A0B5",
  },
  {
    id: "2",
    title: "Lo-Fi Beats for Coding",
    subtitle: "Album • Continuous mix",
    icon: "cafe-outline",
    isLocal: false,
    gradientColors: ["#2a1f0d", "#8B5E1A"],
  },
  {
    id: "3",
    title: "Downloaded Tracks",
    subtitle: "28 files",
    icon: "download-outline",
    isLocal: true,
    gradientColors: ["#0d1f0d", "#2E7D32"],
    stripeColor: "#4CAF50",
  },
  {
    id: "4",
    title: "Rock Essentials",
    subtitle: "Playlist • 67 tracks",
    icon: "mic-outline",
    isLocal: false,
    gradientColors: ["#1f0d1f", "#7B1FA2"],
  },
  {
    id: "5",
    title: "Top Charts 2024",
    subtitle: "Playlist • 100 tracks",
    icon: "flame-outline",
    isLocal: false,
    gradientColors: ["#1a0d0d", "#C62828"],
  },
];


function SkeletonBox({
  width,
  height,
  borderRadius = 8,
  style,
}: {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.65],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#2a2a2a",
          opacity,
        },
        style,
      ]}
    />
  );
}

function SkeletonLibrary() {
  return (
    <>
      <ThemedText
        variant="caption"
        style={{
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.8,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: 12,
        }}
      >
        Pinned
      </ThemedText>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 28 }}>
        <SkeletonBox width="48%" height={90} borderRadius={16} />
        <SkeletonBox width="48%" height={90} borderRadius={16} />
      </View>

      <ThemedText
        variant="caption"
        style={{
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.8,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: 12,
        }}
      >
        Recent
      </ThemedText>

      {[120, 140, 100, 130].map((w, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            paddingVertical: 10,
            borderBottomWidth: i < 3 ? 1 : 0,
            borderBottomColor: "rgba(255,255,255,0.05)",
          }}
        >
          <SkeletonBox width={52} height={52} borderRadius={10} />
          <View style={{ gap: 6 }}>
            <SkeletonBox width={w} height={12} />
            <SkeletonBox width={w * 0.65} height={10} />
          </View>
        </View>
      ))}
    </>
  );
}


function SpringPress({
  children,
  onPress,
  style,
  scaleTo = 0.95,
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
      speed: 50,
      bounciness: 4,
    }).start();

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}


function PlayingDot({ color = "#06A0B5" }: { color?: string }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: color,
        marginLeft: 4,
        opacity,
      }}
    />
  );
}


function SectionLabel({ label }: { label: string }) {
  return (
    <ThemedText
      variant="caption"
      style={{
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
        marginBottom: 12,
      }}
    >
      {label}
    </ThemedText>
  );
}


function PinnedCard({ item }: { item: PinnedItem }) {
  return (
    <SpringPress scaleTo={0.96} style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.07)",
          padding: 14,
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            backgroundColor: item.iconBg,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name={item.icon} size={20} color={item.iconColor} />
        </View>
        <ThemedText
          variant="body"
          numberOfLines={1}
          style={{ fontSize: 13, fontWeight: "600", color: "#fff", marginBottom: 2 }}
        >
          {item.title}
        </ThemedText>
        <ThemedText
          variant="caption"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}
        >
          {item.subtitle}
        </ThemedText>
      </View>
    </SpringPress>
  );
}

function LibraryListItem({ item }: { item: LibraryItem }) {
  const accentColor = item.gradientColors[1];

  return (
    <SpringPress scaleTo={0.97}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.05)",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
          {/* Cover art */}
          <View style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden" }}>
            <LinearGradient
              colors={item.gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color="rgba(255,255,255,0.9)"
              />
              {/* Bottom stripe */}
              {(item.isPlaying || item.isLocal) && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    backgroundColor: item.stripeColor ?? accentColor,
                    opacity: 0.75,
                  }}
                />
              )}
            </LinearGradient>
          </View>

          {/* Text */}
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}
            >
              <ThemedText
                variant="body"
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: item.isPlaying ? accentColor : "#fff",
                  flexShrink: 1,
                }}
              >
                {item.title}
              </ThemedText>
              {item.isPlaying && <PlayingDot color={accentColor} />}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              {item.isLocal && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                    backgroundColor: "rgba(76,175,80,0.12)",
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 6,
                  }}
                >
                  <Ionicons name="checkmark-circle" size={10} color="#4CAF50" />
                  <Text style={{ fontSize: 10, fontWeight: "700", color: "#4CAF50" }}>
                    Offline
                  </Text>
                </View>
              )}
              <ThemedText
                variant="caption"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}
              >
                {item.subtitle}
              </ThemedText>
            </View>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={14}
          color="rgba(255,255,255,0.2)"
        />
      </View>

      <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.2)" />
    </TouchableOpacity>
  );
}

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

export default function Library() {
  const [activeFilter, setActiveFilter] = useState("Playlists");
  const [isLoading, setIsLoading] = useState(true);
  const contentOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }, 1800);
    return () => clearTimeout(timer);
  }, [contentOpacity]);

  const renderItem = useCallback(
    ({ item }: { item: LibraryItem }) => <LibraryListItem item={item} />,
    []
  );

  const ListHeader = (
    <>
      <SectionLabel label="Pinned" />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 28 }}>
        {PINNED_ITEMS.map((p) => (
          <PinnedCard key={p.id} item={p} />
        ))}
      </View>
      <SectionLabel label="Recent" />
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111", paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#06A0B5",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText
              variant="body"
              style={{ fontWeight: "700", fontSize: 14, color: "#111" }}
            >
              S
            </ThemedText>
          </View>
          <ThemedText
            variant="title"
            style={{ fontSize: 22, fontWeight: "700", color: "#fff", letterSpacing: -0.5 }}
          >
            Your Library
          </ThemedText>
        </View>

        <View style={{ flexDirection: "row", gap: 18 }}>
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="search" size={22} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="add" size={24} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 24 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <SpringPress key={filter} scaleTo={0.93} onPress={() => setActiveFilter(filter)}>
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 7,
                    borderRadius: 20,
                    backgroundColor: isActive ? "#06A0B5" : "transparent",
                    borderWidth: 1.5,
                    borderColor: isActive ? "#06A0B5" : "rgba(255,255,255,0.15)",
                  }}
                >
                  <ThemedText
                    variant="caption"
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: isActive ? "#111" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {filter}
                  </ThemedText>
                </View>
              </SpringPress>
            );
          })}
        </ScrollView>
      </View>
      {isLoading ? (
        <SkeletonLibrary />
      ) : (
        <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
          <FlatList
            data={MOCK_LIBRARY}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={renderItem}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={
              <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
                <Ionicons
                  name="folder-open-outline"
                  size={48}
                  color="rgba(255,255,255,0.2)"
                />
                <ThemedText
                  variant="body"
                  style={{ color: "rgba(255,255,255,0.4)", marginTop: 16, fontSize: 14 }}
                >
                  Your collection is empty
                </ThemedText>
              </View>
            }
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
