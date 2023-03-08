import React, { useContext, useEffect, useReducer } from "react";
import { View } from "react-native";
import BackHeader from "../../components/headers/BackHeader.component";
import CourseCard from "../../components/cards/atoms/CourseSlimCard.component";
import Container from "../../components/layout/Container2.component";
import LazyLoader from "../../components/layout/LazyLoader.component";
import Refresh from "../../components/layout/Refresh.component";
import TabBar from "../../components/tabs/TabBar";
import { UserContext } from "../../navigators/Application";
import image from '../../assets/images/noData.png';
import CourseService from "../../services/courses/Course.service";
import { layout } from "../../styles/theme.style";
import ErrorMessage from "../../components/exceptions/atoms/ErrorMessage.component";

const tabs = ["In Progress", "Completed"];
const initialState = { refreshing: false, activeIndex: 0, courses: [], progress: [], loading: true, loaded: false, error: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_REFRESHER':
      return { ...state, refreshing: true };
    case 'HIDE_REFRESHER':
      return { ...state, refreshing: false };
    case 'UPDATE_ACTIVE_INDEX':
      return {...state, activeIndex: action.payload};
    case 'SHOW_ALL_LOADERS':
      return {...state, courses: [], progress: [], loading: true, loaded: false, error: false }
    case 'MARK_ERROR':
    return { ...state, error: true, courses: [], progress: []};
    case 'SET_DATA':
      return { ...state, loaded: true, loading: false, courses: action.payload.courses, progress: action.payload.progress, error: false };
    default:
      return state;
  }
}


const Learn = ({navigation}) => {
  const user = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const refreshContent = async () => {
    try{
      dispatch({type:"SHOW_REFRESHER"});
      await fetchData();
    }catch(e){

    }finally{
      dispatch({type: "HIDE_REFRESHER"});
    }
  }
  const _getRefreshControl = () => {
    return (
      <Refresh refreshing={state.refreshing} onRefresh={refreshContent} />
    )
  }

  const courseOpened = course => {
    navigation.navigate('course', { payload: course });
  };

  const fetchData = async () => {
    try {
      const courses = await CourseService.getAllEnrolledCourses(user.uid);
      const progresses = await CourseService.getAllProgress(user.uid);
      dispatch({ type: "SET_DATA", payload: { courses: courses, progress: progresses } });
    } catch (e) {
      console.log(e);
      dispatch({ type: "MARK_ERROR" });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getCourses = (activeIndex) => {
    if (activeIndex === 0) {
      return state.courses
        .filter(course => {
          const progressRecord = state.progress.find(record => record.courseId === course.id);
          return progressRecord && progressRecord.status !== 'completed';
        });
    } else {
      return state.courses
        .filter(course => {
          const progressRecord = state.progress.find(record => record.courseId === course.id);
          return progressRecord && progressRecord.status === 'completed';
        })
    }
  }

  return (
    <Container scrollViewBounce={true} refreshControl={_getRefreshControl()}>
      <LazyLoader loaded={state.loaded} loading={state.loading} condition={!state.error}>
        <View style={{ flex:1, paddingHorizontal: layout.padding.HORIZONTAL, gap: layout.gap.NEIGHBORS }}>
          <BackHeader type="text" text={"My Learning"} />
          <TabBar activeIndex={state.activeIndex} tabs={tabs} setActiveIndex={(index)=>{
            dispatch({type: "UPDATE_ACTIVE_INDEX", payload: index})
          }} />
          {(getCourses(state.activeIndex).length <= 0) && (
            <ErrorMessage imageSource={image} text={"No course "+(state.activeIndex==0? "in progress":"completed")+ " yet."} />
          )}
          <View style={{gap:layout.gap.NEIGHBORS, marginTop: layout.margin.NEIGHBORS}}>
          {getCourses(state.activeIndex).length > 0 && getCourses(state.activeIndex)
            .map(course => (
              <CourseCard key={course.id} course={course} clickHandler={courseOpened}></CourseCard>
            ))}
          </View>
        </View>
      </LazyLoader>
    </Container>
  )
};

export default Learn;