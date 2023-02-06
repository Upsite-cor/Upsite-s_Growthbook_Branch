import React, { useEffect } from 'react'
import { usePlaybackState, State } from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../../../features/loader/loaderSlice'
import withAudioPlayer from '../../../hocs/withAudioPlayer'
import { PlayerControls } from '../molecules/PlayerControls'
import { Progress } from '../molecules/Progress'
import { TrackInfo } from '../molecules/TrackInfo'

const AudioPlayer = ({track}: {track: any}) => {
  const state = usePlaybackState();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(state== State.Connecting){
      dispatch(showLoader());
    }else{
      dispatch(hideLoader());
    }
  }, [state]);
  return (
    <>
        <TrackInfo state={state}/>
        <Progress state={state} />
        <PlayerControls state={state} />
    </>
  )
}

export default withAudioPlayer(AudioPlayer)