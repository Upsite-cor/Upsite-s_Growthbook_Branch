import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import {useCurrentTrack, useOnTogglePlayback} from '../../hooks/audioPlayer';
import growthbooKlogo from '../../assets/images/growthbookLogo-2.png';
import {
  QueueInitialTracksService,
  SetupService,
} from '../../services/audioPlayer';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, typography} from '../../styles/theme.style';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {updateCourse, updateMedia} from '../../features/course/courseSlice';
import { useDebouncedValue } from '../../hooks/audioPlayer/useDebouncedValue';

const AudioApp = ({route, navigation}) => {
  const {payload} = route.params;
  const course = useSelector(state => state.course.course);
  const tracks = useSelector(state => state.course.media);
  const track = useCurrentTrack();
  const progress = useProgress();
  const [isPlayerReady, setIsPlayerReady] = useState(false);


  const state = usePlaybackState();
  const isPlaying = state === State.Playing;
  const isLoading = useDebouncedValue(
    state === State.Connecting || state === State.Buffering,
    250
  );

  const onTogglePlayback = useOnTogglePlayback();




  const dispatch = useDispatch();

  const getAudioFiles = (file) => {
    let audioLessons = [];
    file?.syllabus.forEach(syllabus => {
      syllabus.child.forEach(child => {
        if (child.type === 'audio') {
          audioLessons.push(child);
        }
      });
    });
    return audioLessons;
  };

  const getMultipleDocs = async documentIds => {
    try {
      return firestore()
        .collection('audiobooks')
        .where(firestore.FieldPath.documentId(), 'in', documentIds)
        .get();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    async function run() {
      const isSetup = await SetupService();
      setIsPlayerReady(isSetup);

      try{
        if (course?.courseId != payload?.courseId) {
          dispatch(updateCourse(payload.progress));
          let audioFiles = getAudioFiles(payload.progress);
          const mediaFiles = await getMultipleDocs(
          audioFiles.map(item => item.contentId));
          const data =mediaFiles.docs.map(item=> {return {...item.data(), id: item.id}});
          dispatch(updateMedia(data));
          const queue = await TrackPlayer.getQueue();
          if (isSetup && queue.length <= 0) { 
            await QueueInitialTracksService(data, audioFiles);
          }
        } 
      }
      catch(e){
        console.log(e);
      }
    }

    run();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <Text>Please configure the audio player.</Text>
      </SafeAreaView>
    );
  }

  return (
    <Container isScrollable={false}>
      <View style={{flex: 1, marginHorizontal: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'white',
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name={'chevron-back'} size={24} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 25, marginTop: 40}}>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: 350, borderRadius: 25}}
            source={!track?.artwork? growthbooKlogo :{ uri: `${track?.artwork }` }}
          />
        </View>
        <View style={{marginTop: 25}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: typography.fontFamilies.PRIMARY,
              fontWeight: '700',
              fontSize: 24,
              color: '#1f1f1f',
            }}>
            {track?.title}
          </Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontFamily: typography.fontFamilies.PRIMARY,
              fontWeight: '700',
              fontSize: 16,
              color: '#B8B7B5',
            }}>
            {track?.artist}
          </Text>
        </View>

        <>
          <Slider
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
          {new Date(progress.position * 1000).toISOString().slice(14, 19)}
        </Text>
        <Text style={styles.labelText}>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .slice(14, 19)}
        </Text>
      </View>
        </>
        <View>
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 20,
              }}>
              <TouchableOpacity   onPress={() => TrackPlayer.skipToPrevious()}>
                <Icon
                  name={'play-skip-back'}
                  color={colors.general.BRAND}
                  size={40}></Icon>
              </TouchableOpacity>

            <View>
            {isLoading && <ActivityIndicator />}
              {!isLoading &&  <TouchableOpacity onPress={onTogglePlayback}>
             
             <Icon
               name={isPlaying? 'pause-circle': 'play-circle'}
               color={colors.general.BRAND}
               size={80}></Icon>
           </TouchableOpacity>}
            </View>
              <TouchableOpacity  onPress={() => TrackPlayer.skipToNext()}>
                <Icon
                  name={'play-skip-forward'}
                  color={colors.general.BRAND}
                  size={40}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  liveContainer: {
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
  liveText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  },
  container: {
    height: 40,
    width: 380,
    marginTop: 25,
    flexDirection: 'row',
  },
  labelContainer: {
    width: 370,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: '#B8B7B5',
    fontVariant: ['tabular-nums'],
  },
});
export default AudioApp;
