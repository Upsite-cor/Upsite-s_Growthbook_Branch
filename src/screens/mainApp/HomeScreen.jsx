import React, {useEffect, useState} from 'react';
import {Text, View, Image, Alert} from 'react-native';
import growthbookLogo2 from '../../assets/images/growthbookLogo-2.png';
import globalStylesheet from '../../styles/global.style';
import homeScreenStylesheet from './HomeScreen.style';
import Container from '../../components/layout/container/Container.component';

import CategoryBox from '../../components/home/categoryList/CategoryList.component';
import ActionHeader from '../../components/layout/actionHeader/ActionHeader.component';
import SearchButton from '../../components/home/searchButton/SearchButton.component';
import CourseList from '../../components/home/courseList/CourseList.component';
import MarketingSlideContainer from '../../components/home/marketingSlideContainer/MarketingSlideContainer.component';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../features/loader/loaderSlice';
import firestore from '@react-native-firebase/firestore';

export const HomeScreen = ({navigation}) => {
  const [pills, setPills] = useState([]);
  const [latestCourses, setLatestCourses] = useState([]);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    let list = [];
    try {
      const collection = await firestore()
        .collection('categories')
        .limit(5)
        .get();
      collection.forEach(documentSnapshot => {
        list.push({...documentSnapshot.data(), id: documentSnapshot.id});
      });
    } catch (e) {}
    return list;
  };

  const fetchCourses = async () => {
    let list = [];
    try {
      const collection = await firestore().collection('courses').limit(3).get();
      collection.forEach(documentSnapshot => {
        list.push({...documentSnapshot.data(), id: documentSnapshot.id});
      });
    } catch (e) {}
    return list;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(showLoader());
      try {
        const cetegories = await fetchCategories();
        const courses = await fetchCourses();
        setPills(cetegories);
        setLatestCourses(courses);
      } catch (e) {
        Alert.alert(error.message);
      } finally {
        dispatch(hideLoader());
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const courseOpened = course => {
    navigation.navigate('course', {payload: course});
  };

  return (
    <Container>
      <View style={[globalStylesheet.centered, homeScreenStylesheet.logo]}>
        <Image style={{width: 218, height: 45}} source={growthbookLogo2} />
      </View>
      <Text style={globalStylesheet.heading}>Explore</Text>
      <SearchButton clickHandler={()=> {navigation.navigate("Search")}}/>
      <MarketingSlideContainer />
      <ActionHeader heading={'Categories'} />
      <CategoryBox categories={pills} clickHandler={(cat)=>{ navigation.navigate("courseListing", {type:"category",payload: {item: cat}});}}/>
      <ActionHeader heading={'Latest Courses'} />
      <CourseList courses={latestCourses} clickHandler={courseOpened} />
      <ActionHeader heading={'Popular Courses'} />
      <CourseList
        courses={[...latestCourses.slice().reverse()]}
        clickHandler={courseOpened}
      />
    </Container>
  );
};
