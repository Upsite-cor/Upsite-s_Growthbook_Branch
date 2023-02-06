import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import growthbooKlogo from '../../../assets/images/growthbookLogo-2.png';
import { useCurrentTrack } from '../../../hooks/audioPlayer';
import {typography} from '../../../styles/theme.style';

export const TrackInfo = ({state}) => {
  const track = useCurrentTrack();
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.artwork}
        source={!track?.artwork ? growthbooKlogo : {uri: `${track?.artwork}`}}
      />
      <Text style={styles.titleText}>{track?.title ?? "-"}</Text>
      <Text style={styles.artistText}>{track?.artist ?? "-"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 25, marginTop: 40},
  artwork: {
    width: '100%',
    height: 350,
    borderRadius: 25,
  },
  titleText: {
    marginTop: 25,
    textAlign: 'center',
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '700',
    fontSize: 24,
    color: '#1f1f1f',
  },
  artistText: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '700',
    fontSize: 16,
    color: '#B8B7B5',
  },
});
