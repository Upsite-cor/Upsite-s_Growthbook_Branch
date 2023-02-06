import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { State, usePlaybackState } from 'react-native-track-player';
import { useOnTogglePlayback } from '../../../hooks/audioPlayer';
import { useDebouncedValue } from '../../../hooks/audioPlayer/useDebouncedValue';

import { PlayerButton } from '../atoms/PlayerButton';

export const PlayPauseButton = ({state}) => {
  const isPlaying = state === State.Playing;
  const isLoading = useDebouncedValue(
    state === State.Connecting || state === State.Buffering,
    250
  );

  const onTogglePlayback = useOnTogglePlayback();

  if (isLoading) {
    return (
      <ActivityIndicator />
    );
  }

  return (
    <PlayerButton
      type={isPlaying ? 'pause' : 'play'}
      onPress={onTogglePlayback}
      style={styles.playPause}
    />
  );
};

const styles = StyleSheet.create({
  playPause: {
    width: 120,
    textAlign: 'center',
  }
});