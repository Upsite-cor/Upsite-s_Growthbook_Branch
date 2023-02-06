import React from 'react';
import { View, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { PlayerButton } from '../atoms/PlayerButton';
import { PlayPauseButton } from './PlayPauseButton';

export const PlayerControls = ({state}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PlayerButton
          type="back"
          onPress={() => TrackPlayer.skipToPrevious()}
        />
        <PlayPauseButton state={state}/>
        <PlayerButton
          onPress={() => TrackPlayer.skipToNext()}
          type="forward"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop:30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:"center"
  },
});