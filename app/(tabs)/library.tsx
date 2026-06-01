import { useState } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ui/ThemedText";

const FILTERS = ["Playlists", "Artists", "Albums", "Downloaded"];

const MOCK_LIBRARY = [
  { id: "1", title: "Liked Songs", subtitle: "Playlist • 142 songs", icon: "heart", isLocal: false },
  { id: "2", title: "Daily Mix 1", subtitle: "By musium • Repetitive hits", icon: "disc-outline", isLocal: false },
  { id: "3", title: "Rust & Chill", subtitle: "Playlist • 45 tracks", icon: "musical-notes-outline", isLocal: false },
  { id: "4", title: "Lo-Fi Beats for Coding", subtitle: "Album • Continuous mix", icon: "cafe-outline", isLocal: false },
  { id: "5", title: "Downloaded Tracks", subtitle: "Offline storage • 28 files", icon: "download-outline", isLocal: true },
];

export default function Library() {
  const [activeFilter, setActiveFilter] = useState("Playlists");

  return (
    <SafeAreaView className="flex-1 bg-background px-5">

      {/* Header */}
      <View className="flex-row justify-between items-center mt-4 mb-6">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
            <ThemedText variant="body" className="font-bold text-background text-base">S</ThemedText>
          </View>
          <ThemedText variant="title" className="text-white text-2xl font-bold">
            Your Library
          </ThemedText>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="add" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Filters */}
      <View className="mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full border ${
                  isActive ? "bg-primary border-primary" : "bg-transparent border-muted"
                }`}
              >
                <ThemedText
                  variant="caption"
                  className={`font-semibold ${isActive ? "text-background" : "text-white"}`}
                >
                  {filter}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Library List */}
      <FlatList
        data={MOCK_LIBRARY}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20">
            <Ionicons name="folder-open-outline" size={48} color="#8A9A9D" />
            <ThemedText variant="body" className="text-muted mt-4">
              Your collection is empty
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center justify-between py-3 mb-2">
            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 rounded-xl bg-[#242424] items-center justify-center border border-[#333]">
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.title === "Liked Songs" ? "#FF003C" : "#06A0B5"}
                />
              </View>
              <View>
                <ThemedText variant="body" className="text-white font-semibold text-base">
                  {item.title}
                </ThemedText>
                <View className="flex-row items-center gap-1.5 mt-0.5">
                  {item.isLocal && <Ionicons name="checkmark-circle" size={12} color="#06A0B5" />}
                  <ThemedText variant="caption" className="text-muted text-xs">
                    {item.subtitle}
                  </ThemedText>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#4A4A4A" />
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}
