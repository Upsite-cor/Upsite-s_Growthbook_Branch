import { useState, useEffect } from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';

export const useCurrentTrack = () => {
  const [index, setIndex] = useState();
  const [track, setTrack] = useState();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
   setIndex(event.nextTrack);
  });

  useEffect(() => {
    if (index === undefined){
      TrackPlayer.getState().then(state=>{
        if(state==State.Playing){
          TrackPlayer.getCurrentTrack().then(currIndex=>{
            setIndex(currIndex)
          })
          .catch(err=>{
            
          })
        }
      }).catch(error=>{

      })
      return;
    };
    (async () => {
      const track = await TrackPlayer.getTrack(index);
      setTrack(track || undefined);
    })();
  }, [index]);
  return track;
};