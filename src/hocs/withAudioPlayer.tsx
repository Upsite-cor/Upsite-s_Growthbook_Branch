import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ErrorAudioPlayer from '../components/audioPlayer/organisms/ErrorAudioPlayer';
import { playerNotReady, playerReady } from '../redux/features/audioPlayer/audioPlayerSlice';
import { SetupService } from '../services/audioPlayer';

const withAudioPlayer = (Component: any) => (props: any) =>{
    const isPlayerReady = useSelector(state=> state.audioPlayer.isPlayerReady);
    const dispatch = useDispatch();
    useEffect(() => {
      SetupService().then(res => {
        if (res) {
          dispatch(playerReady());
        }else{
          dispatch(playerNotReady());
        }
      }).catch(err=>{
        dispatch(playerNotReady());
      })
    }, [isPlayerReady]);
  
    if(!isPlayerReady){
        return <ErrorAudioPlayer />
    }
    return(
        <Component {...props} />
    )
}

export default withAudioPlayer