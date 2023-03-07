import React, {useEffect} from 'react';
import {View} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import BackHeader from '../../components/headers/BackHeader.component';
import AudioPlayer from '../../components/audioPlayer/organisms/AudioPlayer';
import {useDispatch, useSelector} from 'react-redux';
import { hideLoader, showLoader } from '../../features/loader/loaderSlice';
import {  updateCourseId } from '../../features/course/courseSlice';
import { QueueInitialTracksService } from '../../services/audioPlayer';
import TrackPlayer from 'react-native-track-player';

interface IProps {
  route: any;
  navigation: any;
}

const AudioApp = ({route, navigation}: IProps) => {
  const currentCourseId = useSelector(state => state.course.courseId);
  // const currentPlaylist = useSelector(state => state.course.media);
  const isPlayerReady = useSelector(state => state.audioPlayer.isPlayerReady);
  const dispatch = useDispatch();
  const {payload} = route.params;

  const setupAudioplayer = async () => {
    if(isPlayerReady){
      dispatch(showLoader());
     if (currentCourseId != payload?.courseId) {
        await QueueInitialTracksService(payload.progress);
        dispatch(updateCourseId(payload?.courseId));
     }
     TrackPlayer.getQueue().then(res=>{
      var index = res.findIndex(x=> x.id==payload.item?.id);
      if(index!=-1){
       TrackPlayer.getCurrentTrack().then(currentIndex=>{
         if(currentIndex!=index){
           TrackPlayer.skip(index, -1);
         }
        })
      }
      
   });
     dispatch(hideLoader());
   }
  }

  useEffect(() => {
    setupAudioplayer();
  }, [isPlayerReady]);

  return (
    <Container isScrollable={false}>
      <View style={{flex: 1, marginHorizontal: 16}}>
        <BackHeader onPress={() => navigation.goBack()} />
        <AudioPlayer />
      </View>
    </Container>
  );
};

export default AudioApp;
