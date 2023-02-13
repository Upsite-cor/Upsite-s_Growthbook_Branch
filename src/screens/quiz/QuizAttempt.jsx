import React, { useEffect, useState } from "react";
import { Text, View ,TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import { useDispatch } from "react-redux";
import Button from "../../components/button/Button.component";
import Container from "../../components/layout/container/Container.component";
import BackHeader from "../../components/navigation/organisms/BackHeader";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { colors, typography } from "../../styles/theme.style";
import firestore from '@react-native-firebase/firestore';
import { compareArrays, compareValues, generateId, secondsToText } from "../../utils";
const QuizAttempt = ({ route, navigation }) => {
    const { payload } = route.params;
    const dispatch = useDispatch();
    const [remainingTime, setRemainingTime] = useState(payload?.quiz?.time * 1000);
    const [quiz, setQuiz] = useState(payload?.quiz);
    if (payload?.quiz?.questions?.length == 0) {
        navigation.goBack();
        return;
    }

    const [currentQuestion, setQuestion] = useState(payload?.quiz?.questions[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [attempt, setAttempt] =  useState(payload?.attempt);

    const currentAnswer = attempt.answers.find(x=> x.questionId== currentQuestion?.id);
    const onSubmit = async () => {
        dispatch(showLoader());
        await evaluateAttempt(attempt, quiz);
        dispatch(hideLoader());
        navigation.goBack();
    }
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
    const updateAttempt = async () =>{
        await firestore()
        .collection('quizAttempts')
        .doc(attempt?.id)
        .update(attempt);
    }
    const onNext = async () => {
        dispatch(showLoader());
        setCurrentIndex(curr=> curr+1);
        setQuestion(quiz?.questions[currentIndex+1]);
        await updateAttempt();
      
        dispatch(hideLoader());
    }
    const onPrevious = async ()=>{
        dispatch(showLoader());
        setCurrentIndex(curr=> curr-1);
        setQuestion(quiz?.questions[currentIndex-1]);
        await updateAttempt();
        dispatch(hideLoader());
    }
    useEffect(() => {
        let timerId = setTimeout(() => {
            setRemainingTime(prev => prev - 1000);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [remainingTime]);

    useEffect(() => {
        if (remainingTime <= 0) {
            onSubmit();
        }
    }, [remainingTime]);

    return (
        <Container>
            <BackHeader onPress={() => { navigation.goBack() }} text={secondsToText(remainingTime / 1000)} />
            {currentQuestion && <View>
                <View style={{
                    marginVertical: 10
                }}>
                    <Text style={{
                        fontFamily: typography.fontFamilies.PRIMARY,
                        color: colors.font.PRIMARY,
                        fontWeight: 700,
                        fontSize: 24
                    }}>{currentQuestion?.statement}</Text>
                </View>
                {
                    currentQuestion?.type=="multiple" && (
                        <View style={styles.container}>
                        {currentQuestion?.answer?.options.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={
                                currentAnswer?.answer?.givenAnswers?.includes(option)
                                ? [styles.option, styles.selectedOption]
                                : styles.option
                            }
                            onPress={() => {
                                const updatedAttempt = {
                                    ...attempt,
                                    answers: attempt.answers.map(answer => {
                                      if (answer.questionId === currentQuestion?.id) {
                                        return { ...answer, answer: { ...answer.answer, givenAnswers: [option] } };
                                      }
                                      return answer;
                                    })
                                  };
                                  setAttempt(updatedAttempt);
                            }}
                          >
                            <Text style={
                               currentAnswer?.answer?.givenAnswers?.includes(option)
                                ? [styles.optionText, styles.selectedOptionText]
                                : styles.optionText
                            }>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )
                }
                {
                    currentQuestion?.type=="single" && (
                        <View style={{marginVertical:10}}>
                        <TextInput
                          style={{ height: 250, borderColor: 'lightgrey',padding:5, borderWidth: 1 }}
                          onChangeText={(text) => {
                            const updatedAttempt = {
                                ...attempt,
                                answers: attempt.answers.map(answer => {
                                  if (answer.questionId === currentQuestion?.id) {
                                    return { ...answer, answer: { ...answer.answer, givenAnswer: text } };
                                  }
                                  return answer;
                                })
                              };
                              setAttempt(updatedAttempt);
                        }}
                          value={currentAnswer?.answer?.givenAnswer}
                          multiline={true}
                        />
                      </View>
                    )
                }
            </View>
            }
            <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"flex-end"}}>
                {currentIndex!=0 &&
                <Button title={"Previous"} onPress={onPrevious}></Button>}
                {currentIndex!=quiz?.questions?.length-1 &&
                <Button title={"Next"} onPress={onNext}></Button>}
                {currentIndex==quiz?.questions?.length-1 &&
                 <Button title={"Submit"} onPress={()=>{
                    onSubmit();
                 }}></Button>}
            </View>
        </Container>
    )
};


const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 15,
      marginVertical: 10,
    },
    option: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      width:"100%",
      borderWidth: 1,
      borderColor: 'gray'
    },
    selectedOption: {
      backgroundColor: colors.general.BRAND,

    },
    selectedOptionText:{
        color: colors.general.WHITE
    },
    optionText: {
      fontSize: 16
    }
  });

export default QuizAttempt;