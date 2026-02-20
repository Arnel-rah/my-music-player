import { useState, useEffect, useRef, useCallback } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_image: string;
  audio: string;
}

export function useAudioPlayer() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
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

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
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

  const playTrack = useCallback(async (track: Track) => {
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

  const stop = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setCurrentTrack(null);
      setIsPlaying(false);
      setPosition(0);
      setDuration(0);
    } catch (error) {
      console.error("Erreur stop:", error);
    }
  }, []);

  return {
    playTrack,
    togglePlay,
    seek,
    stop,
    isPlaying,
    isLoading,
    currentTrack,
    position,
    duration,
  };
}