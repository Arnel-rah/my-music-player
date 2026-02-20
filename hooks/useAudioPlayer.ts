import { useState, useEffect, useRef, useCallback } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_image: string;
  audio: string;
  shareurl?: string;
}

export function useAudioPlayer() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    return () => { soundRef.current?.unloadAsync(); };
  }, []);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setIsPlaying(status.isPlaying);
    setPosition(status.positionMillis ?? 0);
    setDuration(status.durationMillis ?? 0);
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPosition(0);
    }
  }, []);

  const loadAndPlay = useCallback(async (track: Track) => {
    try {
      setIsLoading(true);
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setCurrentTrack(track);
      setPosition(0);
      setDuration(0);

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.audio },
        { shouldPlay: true, progressUpdateIntervalMillis: 500 },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.error("Erreur lecture:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [onPlaybackStatusUpdate]);

  // Joue un track ET définit la queue
  const playTrack = useCallback(async (track: Track, trackQueue?: Track[]) => {
    const newQueue = trackQueue ?? [track];
    const index = newQueue.findIndex((t) => t.id === track.id);
    setQueue(newQueue);
    setQueueIndex(index >= 0 ? index : 0);
    await loadAndPlay(track);
  }, [loadAndPlay]);

  const playNext = useCallback(async () => {
    if (queue.length === 0) return;
    const nextIndex = (queueIndex + 1) % queue.length;
    setQueueIndex(nextIndex);
    await loadAndPlay(queue[nextIndex]);
  }, [queue, queueIndex, loadAndPlay]);

  const playPrev = useCallback(async () => {
    if (queue.length === 0) return;
    // Si on est à plus de 3s, on rewind
    if (position > 3000) {
      await soundRef.current?.setPositionAsync(0);
      return;
    }
    const prevIndex = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prevIndex);
    await loadAndPlay(queue[prevIndex]);
  }, [queue, queueIndex, position, loadAndPlay]);

  const togglePlay = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error("Erreur toggle:", error);
    }
  }, [isPlaying]);

  const seek = useCallback(async (millis: number) => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.setPositionAsync(millis);
    } catch (error) {
      console.error("Erreur seek:", error);
    }
  }, []);

  return {
    playTrack,
    playNext,
    playPrev,
    togglePlay,
    seek,
    isPlaying,
    isLoading,
    currentTrack,
    position,
    duration,
    queue,
    queueIndex,
  };
}