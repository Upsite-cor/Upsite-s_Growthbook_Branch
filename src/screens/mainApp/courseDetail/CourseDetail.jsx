import React, {useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import CourseHeader from '../../../components/courseHeader/CourseHeader.component';
import CourseTab from '../../../components/courseTab/CourseTab.component';
import Container from '../../../components/layout/container/Container.component';
import WordWrapper from '../../../components/wordWrapper/WordWrapper.component';
import {SkillPillHolder} from '../../../components/skillPill/SkillPill.component';
import CourseDetailStylesheet from './CourseDetail.style';
import AuthorHeader from '../../../components/authorHeader/AuthorHeader.component';
import Button from '../../../components/button/Button.component';
import TableOfContent from '../../../components/tableOfContent/TableOfContent.component';
import {Dimensions} from 'react-native';

const Header_Max_Height = 250;
const Header_Min_Height = 155;

const CourseDetail = ({course}) => {
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
        <ContentSection title={'Course Description'}>
          <WordWrapper text={course.description} />
        </ContentSection>
        <ContentSection title={'Skills you will gain'}>
          <SkillPillHolder skills={course.skills}></SkillPillHolder>
        </ContentSection>
        <ContentSection title={'What you will learn'}>
          <SkillPillHolder
            skills={course.learning}
            supporticons></SkillPillHolder>
        </ContentSection>
        <ContentSection title={'About the Author'}>
          <AuthorHeader author={course.author} />
          <WordWrapper text={course.author.bio} />
        </ContentSection>
      </>
    );
  };

  const tabs = ['Description', 'Syllabus', 'Reviews'];
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  const colorOpacity = scrollOffsetY.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animateHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });
  const borderRadius = scrollOffsetY.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  });

  let screenHeight = Dimensions.get('screen').height;

  return (
    <Container
      edges={['bottom']}
      useDefaultSafeArea={false}
      isScrollable={false}>
      <Animated.View
        style={{
          height: animateHeaderHeight,
        }}>
        <CourseHeader imageUrl={course.coverArt} colorOpacity={colorOpacity} />
      </Animated.View>

      <Animated.ScrollView
        bounces={false}
        style={[
          CourseDetailStylesheet.scrollingContainer,
          {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          },
        ]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {useNativeDriver: false},
        )}>
        <Text style={CourseDetailStylesheet.aboutText}>About the Course</Text>
        <Text style={CourseDetailStylesheet.courseTitle}>{course.title}</Text>
        <View style={CourseDetailStylesheet.tabSeperator}>
          <CourseTab tabs={tabs}></CourseTab>
        </View>
        {/* <DescriptionSection course={course} /> */}
        {<SyllabusSection course={course} />}
        {/* <View style={{height: 125}}></View> */}
      </Animated.ScrollView>

      {/* <View style={CourseDetailStylesheet.ctaContianer}>
        <Button style={CourseDetailStylesheet.ctaButton} title={'Enroll'} />
      </View> */}
    </Container>
  );
};

export default CourseDetail;
