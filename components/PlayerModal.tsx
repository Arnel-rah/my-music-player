import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { ThemedText } from './ui/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function PlayerModal({
  visible,
  onClose,
  track,
  isPlaying,
  onToggle,
  position,
  duration,
  onSeek,
  onNext,
  onPrev,
}: any) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(isPlaying ? 1 : 0.85);

  React.useEffect(() => {
    scale.value = withSpring(isPlaying ? 1 : 0.85, { damping: 12 });
  }, [isPlaying]);

  const artworkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!track) return null;

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const progress = duration > 0 ? position / duration : 0;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" statusBarTranslucent>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Image
          source={{ uri: track.album_image }}
          style={styles.bgImage}
          blurRadius={30}
        />
        <LinearGradient
          colors={["rgba(10,10,10,0.6)", "rgba(5,5,5,0.95)", "#050505"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
            <Ionicons name="chevron-down" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <ThemedText style={styles.headerLabel}>NOW PLAYING</ThemedText>
            <ThemedText style={styles.headerAlbum} numberOfLines={1}>{track.album_name ?? "Single"}</ThemedText>
          </View>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.artworkWrapper}>
          <Animated.View style={[styles.artworkContainer, artworkStyle]}>
            <Image source={{ uri: track.album_image }} style={styles.artwork} />
            <View style={styles.artworkGlow} />
          </Animated.View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <ThemedText style={styles.trackTitle} numberOfLines={1}>{track.name}</ThemedText>
            <ThemedText style={styles.trackArtist} numberOfLines={1}>{track.artist_name}</ThemedText>
          </View>
          <View style={styles.infoActions}>
            <TouchableOpacity style={styles.likeBtn}>
              <Ionicons name="heart-outline" size={22} color="#06A0B5" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={22} color="#555" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]}>
              <View style={styles.progressDot} />
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor="transparent"
            onSlidingComplete={onSeek}
          />
          <View style={styles.timeRow}>
            <ThemedText style={styles.time}>{formatTime(position)}</ThemedText>
            <ThemedText style={styles.time}>{formatTime(duration)}</ThemedText>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.sideBtn}>
            <Ionicons name="shuffle-outline" size={22} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} onPress={onPrev}>
            <Ionicons name="play-skip-back" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playBtn} onPress={onToggle}>
            <LinearGradient
              colors={["#00C2CB", "#06A0B5"]}
              style={styles.playBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="#fff" style={{ marginLeft: isPlaying ? 0 : 4 }} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} onPress={onNext}>
            <Ionicons name="play-skip-forward" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideBtn}>
            <Ionicons name="repeat-outline" size={22} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Bottom actions */}
        <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity style={styles.bottomBtn}>
            <Ionicons name="share-outline" size={20} color="#555" />
            <ThemedText style={styles.bottomBtnText}>Share</ThemedText>
          </TouchableOpacity>
          <View style={styles.dotsRow}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
            ))}
          </View>
          <TouchableOpacity style={styles.bottomBtn}>
            <Ionicons name="list-outline" size={20} color="#555" />
            <ThemedText style={styles.bottomBtnText}>Queue</ThemedText>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505" },

  bgImage: {
    position: "absolute",
    width: "100%",
    height: "50%",
    opacity: 0.4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerBtn: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.07)",
    alignItems: "center", justifyContent: "center",
  },
  headerCenter: { alignItems: "center", flex: 1, marginHorizontal: 12 },
  headerLabel: { color: "#06A0B5", fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  headerAlbum: { color: "#555", fontSize: 12, marginTop: 2, maxWidth: 160 },

  artworkWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 36,
  },
  artworkContainer: {
    shadowColor: "#06A0B5",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 30,
  },
  artwork: {
    width: width * 0.78,
    height: width * 0.78,
    borderRadius: 24,
  },
  artworkGlow: {
    position: "absolute",
    bottom: -20,
    left: "10%",
    right: "10%",
    height: 40,
    backgroundColor: "rgba(6,160,181,0.25)",
    borderRadius: 50,
    filter: "blur(20px)",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    marginBottom: 24,
  },
  infoLeft: { flex: 1, marginRight: 16 },
  trackTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  trackArtist: { color: "#666", fontSize: 15, marginTop: 4 },
  infoActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  likeBtn: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: "rgba(6,160,181,0.1)",
    alignItems: "center", justifyContent: "center",
  },

  progressSection: { paddingHorizontal: 28, marginBottom: 16 },
  progressBarBg: {
    height: 4,
    backgroundColor: "#1E1E1E",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#06A0B5",
    borderRadius: 4,
    position: "relative",
  },
  progressDot: {
    position: "absolute",
    right: -5,
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    shadowColor: "#06A0B5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  slider: {
    width: "100%",
    height: 28,
    marginTop: -16,
    opacity: 0,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  time: { color: "#444", fontSize: 11, fontWeight: "600" },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    marginBottom: 32,
  },
  sideBtn: {
    width: 40, height: 40,
    alignItems: "center", justifyContent: "center",
  },
  skipBtn: {
    width: 52, height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#1E1E1E",
  },
  playBtn: {
    shadowColor: "#06A0B5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  playBtnGradient: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: "center", justifyContent: "center",
  },

  bottomActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    borderTopWidth: 1,
    borderTopColor: "#111",
    paddingTop: 16,
  },
  bottomBtn: { alignItems: "center", gap: 4 },
  bottomBtnText: { color: "#444", fontSize: 10, fontWeight: "600" },
  dotsRow: { flexDirection: "row", gap: 5, alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#222" },
  dotActive: { width: 18, height: 6, borderRadius: 3, backgroundColor: "#06A0B5" },
});

