import TrackPlayer, { RepeatMode } from 'react-native-track-player';

export const QueueInitialTracksService = async (tracks, data) => {
  TrackPlayer.reset()
  tracks.forEach(async item => {
    console.log(item);
    await TrackPlayer.add({
      id: item.id,
      url: item.file,
      title: "asfg",
      artist: item.artist ?? "",
      artwork: item.coverArt,
      //  duration: 28,
       ...item
    });
  });
  
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};