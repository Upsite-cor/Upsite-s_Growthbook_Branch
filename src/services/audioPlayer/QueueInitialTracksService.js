import TrackPlayer, { RepeatMode } from 'react-native-track-player';

// @ts-expect-error – sure we can import this
import playlistData from '../../assets/audioPlayer/seedData.json';
// @ts-expect-error – sure we can import this
import localTrack from '../../assets/audioPlayer/pure.m4a';
// @ts-expect-error – sure we can import this
import localArtwork from '../../assets/audioPlayer/artwork.jpeg';

export const QueueInitialTracksService = async () => {
  await TrackPlayer.add([
    ...playlistData,
    {
      url: localTrack,
      title: 'Pure (Demo)',
      artist: 'David Chavez',
      artwork: localArtwork,
      duration: 28,
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};