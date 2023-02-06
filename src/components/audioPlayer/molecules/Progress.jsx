import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {useProgress, State} from 'react-native-track-player';
import { colors } from '../../../styles/theme.style';

export const Progress = ({state}) => {
  const progress = useProgress();
  return (
    <View>
      <Slider
        disabled={state!=State.Playing}
        style={styles.container}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor={colors.general.BRAND}
        minimumTrackTintColor={colors.general.BRAND}
        maximumTrackTintColor="#A6C6D0"
        onSlidingComplete={TrackPlayer.seekTo}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>
          {new Date((progress.position>0? progress.position: 0) * 1000).toISOString().slice(14, 19)}
        </Text>
        <Text style={styles.labelText}>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .slice(14, 19)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: '#B8B7B5',
    fontVariant: ['tabular-nums'],
  },
});