import React, { useState } from "react";
import { Text, View } from "react-native";
import AnimatedHeader from "../../components/animations/AnimatedHeader.component";
import Container from "../../components/layout/container/Container2.component";

const Course = ({route, navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {payload} = route.params;
  const [course, setCourse] = useState(payload);
  const tabs = ['Description', 'Syllabus'];

  return (
    <Container useScrollView={false} safeAreaEdges={["bottom", "right", "left"]}>
      <AnimatedHeader backgroundImage={course?.coverArt} navbarAction={navBarActions()}>
        <View style={{ marginHorizontal: 16 }}>
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
      </AnimatedHeader>
    </Container>
  )
};

const navBarActions = () => {
  const insets = useSafeAreaInsets();
  return (
      <View style={[CourseDetailStylesheet.headerButtonContainer, { marginTop: insets.top+5 }]}>
          <HeaderButton
              onPress={() => navigation.goBack()}
              icon={'chevron-back'}
          />
          {/* <HeaderButton icon={'heart-outline'} /> */}
      </View>
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

import {StyleSheet} from 'react-native';
import { colors, typography } from "../../styles/theme.style";
import CourseTab from "../../components/courseTab/CourseTab.component";
import WordWrapper from "../../components/wordWrapper/WordWrapper.component";
import { SkillPillHolder } from "../../components/skillPill/SkillPill.component";
import AuthorHeader from "../../components/authorHeader/AuthorHeader.component";
import TableOfContent from "../../components/tableOfContent/TableOfContent.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderButton from "../../components/headerButtons/HeaderButtons.component";

const CourseDetailStylesheet = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
},
  aboutText: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '700',
    fontSize: 24,
    color: colors.font.PRIMARY,
    marginTop:15
  },
  courseTitle: {
    marginTop: 15,
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '700',
    fontSize: 32,
    color: colors.font.PRIMARY,
  },
  scrollingContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    top: -42,
  },
  tabSeperator:{
    marginTop:15
  },
  contentSectionTitle:{
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '700',
    fontSize: 20,
    color: colors.font.PRIMARY,
  },
  ctaButton:{
   
  },
  ctaContianer:{
    backgroundColor:"yellow",
    position:'absolute', 
    bottom:25,
    left:0,
    right:0,
    marginLeft:16,
    marginRight:16,
    zIndex:888,
    flex:1

  }
});

export default Course;