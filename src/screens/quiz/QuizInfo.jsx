import {Text, View, Image, StyleSheet} from 'react-native';
import Container from '../../components/layout/container/Container.component';
import BackHeader from '../../components/navigation/organisms/BackHeader';
import quizImage from '../../assets/images/quizImage.png';
import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../features/loader/loaderSlice';
import {colors, typography} from '../../styles/theme.style';
import Button from '../../components/button/Button.component';
import {
  secondsToText,
  generateId,
  compareValues,
  compareArrays,
} from '../../utils';
import {UserContext} from '../../navigators/Application';
import {BaseNavigationContainer} from '@react-navigation/native';

const QuizInfo = ({route, navigation}) => {
  const [quiz, setQuiz] = useState();
  const [validAttempt, setValidAttempt] = useState(null);
  const [count, setCount] = useState();
  const [intervalId, setIntervalId] = useState(null);
  const [completedAttempts, setCompletedAttempts] = useState([]);

  const user = useContext(UserContext);

  const dispatch = useDispatch();
  const {payload} = route.params;

  const fetchQuiz = async () => {
    const quiz = await firestore()
      .collection('quizzes')
      .doc(payload?.item?.contentId)
      .get();
    return {...quiz.data(), id: quiz.id};
  };
  const getBestResult = () => {
    if (completedAttempts?.length == 0) {
      return '-';
    }
    const totalMarks = quiz?.totalMarks;
    return (
      completedAttempts
        .map(item => item?.obtainedMarks / totalMarks)
        .sort((a, b) => b - a)[0] *
        100 +
      '%'
    );
  };
  const getPassedDate = () => {
    if (completedAttempts?.length == 0) {
      return '-';
    }
    completedAttempts.push({
      obtainedMarks: 20,
      startTime: new Date().getTime(),
    });
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
      var date = new Date(0);
      date.setUTCMilliseconds(passingScore?.date);
      return date?.toDateString();
    }
    return '-';
  };
  const evaluateAttempt = async (attempt, quiz) => {
    attempt.status = 'completed';
    if (attempt && attempt.answers && attempt.answers.length !== 0) {
      attempt.answers = quiz?.questions?.map(question => {
        var answer = attempt?.answers?.find(x => x.questionId == question?.id);
        if (!answer) {
          return {
            id: generateId(),
            questionId: question.id,
            obtainedMark: 0,
            answer: {
              givenAnswer: '',
              givenAnswers: [],
            },
          };
        }

        if (question?.type == 'single') {
          return {
            ...answer,
            obtainedMark: compareValues(
              answer?.answer?.givenAnswer,
              question?.answer?.value,
              question?.answer?.operation,
            )
              ? question?.marks
              : 0,
          };
        } else {
          return {
            ...answer,
            obtainedMark: compareArrays(
              answer?.answer?.givenAnswers,
              question?.answer?.correctOptions,
            )
              ? question?.marks
              : 0,
          };
        }
      });
      attempt.obtainedMarks = attempt?.answers?.reduce(
        (acc, current) => acc + current?.obtainedMark,
        0,
      );
    } else {
      attempt.answers = quiz.questions.map(question => ({
        id: generateId(),
        questionId: question.id,
        obtainedMark: 0,
        answer: {
          givenAnswer: '',
          givenAnswers: [],
        },
      }));
      attempt.obtainedMarks = 0;
    }
    await firestore()
      .collection('quizAttempts')
      .doc(attempt?.id)
      .update({
        ...attempt,
      });
    return attempt;
  };
  const fetchAttempts = async quiz => {
    const completedAttempts = [];
    const attemptsToRevoke = [];
    var validAttempt = null;

    const attemptsRaw = await firestore()
      .collection('quizAttempts')
      .where('courseId', '==', quiz?.courseId)
      .where('userId', '==', user.uid)
      .get();
    attemptsRaw.docs.forEach(qualifyingAttempts => {
      var attempt = {...qualifyingAttempts.data(), id: qualifyingAttempts.id};
      if (attempt?.status && attempt?.status == 'completed') {
        completedAttempts.push(attempt);
      } else {
        var elapsedTime = new Date().getTime() - attempt?.startTime;
        if (elapsedTime / 1000 < quiz?.time) {
          if (!validAttempt) {
            validAttempt = attempt;
          } else {
            attemptsToRevoke.push(attempt);
          }
        } else {
          attemptsToRevoke.push(attempt);
        }
      }
    });

    for (var attempt of attemptsToRevoke) {
      attempt = await evaluateAttempt(attempt, quiz);
      completedAttempts.push(attempt);
    }
    return [validAttempt, completedAttempts];
  };
  const fetchPayload = async () => {
    dispatch(showLoader());
    try {
      const fetchedQuiz = await fetchQuiz();
      const [validAttempt, completedAttempts] = await fetchAttempts(
        fetchedQuiz,
      );
      setQuiz(fetchedQuiz);
      setValidAttempt(validAttempt);
      console.log(new Date().getTime());
      setCompletedAttempts(completedAttempts);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoader());
    }
  };
  const startQuiz = async () => {
    stopCount();
    navigation.navigate('quizAttempt');
  };
  const startReducer = ()=>{
    const id = setInterval(() => {
      setCount(prev=> prev-1);
    }, 1000);
    setIntervalId(id);
  }

  const stopCount = () =>{
    clearInterval(intervalId);
    setIntervalId(null);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchPayload();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <Container isScrollable={false}>
      <View style={{flex: 1}}>
        <BackHeader onPress={() => navigation.goBack()} text={'Quiz'} />
        <View style={{backgroundColor: '#71c1944d'}}>
          <Image source={quizImage} />
        </View>
        {quiz && (
          <>
            {count && <Text>{count}</Text>}
            <View style={{marginHorizontal: 16}}>
              <Text
                style={{
                  fontFamily: typography.fontFamilies.PRIMARY,
                  fontWeight: 700,
                  fontSize: 24,
                  marginVertical: 15,
                  color: colors.font.PRIMARY,
                }}>
                {quiz?.title}
              </Text>
            </View>

            <View
              style={{
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,

                width: '100%',
                // marginVertical:,
              }}
            />
            <View style={{paddingVertical: 5, marginHorizontal: 16}}>
              <Text style={styles.timeToCompleteLabel}>Time to Complete</Text>
              <Text style={styles.timeToComplete}>
                {secondsToText(quiz?.time)}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
                width: '100%',
              }}
            />
            <View style={{paddingVertical: 5, marginHorizontal: 16}}>
              <View style={styles.subInformationContainer}>
                <Text>Number of Questions</Text>
                <Text>{quiz?.questions?.length}</Text>
              </View>
              <View style={styles.subInformationContainer}>
                <Text>Passing Percentage</Text>
                <Text>{quiz?.passingPercentage}%</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
                width: '100%',
              }}
            />
            <View style={{paddingVertical: 5, marginHorizontal: 16}}>
              <View style={styles.subInformationContainer}>
                <Text>Best Result</Text>
                <Text>{getBestResult()}</Text>
              </View>
              <View style={styles.subInformationContainer}>
                <Text>Passing Date</Text>
                <Text>{getPassedDate()}</Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                width: '100%',
                bottom: 5,
                position: 'absolute',
              }}>
              <Button title="Start" onPress={startQuiz}></Button>
              
            </View>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  subInformationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  timeToCompleteLabel: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontSize: 20,
    color: colors.font.BRAND,
  },
  timeToComplete: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontSize: 24,
    color: colors.font.PRIMARY,
  },
});

export default QuizInfo;
