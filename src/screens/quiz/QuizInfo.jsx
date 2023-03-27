import React, { useContext, useEffect, useReducer } from "react";
import { Image, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import BackHeader from "../../components/headers/BackHeader.component";
import Container from "../../components/layout/Container2.component";
import { colors, layout, typography } from "../../styles/theme.style";
import quizImage from '../../assets/images/quizImage.png';
import LazyLoader from "../../components/layout/LazyLoader.component";
import { QuizService } from "../../services/courses/Quiz.service";
import { UserContext } from "../../navigators/Application";
import { secondsToText, generateId, compareValues, compareArrays } from '../../utils';
import { isContentCompleted, markContentCompleted } from "../../services/courses/progressService";
import CourseService from "../../services/courses/Course.service";
import LineBreak from "../../components/layout/LineBreak.component";
import Button from "../../components/buttons/Button.component";

const initialState = { quiz: null, completedAttempts: [], isPassed: false, loading: true, loaded: false, error: false }
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: true, loading: false, loaded: true };
    case 'SET_PASSED':
      return { ...state, isPassed: true };
    case 'SET_DATA':
      return { ...state, error: false, loading: false, loaded: true, quiz: action.payload?.quiz, completedAttempts: action.payload?.completedAttempts };
    default:
      return state;
  }
}
const QuizInfo = ({ route, navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const user = useContext(UserContext);
  const { payload } = route.params;

  const fetchProgress = async () => {
    return await CourseService.getProgress(payload.courseId, user.uid);
  };
  const checkIfPassed = async (completedAttempts, quiz) => {
    if (completedAttempts?.length == 0) {
      return;
    }
    const totalMarks = quiz?.totalMarks;
    passingScore = completedAttempts
      .map(item => {
        return {
          date: item.startTime,
          percentage: item?.obtainedMarks / totalMarks,
        };
      })
      .sort((a, b) => b.percentage - a.percentage)[0];
    if (
      passingScore &&
      passingScore?.percentage * 100 >= quiz?.passingPercentage
    ) {
      const progress = await fetchProgress();
      if (!isContentCompleted(payload?.item?.contentId, progress)) {
        const updatedProgress = markContentCompleted(payload?.item?.contentId, progress);
        await CourseService.updateProgress(updatedProgress);
      }
    }
  };
  const fetchPayload = async () => {
    if (payload?.item?.isCompleted && !state.isPassed) {
      dispatch({ type: "SET_PASSED" });
    }
    try {
      if (payload?.item?.contentId) {
        const fetchedQuiz = await QuizService.getQuiz(payload?.item?.contentId);
        if (fetchedQuiz != null) {
          const completedAttempts = await fetchAttempts(fetchedQuiz);
          if (!state.isPassed && !payload?.item?.isCompleted) {
            await checkIfPassed(completedAttempts, fetchedQuiz);
          }
          dispatch({ type: "SET_DATA", payload: { quiz: fetchedQuiz, completedAttempts: completedAttempts } })
        } else {
          throw new Error("Error occured fecthing the quiz.");
        }
      } else {
        throw new Error("No quiz id provided with the payload.");
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: "SET_ERROR" });
    }
  };
  const fetchAttempts = async quiz => {
    const completedAttempts = [];
    const attemptsToRevoke = [];

    const attempts = await QuizService.fetchAttempts(quiz?.courseId, user.uid);
    attempts.forEach(attempt => {
      if (attempt?.status && attempt?.status == 'completed') {
        completedAttempts.push(attempt);
      } else {
        attemptsToRevoke.push(attempt);
      }
    });

    for (var attempt of attemptsToRevoke) {
      attempt = await QuizService.evaluateAttempt(attempt, quiz);
      completedAttempts.push(attempt);
    }
    return completedAttempts;
  };
  const getPassedDate = () => {
    if (state.completedAttempts?.length == 0) {
      return '-';
    }
    const totalMarks = state.quiz?.totalMarks;
    passingScore = state.completedAttempts
      .map(item => {
        return {
          date: item.startTime,
          percentage: item?.obtainedMarks / totalMarks,
        };
      })
      .sort((a, b) => b.percentage - a.percentage)[0];
    if (
      passingScore &&
      passingScore?.percentage * 100 >= state.quiz?.passingPercentage
    ) {
      var date = new Date(0);
      date.setUTCMilliseconds(passingScore?.date);
      return date?.toDateString();
    }
    return '-';
  };
  const startQuiz = async () => {
    var attempt = {
      courseId: payload?.courseId,
      obtainedMarks: 0,
      quizId: state.quiz?.id,
      startTime: new Date().getTime(),
      status: "pending",
      userId: user.uid,
      answers: []
    };
    attempt.answers = state.quiz?.questions?.map(question => {
      return {
        id: generateId(),
        questionId: question.id,
        obtainedMark: 0,
        answer: {
          givenAnswer: '',
          givenAnswers: [],
        },
      };
    });
    const attemptRaw = await QuizService.addQuizAttempt(attempt);
    navigation.navigate('quizAttempt', { payload: { attempt: { ...attempt, id: attemptRaw.id }, quiz: state.quiz } });
  };
  const getBestResult = () => {
    if (state.completedAttempts?.length == 0) {
      return '-';
    }
    const totalMarks = state.quiz?.totalMarks;
    return (
      state.completedAttempts
        .map(item => item?.obtainedMarks / totalMarks)
        .sort((a, b) => b - a)[0] *
      100 +
      '%'
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchPayload();
    });
    return unsubscribe;
  }, [navigation]);
  
  return (
    <Container>
      <View style={{ flex: 1, gap: layout.gap.NEIGHBORS }}>
        <BackHeader onPress={() => navigation.goBack()} text={'Quiz'} />
        <LazyLoader loading={state.loading} loaded={state.loaded} condition={!state.error}>
          <View style={{ flex: 1, gap: layout.gap.NEIGHBORS, paddingHorizontal: layout.padding.HORIZONTAL }}>
            <View style={styles.imagebackground}>
              <Image source={quizImage} />
            </View>
            <Text
              style={styles.quizTitle}>
              {state?.quiz?.title}
            </Text>
            <LineBreak type="continuous" />
            <View>
              <Text style={styles.timeToCompleteLabel}>Time to Complete</Text>
              <Text style={styles.timeToComplete}>
                {secondsToText(state.quiz?.time)}
              </Text>
            </View>
            <LineBreak type="continuous" />
            <View style={styles.subInformationContainer}>
              <Text style={styles.text}>Number of Questions</Text>
              <Text style={styles.text}>{state.quiz?.questions?.length}</Text>
            </View>
            <View style={styles.subInformationContainer}>
              <Text style={styles.text}>Passing Percentage</Text>
              <Text style={styles.text}>{state.quiz?.passingPercentage}%</Text>
            </View>
            <LineBreak type="continuous" />
            <View style={styles.subInformationContainer}>
              <Text style={styles.text}>Best Result</Text>
              <Text style={styles.text}>{getBestResult()}</Text>
            </View>
            <View style={styles.subInformationContainer}>
              <Text style={styles.text}>Passing Date</Text>
              <Text style={styles.text}>{getPassedDate()}</Text>
            </View>
          </View>
          <View style={{ marginBottom: layout.padding.VERTICAL, paddingHorizontal: layout.padding.HORIZONTAL  }}>
            <Button onPress={startQuiz}>Attempt</Button>
          </View>
        </LazyLoader>
      </View>
    </Container>
  )
};

const getScaledStyles = fontScale => {
  return StyleSheet.create({
    quizTitle: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM / fontScale,
      color: colors.font.PRIMARY,
    },
    imagebackground: {
      flexDirection: "row",
      backgroundColor: colors.general.SECONDARY_BACKGROUND,
      marginHorizontal: layout.padding.HORIZONTAL * -1,
      justifyContent: "center"
    },
    subInformationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeToCompleteLabel: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM / fontScale,
      color: colors.font.BRAND,
      fontWeight: typography.fontWights.NORMAL,
    },
    timeToComplete: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM / fontScale,
      color: colors.font.PRIMARY,
      fontWeight: typography.fontWights.NORMAL,
    },
    text:{
      fontFamily: typography.fontFamilies.PRIMARY,
      fontSize: typography.fontSizes.FONT_SIZE_CAPTION / fontScale,
      color: colors.font.PRIMARY,
      fontWeight: typography.fontWights.NORMAL,
    }
  })
}

export default QuizInfo;
