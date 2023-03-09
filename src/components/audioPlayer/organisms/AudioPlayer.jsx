import React, { useEffect, useState } from 'react'
import TrackPlayer, { usePlaybackState, State, useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../redux/features/loader/loaderSlice'
import withAudioPlayer from '../../../hocs/withAudioPlayer';
import growthbooKlogo from '../../../assets/images/growthbookLogo-2.png';
import { useCurrentTrack, useOnTogglePlayback } from '../../../hooks/audioPlayer'
import { ActivityIndicator, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { colors, layout, typography } from '../../../styles/theme.style';
import Slider from '@react-native-community/slider';
import { PlayerButton } from '../atoms/PlayerButton';
import { useDebouncedValue } from '../../../hooks/audioPlayer/useDebouncedValue';

const AudioPlayer = () => {
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const [track, setTrack] = useState();
  const [index, setIndex] = useState();
  const state = usePlaybackState();

  const dispatch = useDispatch();
  const progress = useProgress();

  const isPlaying = state === State.Playing;
  const isLoading = useDebouncedValue(
    state === State.Connecting || state === State.Buffering,
    250
  );
  const onTogglePlayback = useOnTogglePlayback();

  useEffect(() => {
    const updateTrack = async () => {
      const trackId = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(trackId ?? 0);
      setTrack(track);
      setIndex(trackId ?? 0);
    };

    const listener = TrackPlayer.addEventListener(
      'playback-track-changed',
      updateTrack,
    );

    updateTrack();

    return () => listener.remove();
  }, []);

  const skipToPrevious = async () => {
    if(index==0){
      var queue = await TrackPlayer.getQueue();
      TrackPlayer.skip(queue.length-1 ,-1);
    }else{
      TrackPlayer.skipToPrevious();
    }
  }

  useEffect(() => {
    if (state == State.Connecting) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [state]);

  return (
    <View style={{ flex: 1, paddingHorizontal: layout.padding.HORIZONTAL, paddingVertical: layout.padding.VERTICAL, gap: layout.gap.NEIGHBORS }}>
      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          style={!track?.artwork ? [styles.artwork, styles.placeHolderArtwork] : styles.artwork}
          source={!track?.artwork ? growthbooKlogo : { uri: `${track?.artwork}` }}
        />
      </View>
      <Text style={styles.titleText}>{track?.title ?? "-"}</Text>
      <Text style={styles.artistText}>{track?.artist ?? "-"}</Text>
      <Slider
        disabled={isLoading || !isPlaying}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor={colors.general.BRAND}
        minimumTrackTintColor={colors.general.BRAND}
        maximumTrackTintColor={colors.general.BRAND_LIGHT}
        onSlidingComplete={TrackPlayer.seekTo}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>
          {new Date((progress.position > 0 ? progress.position : 0) * 1000).toISOString().slice(14, 19)}
        </Text>
        <Text style={styles.labelText}>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .slice(14, 19)}
        </Text>
      </View>
      <View style={styles.row}>
        <PlayerButton
          type="back"
          onPress={skipToPrevious}
        />
        {
          isLoading && <ActivityIndicator />
        }
        {!isLoading &&
          <PlayerButton
            type={isPlaying ? 'pause' : 'play'}
            onPress={onTogglePlayback}
          />
        }
        <PlayerButton
          onPress={() => TrackPlayer.skipToNext()}
          type="forward"
        />
      </View>
    </View>
  )
}
const getScaledStyles = (fontScale) => {
  return StyleSheet.create({
    placeHolderArtwork: {
      borderColor: colors.general.BACKGROUND,
      borderWidth: 1,
    },
    artwork: {
      maxWidth: 350 / fontScale,
      width: "100%",
      height: 350 / fontScale,
      borderRadius: layout.borderRadius.INPUT_FIELD,
    },
    titleText: {
      textAlign: 'center',
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM/fontScale,
      color: colors.font.PRIMARY,
      paddingVertical: layout.padding.VERTICAL
    },
    artistText: {
      textAlign: 'center',
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight:typography.fontWights.BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
      color: colors.font.DARK,
      paddingVertical: layout.padding.VERTICAL
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: "center"
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    labelText: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight:typography.fontWights.NORMAL,
      fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
      color:colors.font.DARK,
    },
  });
}


export default withAudioPlayer(AudioPlayer)