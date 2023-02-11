import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Container from '../../components/layout/container/Container.component';
import {TouchableOpacity, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors, typography} from '../../styles/theme.style';
import { hideLoader, showLoader } from '../../features/loader/loaderSlice';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../navigators/Application';
import TableOfContent from '../../components/tableOfContent/TableOfContent.component';
import BackHeader from '../../components/navigation/organisms/BackHeader';


const CourseNavigation = ({route, navigation}) => {
  const {payload} = route.params;
  const dispatch = useDispatch();
  const [progress, setProgress] = useState([]);
  const User = useContext(UserContext);

  const fetchProgress = async () => {
    return await firestore().collection('progress').where('courseId','==', payload.courseId)
    .where('userId','==', User.uid)
    .limit(1)
    .get();
  };
  const fetchData = async () =>{
    dispatch(showLoader())
    try{
      let response = await fetchProgress();
    if(response.size>0){
      setProgress(response.docs[0].data());
    }
    dispatch(hideLoader());
    }catch(e){
      console.log(e);
      
    }
    dispatch(hideLoader());

  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      fetchData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  const handleNavigation = (event) => {
    const routes = {
      "audio": "audioPlayer",
      "quiz": "quizPlayer",
      "material": "lectureViewer"
    }
    navigation.navigate(routes[event?.type], {payload: {item: event, courseId: payload.courseId, progress:progress}});
  }
  return (
    <>
      <Container>
      <BackHeader onPress={() => navigation.goBack()} text={"Table Of Content"} />
       <View style={{marginTop: 15}}>
       <TableOfContent  content={progress?.syllabus} onPress={handleNavigation}></TableOfContent>
       </View>
      </Container>
    </>
  );
};

export default CourseNavigation;
