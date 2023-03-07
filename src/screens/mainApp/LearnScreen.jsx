import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import CourseTab from "../../components/tabs/TabBar";
import Container from "../../components/layout/container/Container.component";
import BackHeader from "../../components/headers/BackHeader.component";
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../../navigators/Application";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import image from '../../assets/images/noData.png';
import CourseCard from "../../components/home/courseCardv2/CourseCardv2.component";
import { colors, typography } from "../../styles/theme.style";

const LearnScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const tabs = ["In Progress", "Completed"];
  const dispatch = useDispatch();
  const user = useContext(UserContext);
  const fetchEnrolledCourses = async () => {
    const courses = await firestore()
      .collection("courses").where("enrollments", "array-contains", user.uid).get();
    return courses.docs.map((item) => {
      return {
        ...item.data(),
        id: item.id
      }
    });
  }
  const fetchProgresses = async () => {
    const progress = await firestore()
      .collection("progress").where("userId", "==", user.uid).get();
    return progress.docs.map((item) => {
      return {
        ...item.data(),
        id: item.id
      }
    });
  }
  const courseOpened = course => {
    navigation.navigate('course', { payload: course });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(showLoader());
      try {
        const course = await fetchEnrolledCourses();
        const progress = await fetchProgresses();
        setCourses(course);
        setProgress(progress);
      } catch (e) {
        Alert.alert(error.message);
      } finally {
        dispatch(hideLoader());
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <Container isScrollable={false}>
      <BackHeader type="text" text={"My Learning"} />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        {courses?.length == 0 && <View style={{ flex: 1 ,justifyContent:"center"}}>
          <Image style={{ width: "100%", height: 300 }} source={image} />
          <Text style={{
            fontFamily: typography.fontFamilies.PRIMARY,
            color: colors.font.DARK,
            textAlign: 'center',
            fontWeight: '600',
            marginTop: 15,
          }}>Looks like you are not enrolled in any course yet.</Text>
        </View>}
        {courses?.length != 0 && <ScrollView>
          <CourseTab
            tabs={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}></CourseTab>

          <View style={{ gap: 15, marginVertical: 15 }}>
            {/* {activeIndex == 0 && courses.map(course => (
              <CourseCard key={course.id} course={course} clickHandler={courseOpened}></CourseCard>
            ))} */}

            {activeIndex === 0 && courses
              .filter(course => {
                const progressRecord = progress.find(record => record.courseId === course.id);
                return progressRecord && progressRecord.status !== 'completed';
              })
              .map(course => (
                <CourseCard key={course.id} course={course} clickHandler={courseOpened}></CourseCard>
              ))}

            {activeIndex === 1 && courses
              .filter(course => {
                const progressRecord = progress.find(record => record.courseId === course.id);
                return progressRecord && progressRecord.status === 'completed';
              })
              .map(course => (
                <CourseCard key={course.id} course={course} clickHandler={courseOpened}></CourseCard>
              ))}
          </View>
        </ScrollView>}
      </View>
    </Container>
  )
};

export default LearnScreen;