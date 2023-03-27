import React, { useContext, useEffect, useReducer } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useDispatch } from "react-redux";
import AnimatedHeader from "../../components/animations/AnimatedHeader.component";
import Button from "../../components/buttons/Button.component";
import AnimatedNavHeader from "../../components/headers/AnimatedNavHeader.component";
import AuthorHeader from "../../components/headers/AuthorHeader.component";
import ContentHeader from "../../components/headers/ContentHeader.component";
import Container from "../../components/layout/Container2.component";
import LazyLoader from "../../components/layout/LazyLoader.component";
import CoursePillHolder from "../../components/pills/molecules/CoursePillHolder.component";
import TableOfContent from "../../components/tables/molecules/TableOfContent.component";
import TabBar from "../../components/tabs/TabBar";
import WordWrapper from "../../components/wrappers/WordWrapper.component";
import { hideLoader, showLoader } from "../../redux/features/loader/loaderSlice";
import { UserContext } from "../../navigators/Application";
import AuthorService from "../../services/courses/Author.service";
import CourseService from "../../services/courses/Course.service";
import { colors, layout, typography } from "../../styles/theme.style";
import { addUniqueValueToArray } from "../../utils";

const initialState = { activeIndex: 0, course: null, author: null, syllabus: null, courseLoading: true, authorLoading: true, syllabusLoading: true, courseLoaded: false, syllabusLoaded: false, authorLoaded: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COURSE':
      return { ...state, course: action.payload };
    case 'SET_COURSE':
      return { ...state, courseLoaded: true, course: action.payload, courseLoading: false };
    case 'SET_AUTHOR':
      return { ...state, authorLoaded: true, author: action.payload, authorLoading: false };
    case 'SET_SYLLABUS':
      return { ...state, syllabusLoaded: true, syllabus: action.payload, syllabusLoading: false };
    case 'UPDATE_ACTIVE_INDEX':
      return { ...state, activeIndex: action.payload }
    default:
      return state;
  }
}

const Course = ({ route, navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalDispatch = useDispatch();
  const { payload } = route.params;
  const tabs = ['Description', 'Syllabus'];
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const user = useContext(UserContext);

  useEffect(() => {
    fetchCourse(payload?.id);
  }, []);

  useEffect(() => {
    if (state.course) {
      fetchAuthor();
      fetchSyllabus();
    }
  }, [state.course]);

  const fetchCourse = async (courseId) =>{
    var course = await CourseService.getCourseById(courseId);
    dispatch({ type: "SET_COURSE", payload: course });
  };

  const fetchAuthor = async () => {
    var author = null;
    if (state.course?.author?.id) {
      author = await AuthorService.getAuthor(state.course?.author?.id)
    }
    dispatch({ type: "SET_AUTHOR", payload: author });
  }

  const fetchSyllabus = async () => {
    var syllabus = await CourseService.getSyllabus(state.course?.id);
    dispatch({ type: "SET_SYLLABUS", payload: syllabus });
  }

  const viewProgress = () => {
    navigation.replace('courseNavigation', { payload: { courseId: state.course?.id } });
  };

  const enrollIntoCourse = async () => {
    try {
      globalDispatch(showLoader());
      const newSyllabus = state?.syllabus?.syllabus?.map(item => {
        return {
          ...item,
          child: item?.child?.map(childItem => {
            return {
              ...childItem,
              isCompleted: false,
            };
          }),
          isCompleted: false,
        };
      });
       await CourseService.addProgress(state?.course?.id, user.uid, newSyllabus);
       await CourseService.updateEnrollment(state?.course?.id, user.uid);
      dispatch({
        type: "UPDATE_COURSE",
        payload: {
          ...state?.course,
          enrollments: state?.course?.enrollments
            ? addUniqueValueToArray(state.course.enrollments, user.uid)
            : [user.uid],
        },
      });
    } catch (e) {
    } finally {
      globalDispatch(hideLoader());
    }
  };

  const setActiveIndex = index => {
    dispatch({ type: "UPDATE_ACTIVE_INDEX", payload: index });
  }

  const SyllabusSection = () => {

    return (
      <LazyLoader loaded={state.syllabusLoaded} loading={state.syllabusLoading} condition={state.syllabus}>
        <TableOfContent content={state.syllabus?.syllabus}/>
      </LazyLoader>
    );
  };

  const DescriptionSection = ({ course }) => {
    return (
      <>
        {course.description && (
          <ContentHeader title={'Course Description'}>
            <WordWrapper text={course.description} />
          </ContentHeader>
        )}
        {(course.learning && course.learning?.length >
          0)
          && (
            <ContentHeader title={'Skills you will gain'}>
              <CoursePillHolder skills={course.skills}></CoursePillHolder>
            </ContentHeader>
          )}
        {course.learning &&
          course.learning?.length >
          0 && (
            <ContentHeader title={'What you will learn'}>
              <CoursePillHolder
                skills={course.learning}
                supporticons></CoursePillHolder>
            </ContentHeader>
          )}
        <ContentHeader title={'About the Author'}>
          <LazyLoader loaded={state.authorLoaded} loading={state.authorLoading} condition={state.author}>
            <View style={{ gap: layout.gap.NEIGHBORS }}>
              <AuthorHeader author={state.author} />
              <WordWrapper text={state?.author?.bio} /></View>
          </LazyLoader>
        </ContentHeader>
      </>
    );
  };

  const ButtonSection = () => {
    return (
      <View style={{ paddingHorizontal: layout.padding.HORIZONTAL, marginBottom: layout.margin.NEIGHBORS }}>
        {state.course?.enrollments.includes(user.uid) && (
          <Button
            onPress={() => viewProgress()}>
            View Progress
          </Button>
        )}
        {!state.course?.enrollments.includes(user.uid) && (state.syllabus && state?.syllabus?.syllabus?.length>0) && (
          <Button
            onPress={() => enrollIntoCourse()}>Enroll</Button>
        )}
      </View>
    )
  }

  // const RatingSection = () => {
  //   return (
  //     <View style={{gap: 10, marginTop: 15}}>
  //       {course?.ratings.map((review, index) => (
  //         <View key={index}>
  //           <Text
  //             style={{
  //               fontFamily: typography.fontFamilies.PRIMARY,
  //               fontWeight: 'bold',
  //               fontSize: 18,
  //               color: '#1f1f1f',
  //             }}>
  //             {review?.name}
  //           </Text>
  //           <StarRating
  //             containerStyle={{justifyContent: 'flex-start', gap: 3}}
  //             disabled={false}
  //             maxStars={5}
  //             fullStarColor={colors.rating.FULL_STAR}
  //             halfStarColor={colors.rating.HALF_STAR}
  //             emptyStarColor={colors.rating.EMPTY_STAR}
  //             rating={review.rating}
  //             starSize={10}
  //           />
  //           <Text
  //             style={{
  //               fontFamily: typography.fontFamilies.PRIMARY,
  //               fontWeight: '400',
  //               fontSize: 16,
  //               color: '#1f1f1f',
  //             }}>
  //             {review?.comment}
  //           </Text>
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };

  return (
    <Container useScrollView={false} safeAreaEdges={["bottom", "right", "left"]}>
      <LazyLoader loaded={state.courseLoaded} loading={state.courseLoading} condition={state.course}>
        <AnimatedHeader backgroundImage={state.course?.coverArt} navbarAction={() => (<AnimatedNavHeader onBackPress={() => navigation.goBack()} />)}>
          <View style={{ marginTop: layout.margin.NEIGHBORS, paddingHorizontal: layout.padding.HORIZONTAL, gap: layout.gap.INTERNAL }}>
            <Text style={styles.aboutText}>About the Course</Text>
            <Text style={styles.courseTitle}>{state.course?.title}</Text>
            <TabBar
              tabs={tabs}
              activeIndex={state.activeIndex}
              setActiveIndex={setActiveIndex}></TabBar>
            <View style={{ marginTop: layout.margin.NEIGHBORS, gap: layout.gap.NEIGHBORS }}>
              {state.activeIndex == 0 && <DescriptionSection course={state.course} />}
              {state.activeIndex == 1 && <SyllabusSection />}
              {/* {activeIndex == 2 && <RatingSection course={course} />} */}
            </View>
          </View>
        </AnimatedHeader>
        <ButtonSection />
      </LazyLoader>
    </Container>
  )
};

const getScaledStyles = fontScale => {
  return StyleSheet.create({
    headerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
    },
    aboutText: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM / fontScale,
      color: colors.font.PRIMARY
    },
    courseTitle: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_LARGE / fontScale,
      color: colors.font.PRIMARY,
    },
    contentSectionTitle: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: '700',
      fontSize: 20,
      color: colors.font.PRIMARY,
    },
    ctaButton: {

    },
    ctaContianer: {
      backgroundColor: "yellow",
      position: 'absolute',
      bottom: 25,
      left: 0,
      right: 0,
      marginLeft: 16,
      marginRight: 16,
      zIndex: 888,
      flex: 1

    }
  });
}

export default Course;