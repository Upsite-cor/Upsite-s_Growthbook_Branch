import React, {useEffect, useReducer} from 'react';
import {Text, View, StyleSheet, useWindowDimensions, ActivityIndicator} from 'react-native';
import Categories from '../../components/pills/molecules/Categories.component';
import ActionHeader from '../../components/headers/ActionHeader.component';
import SearchButton from '../../components/buttons/SearchButton.component';
import CourseList from '../../components/cards/molecules/CourseList.component';
import MarketingSlideContainer from '../../components/cards/organisms/MarketingSlides';
import Container from '../../components/layout/Container2.component';
import AuthHeader from '../../components/headers/AuthHeader.component';
import { colors, layout, typography } from '../../styles/theme.style';
import Refresh from '../../components/layout/Refresh.component';
import CategoriesService from '../../services/categories/Categories.service';
import CourseService from '../../services/courses/Course.service';

const initialState = {refreshing: false, categories:[], latestCourses:[], categoriesLoading: true, latestCoursesLoading: true };

const reducer = (state, action)=> {
  switch (action.type) {
    case 'SHOW_REFRESHER':
      return {...state, refreshing:true};
    case 'HIDE_REFRESHER':
      return {...state, refreshing: false};
    case 'SHOW_ALL_LOADERS':
      return { ...state,  categoriesLoading: true, latestCoursesLoading: true };
    case 'SET_CATEGORIES':
      return { ...state, categoriesLoading: false, categories: action.payload };
    case 'SET_COURSES':
      return { ...state, latestCoursesLoading: false, latestCourses: action.payload };
    case 'HIDE_CAT_LOADER':
      return { ...state, categoriesLoading: false, categories: []};
    case 'HIDE_COURSE_LOADER':
      return { ...state, latestCoursesLoading: false, latestCourses: []};
    default:
      return state;
  }
}

const Home = ({navigation}) => {
  const {fontScale} = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const [state, dispatch] = useReducer(reducer, initialState);

  const _getRefreshControl =()=>{
    return(
      <Refresh refreshing={state.refreshing} onRefresh={refreshContent}/>
    )
  }

  const refreshContent = async () =>{
    dispatch({type: "SHOW_REFRESHER"});
    await fetchData();
    dispatch({type: "HIDE_REFRESHER"});
  }

  const fetchCategories = async () => {
    try{ 
      var categories =  await CategoriesService.getAll();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    }catch(e){
      dispatch({ type: 'HIDE_CAT_LOADER', payload: courses });
    }
  };

  const fetchCourses = async () => {
    try{
      var courses =  await CourseService.getLatestCourses();
      dispatch({ type: 'SET_COURSES', payload: courses });
    }catch(e){
      dispatch({ type: 'HIDE_COURSE_LOADER', payload: courses });
    }
  };

  const fetchData = async () =>{
      try{
        dispatch({ type: 'SHOW_ALL_LOADERS'});
        await fetchCategories();
        await fetchCourses();
      }
      catch(error){}
  }

  useEffect(()=>{
    fetchData();
  },[])

  const courseOpened = course => {
    navigation.navigate('course', {payload: course});
  };

  return (
    <Container scrollViewBounce={true} refreshControl={_getRefreshControl()}>
      <View style={{flex:1, paddingHorizontal: layout.padding.HORIZONTAL, gap: layout.gap.NEIGHBORS}}>
        <AuthHeader />
        <Text style={styles.heading}>Explore</Text>
        <SearchButton clickHandler={()=> {navigation.navigate("Search")}}/>
        <MarketingSlideContainer />
        <ActionHeader heading={'Categories'} />
        <View>
          {state.categoriesLoading && <ActivityIndicator />}
          {!state.categoriesLoading && <Categories categories={state.categories} clickHandler={(cat)=>{ navigation.navigate("courseListing", {type:"category",payload: {item: cat}});}}/>}
        </View>
        <ActionHeader heading={'Latest Courses'} />
        <View>
          {state.latestCoursesLoading && <ActivityIndicator />}
          {!state.latestCoursesLoading && <CourseList courses={state.latestCourses} clickHandler={courseOpened} />}
        </View>
        <ActionHeader heading={'Popular Courses'} />
        <View>
        {state.latestCoursesLoading && <ActivityIndicator />}
          {!state.latestCoursesLoading && <CourseList  courses={[...state.latestCourses.slice().reverse()]} clickHandler={courseOpened} />}
        </View>
      </View>
    </Container>
  );
};

const getScaledStyles = fontScale =>{
  return StyleSheet.create({
      heading:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontSize: typography.fontSizes.FONT_SIZE_LARGE/fontScale,
        fontWeight: typography.fontWights.BOLD,
        color: colors.font.PRIMARY,
      }
  })
}

export default Home;