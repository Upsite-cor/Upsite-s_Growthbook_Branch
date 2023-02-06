import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import BackHeader from '../../components/navigation/organisms/BackHeader';
import Pdf from 'react-native-pdf';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../features/loader/loaderSlice';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../styles/theme.style';
import { UserContext } from '../../navigators/Application';
import { isContentCompleted, markContentCompleted } from '../../services/courses/progressService';

const LectureViewer = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState();
  const [loaded, setLoaded] = useState(false);
  const {payload} = route.params;
  const User = useContext(UserContext);
  const fetchLectureFile = async contentId => {
    const file = await firestore().collection('materials').doc(contentId).get();
    return file.data();
  };
  const fetchProgress = async () => {
    const progress= await firestore().collection('progress').where('courseId','==', payload.courseId)
    .where('userId','==', User.uid)
    .limit(1)
    .get();
    const id = progress.docs[0].id;
    return {...progress.docs[0].data(), id: id};
  };
  const updateProgress = async (progress) =>{
    await firestore()
  .collection('progress')
  .doc(progress.id)
  .update(progress);
  }
  const revealPdf = async () => {
    const progress = await fetchProgress();
    if(!isContentCompleted(payload?.item?.contentId, progress)){
      const updatedProgress=  markContentCompleted(payload?.item?.contentId, progress);
      await updateProgress(updatedProgress);
    }   
    setLoaded(true);
  }
  const setupFile = async payload => {
    dispatch(showLoader());
    try {
      const file = await fetchLectureFile(payload?.item?.contentId);
      setSource(file?.file);
    } catch (e) {
    } finally {
      dispatch(hideLoader());
    }
  };
  useEffect(() => {
    setupFile(payload);
  }, []);
  return (
    <Container isScrollable={false}>
      <View style={{flex: 1, marginHorizontal: 16, position:"relative"}}>
        {!loaded && <ActivityIndicator color={colors.general.BRAND} style={{position: 'absolute',
            backgroundColor: 'white',
            zIndex: 9999,
            width: '100%',
            justifyContent: 'center',
            height: '100%',}} />}
        <BackHeader onPress={() => navigation.goBack()} />
        {source && (
          <Pdf
            maxScale={1}
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              backgroundColor: 'white',
            }}
            source={{
              uri: source,
              cache: false,
            }}
            onLoadComplete={revealPdf}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
          />
        )}
      </View>
    </Container>
  );
};

export default LectureViewer;
