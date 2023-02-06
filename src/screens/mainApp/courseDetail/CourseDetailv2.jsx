import React, {useContext, useEffect, useState} from 'react';
import Container from '../../../components/layout/container/Container.component';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, typography} from '../../../styles/theme.style';
import HeaderButton from '../../../components/headerButtons/HeaderButtons.component';
import CourseDetailStylesheet from './CourseDetail.style';
import CourseTab from '../../../components/courseTab/CourseTab.component';
import WordWrapper from '../../../components/wordWrapper/WordWrapper.component';
import {SkillPillHolder} from '../../../components/skillPill/SkillPill.component';
import AuthorHeader from '../../../components/authorHeader/AuthorHeader.component';
import TableOfContent from '../../../components/tableOfContent/TableOfContent.component';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../../features/loader/loaderSlice';
import firestore from '@react-native-firebase/firestore';
import Button from '../../../components/button/Button.component';
import StarRating from '../../../components/rating/StarRating.component';
import {UserContext} from '../../../navigators/Application';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 250;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = colors.general.BRAND;
const DEFAULT_BACKGROUND_COLOR = '#303F9F';
const DEFAULT_TITLE_COLOR = 'white';

const CourseDetailv2 = ({route, navigation}) => {
  const {payload} = route.params;
  const [course, setCourse] = useState(payload);
  // const [syllabus, setSyllabus] = useState([]);
  // const [reviews, setReviews] = useState([]);
  // const [author, setAuthor] = useState({});
  var reviews = [];
  var syllabus = [];
  var reviews = [];
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const fetchRatings = async () => {
    return await firestore()
      .collection('reviews')
      .where('courseId', '==', course.id)
      .limit(5)
      .get();
  };
  const fetchSyllabus = async () => {
    return await firestore()
      .collection('syllabus')
      .where('courseId', '==', course.id)
      .limit(1)
      .get();
  };
  const fetchAuthor = async () => {
    return await firestore().collection('authors').doc(course.author?.id).get();
  };

  const fetchData = async () => {
    dispatch(showLoader());
    try {
      const ratingCollection = await fetchRatings();
      const syllabusCollection = await fetchSyllabus();
      const authorCollection = await fetchAuthor();

      let localRatings = [];
      ratingCollection.docs.forEach(document => {
        localRatings.push({...document.data(), id: document.id});
      });

      let localAuthor = authorCollection.data();
      let localSyllabus = syllabusCollection.docs[0]?.data()?.syllabus;
      const courseObj = {
        ...course,
        syllabus: localSyllabus,
        ratings: localRatings,
        author: {...course.author, ...localAuthor},
      };
      setCourse(courseObj);
      dispatch(hideLoader());
    } catch (e) {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  navBarActions = () => {
    return (
      <View style={[styles.headerButtonContainer, {marginTop: insets.top}]}>
        <HeaderButton
          onPress={() => navigation.goBack()}
          icon={'chevron-back'}
        />
        <HeaderButton icon={'heart-outline'} />
      </View>
    );
  };

  const containerStyle = null;
  const scrollViewStyle = null;
  const alwaysShowNavBar = true;
  const contentContainerStyle = null;
  const scrollViewProps = {};
  const innerContainerStyle = null;
  const scrollEventThrottle = SCROLL_EVENT_THROTTLE;
  const navbarColor = DEFAULT_NAVBAR_COLOR;
  const extraScrollHeight = DEFAULT_EXTRA_SCROLL_HEIGHT;
  const headerMaxHeight = DEFAULT_HEADER_MAX_HEIGHT;
  const headerMinHeight = insets.top + 50;
  const backgroundColor = DEFAULT_BACKGROUND_COLOR;
  const backgroundImage = course.coverArt;
  const backgroundImageScale = DEFAULT_BACKGROUND_IMAGE_SCALE;
  const title = null;
  const titleStyle = styles.headerText;
  const headerTitleStyle = null;
  const alwaysShowTitle = true;
  const renderNavBar = navBarActions;
  const tabs = ['Description', 'Syllabus', 'Reviews'];

  const scrollY = new Animated.Value(0);

  getInputRange = () => {
    return [-getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  };

  getHeaderHeight = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight(),
      ],
      extrapolate: 'clamp',
    });
  };

  getImageTranslate = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    });
  };

  getImageScale = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: 'clamp',
    });
  };

  getNavBarForegroundOpacity = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp',
    });
  };

  getHeaderMinHeight = () => {
    return headerMinHeight;
  };

  getHeaderMaxHeight = () => {
    return headerMaxHeight;
  };

  getHeaderScrollDistance = () => {
    return getHeaderMaxHeight() - getHeaderMinHeight();
  };

  getExtraScrollHeight = () => {
    return extraScrollHeight;
  };

  getImageOpacity = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  };

  getTitleTranslateY = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: 'clamp',
    });
  };

  getTitleOpacity = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, alwaysShowTitle ? 1 : 0],
      extrapolate: 'clamp',
    });
  };

  getBackgroundImageScale = () => {
    return backgroundImageScale;
  };

  getNavBarOpacity = () => {
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });
  };

  renderScrollView = () => {
    const {onScroll} = scrollViewProps;

    // remove scrollViewProps.onScroll in renderScrollViewProps so we can still get default scroll behavior
    // if a caller passes in `onScroll` prop
    const renderableScrollViewProps = Object.assign({}, scrollViewProps);
    delete renderableScrollViewProps.onScroll;
    return (
      <Animated.ScrollView
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
            listener: onScroll,
          },
        )}
        {...renderableScrollViewProps}>
        <View
          style={[{marginTop: this.getHeaderMaxHeight()}, innerContainerStyle]}>
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );
  };

  renderBackgroundImage = () => {
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.Image
        style={[
          styles.backgroundImage,
          {
            height: this.getHeaderMaxHeight(),
            opacity: imageOpacity,
            transform: [{translateY: imageTranslate}, {scale: imageScale}],
          },
        ]}
        source={{uri: backgroundImage}}
      />
    );
  };

  renderPlainBackground = () => {
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{translateY: imageTranslate}, {scale: imageScale}],
        }}
      />
    );
  };

  renderHeaderTitle = () => {
    const titleTranslateY = this.getTitleTranslateY();
    const titleOpacity = this.getTitleOpacity();

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [{translateY: titleTranslateY}],
            height: this.getHeaderHeight(),
            opacity: titleOpacity,
          },
          headerTitleStyle,
        ]}>
        {typeof title === 'string' && (
          <Text style={[styles.headerText, titleStyle]}>{title}</Text>
        )}
        {typeof title !== 'string' && title}
      </Animated.View>
    );
  };

  renderHeaderBackground = () => {
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          },
        ]}>
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  };

  renderHeaderForeground = () => {
    const navBarOpacity = this.getNavBarForegroundOpacity();

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
            opacity: navBarOpacity,
          },
        ]}>
        {renderNavBar()}
      </Animated.View>
    );
  };

  renderNavbarBackground = () => {
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity,
          },
        ]}
      />
    );
  };

  const ContentSection = ({children, title = ''}) => {
    return (
      <View style={{marginTop: 15}}>
        <Text style={CourseDetailStylesheet.contentSectionTitle}>{title}</Text>
        <View style={{marginTop: 10}}>{children}</View>
      </View>
    );
  };

  const SyllabusSection = ({course}) => {
    return (
      <>
        <ContentSection title={'Table of Content'}>
          <TableOfContent content={course.syllabus} />
        </ContentSection>
      </>
    );
  };
  const DescriptionSection = ({course}) => {
    return (
      <>
        {course.description && (
          <ContentSection title={'Course Description'}>
            <WordWrapper text={course.description} />
          </ContentSection>
        )}
        {( course.learning && course.learning?.length >
          0)
           && (
              <ContentSection title={'Skills you will gain'}>
                <SkillPillHolder skills={course.skills}></SkillPillHolder>
              </ContentSection>
            )}
        {course.learning &&
          course.learning?.length >
          0 &&(
              <ContentSection title={'What you will learn'}>
                <SkillPillHolder
                  skills={course.learning}
                  supporticons></SkillPillHolder>
              </ContentSection>
            )}
        <ContentSection title={'About the Author'}>
          <AuthorHeader author={course.author} />
          <WordWrapper text={course.author?.bio} />
        </ContentSection>
      </>
    );
  };

  const ReviewBox = () => {
    return <></>;
  };

  const RatingSection = () => {
    return (
      <View style={{gap: 10, marginTop: 15}}>
        {course?.ratings.map((review, index) => (
          <View key={index}>
            <Text
              style={{
                fontFamily: typography.fontFamilies.PRIMARY,
                fontWeight: 'bold',
                fontSize: 18,
                color: '#1f1f1f',
              }}>
              {review?.name}
            </Text>
            <StarRating
              containerStyle={{justifyContent: 'flex-start', gap: 3}}
              disabled={false}
              maxStars={5}
              fullStarColor={colors.rating.FULL_STAR}
              halfStarColor={colors.rating.HALF_STAR}
              emptyStarColor={colors.rating.EMPTY_STAR}
              rating={review.rating}
              starSize={10}
            />
            <Text
              style={{
                fontFamily: typography.fontFamilies.PRIMARY,
                fontWeight: '400',
                fontSize: 16,
                color: '#1f1f1f',
              }}>
              {review?.comment}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);

  renderContent = () => {
    return (
      <View style={{marginHorizontal: 16}}>
        <Text style={CourseDetailStylesheet.aboutText}>About the Course</Text>
        <Text style={CourseDetailStylesheet.courseTitle}>{course.title}</Text>
        <View style={CourseDetailStylesheet.tabSeperator}>
          <CourseTab
            tabs={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}></CourseTab>
        </View>

        {activeIndex == 0 && <DescriptionSection course={course} />}
        {activeIndex == 1 && <SyllabusSection course={course} />}
        {activeIndex == 2 && <RatingSection course={course} />}
      </View>
    );
  };
  const user = useContext(UserContext);
  const enrollIntoCourse = async () => {
    dispatch(showLoader());
    try {
      const newSyllabus = course?.syllabus.map(item => {
        return {
          ...item,
          child: item?.child.map(childItem => {
            return {
              ...childItem,
              isCompleted: false,
            };
          }),
          isCompleted: false,
        };
      });

      await firestore()
        .collection('progress')
        .add({courseId: course.id, userId: user.uid, syllabus: newSyllabus});
      await firestore()
        .collection('courses')
        .doc(payload.id)
        .update({
          enrollments: [...course?.enrollments, user.uid],
        });
      setCourse({...course, enrollments: [...course?.enrollments, user.uid]});
      dispatch(hideLoader());
    } catch (e) {
      console.log(e);
      dispatch(hideLoader());
    }
  };

  const viewProgress = () => {
    navigation.replace('courseNavigation', {payload: {courseId: course.id}});
  };
  return (
    <>
      <Container
        edges={['bottom']}
        useDefaultSafeArea={false}
        isScrollable={false}>
        <View style={[styles.container, containerStyle]}>
          {this.renderScrollView()}
          {this.renderNavbarBackground()}
          {this.renderHeaderBackground()}
          {this.renderHeaderTitle()}
          {this.renderHeaderForeground()}
        </View>
        {course.enrollments.includes(user.uid) && (
          <Button
            onPress={() => viewProgress()}
            title={'View Progress'}
            style={{marginHorizontal: 16}}></Button>
        )}
        {!course.enrollments.includes(user.uid) && (
          <Button
            onPress={() => enrollIntoCourse()}
            title={'Enroll'}
            style={{marginHorizontal: 16}}></Button>
        )}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  container: {
    backgroundColor: 'whitez',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULT_NAVBAR_COLOR,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: DEFAULT_TITLE_COLOR,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CourseDetailv2;
