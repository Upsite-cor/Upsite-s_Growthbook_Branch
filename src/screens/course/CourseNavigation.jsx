import React, { useContext, useEffect, useReducer } from 'react';
import {View} from 'react-native';
import { UserContext } from '../../navigators/Application';
import TableOfContent from '../../components/tables/molecules/TableOfContent.component';
import BackHeader from '../../components/headers/BackHeader.component';
import Container from '../../components/layout/Container2.component';
import { layout } from '../../styles/theme.style';
import LazyLoader from '../../components/layout/LazyLoader.component';
import CourseService from '../../services/courses/Course.service';
import Refresh from '../../components/layout/Refresh.component';

const initialState = {refreshing:false, loaded: false, loading:true, progress : null};
const reducer = (state, action) =>{
    switch(action.type){
      case 'SHOW_REFRESHER':
        return {...state, refreshing:true};
      case 'HIDE_REFRESHER':
        return {...state, refreshing: false};
      case "SET_PROGRESS":
        return {...state, loaded: true, loading: false, progress: action.payload};
      case 'SET_LOADER':
        return {...state, loaded: false, loading: true};
      default:
        return state;
    }
}
const CourseNavigation = ({route, navigation}) => {
  const {payload} = route.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  const User = useContext(UserContext);

  const refreshContent = async () =>{
    dispatch({type: "SHOW_REFRESHER"});
    dispatch({type:"SET_LOADER"});
    await fetchData();
    dispatch({type: "HIDE_REFRESHER"});
  }

  const _getRefreshControl =()=>{
    return(
      <Refresh refreshing={state.refreshing} onRefresh={refreshContent}/>
    )
  }

  const fetchData = async () =>{
    const progress = await CourseService.getProgress(payload.courseId,User.uid);
    dispatch({type:"SET_PROGRESS", payload:progress})
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);


  const handleNavigation = (event) => {
    const routes = {
      "audio": "audioPlayer",
      "quiz": "quizPlayer",
      "material": "lectureViewer"
    }
    navigation.navigate(routes[event?.type], {payload: {item: event, courseId: payload.courseId, progress:state.progress}});
  }
  return (
    <Container  scrollViewBounce={true} refreshControl={_getRefreshControl()}>
        <View style={{flex:1,gap: layout.gap.NEIGHBORS}}>
        <BackHeader onPress={() => navigation.goBack()} text={"Table Of Content"} />
        <LazyLoader loaded={state.loaded} loading={state.loading} condition={state.progress}>
          <TableOfContent  content={state.progress?.syllabus} onPress={handleNavigation}></TableOfContent>
        </LazyLoader>
        </View>
    </Container>
  );
};

export default CourseNavigation;
