import { AppState, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import BackHeader from "../../components/headers/BackHeader.component";
import Container from "../../components/layout/Container2.component";
import { secondsToText } from "../../utils";
import LazyLoader from '../../components/layout/LazyLoader.component';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/features/loader/loaderSlice';
import { colors, layout, typography } from '../../styles/theme.style';
import Button from '../../components/buttons/Button.component';
import { QuizService } from '../../services/courses/Quiz.service';
import Alert from '../../utils/alert';

const initalState = { loading: true, loaded: false, currentQuestion: null, currentIndex: 0, attempt: null };
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INITAL_DATA':
      return { ...state, loading: false, loaded: true, currentQuestion: action.payload?.currentQuestion, attempt: action.payload?.attempt };
    case 'UPDATE_ATTEMPT':
      return { ...state, attempt: action.payload };
    case 'SHOW_LOADER':
      return {...state, loading:true};
    case 'HIDE_LOADER':
      return {...state, loading:false};
    case 'CHANGE_QUESTION':
      return {...state, currentQuestion: action.payload?.currentQuestion, currentIndex:action.payload?.currentIndex};
    default:
      return state;
  }
}
const QuizAttempt = ({ route, navigation }) => {
  const { payload } = route.params;
  const [timeLeft, setTimeLeft] = useState(payload?.quiz?.time * 1000);
  const [finished, setFinished] = useState(false);
  const { fontScale } = useWindowDimensions();
  const globalDispatch = useDispatch();
  const styles = getScaledStyles(fontScale);
  console.log(styles.optionText);
  const [state, dispatch] = useReducer(reducer, initalState);

  if (payload?.quiz?.questions?.length == 0) {
    navigation.goBack();
    return;
  }

  if (!state.loaded) {
    dispatch({ type: "SET_INITAL_DATA", payload: { currentQuestion: payload?.quiz?.questions[0], attempt: payload?.attempt } });
  }
  var currentAnswer = null;
  if (state.loaded) {
    currentAnswer = state.attempt?.answers?.find(x => x.questionId == state?.currentQuestion?.id);
  }

  const onTextInputChanged = (text)=>{
    const updatedAttempt = {
      ...state.attempt,
      answers: state.attempt.answers.map(answer => {
        if (answer.questionId === state.currentQuestion?.id) {
          return { ...answer, answer: { ...answer.answer, givenAnswer: text } };
        }
        return answer;
      })
    };
    dispatch({ type: "UPDATE_ATTEMPT", payload: updatedAttempt });
  }
  const optionsPressed = (option) => {
    const updatedAttempt = {
      ...state.attempt,
      answers: state.attempt.answers.map(answer => {
        if (answer.questionId === state.currentQuestion?.id) {
          return { ...answer, answer: { ...answer.answer, givenAnswers: [option] } };
        }
        return answer;
      })
    };
    dispatch({ type: "UPDATE_ATTEMPT", payload: updatedAttempt });
  }

  const onSubmit = async () => {
    try {
      globalDispatch(showLoader());
      await QuizService.evaluateAttempt(state.attempt, payload?.quiz);
    } catch (e) {

    } finally {
      globalDispatch(hideLoader());
      navigation.goBack();
    }
  };
  const onNext = async () => {
    try{
      await QuizService.updateAttempt(state.attempt);
      dispatch({type:"SHOW_LOADER"});
      dispatch({type:"CHANGE_QUESTION", payload:{currentIndex:state.currentIndex + 1 ,currentQuestion:payload?.quiz?.questions[state.currentIndex + 1]}});
    }catch(error){
      Alert.notify("An error occured", error.message);
    }finally{
      dispatch({type:"HIDE_LOADER"});
    }
  }
  const onPrevious = async () => {
    try{
      await QuizService.updateAttempt(state.attempt);
      dispatch({type:"SHOW_LOADER"});
      dispatch({type:"CHANGE_QUESTION", payload:{currentIndex:state.currentIndex - 1 ,currentQuestion:payload?.quiz?.questions[state.currentIndex - 1]}});
    }catch(error){
      Alert.notify("An error occured", error.message);
    }finally{
      dispatch({type:"HIDE_LOADER"});
    }
  }
  useEffect(() => {
    let intervalId;
    const subscription = AppState.addEventListener("change", (app) => {
      if (app == "active") {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - payload?.attempt?.startTime;
        const remainingTime = (payload?.quiz?.time * 1000) - elapsedTime;
        if (remainingTime <= 0) {
          intervalId ? clearInterval(intervalId) : {};
          setTimeLeft(0);
          // onSubmit();
        } else {
          setTimeLeft(remainingTime);
        }
      }
    });

    if (!intervalId) {
      intervalId = setInterval(() => {
        setTimeLeft(prev => prev - 1000);
      }, 1000);
    }
    if (finished && intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      intervalId ? clearInterval(intervalId) : {};
      subscription.remove();
    }
  }, [finished])

  useEffect(() => {
    if (!finished) {
      if (timeLeft <= 0) {
        setFinished(true)
        onSubmit();
      }
    }
  }, [finished, timeLeft]);


  return (
    <Container>
      <BackHeader onPress={() => { navigation.goBack() }} text={timeLeft <= 0 ? "Finished" : secondsToText(timeLeft / 1000)} />
      <View style={{ flex: 1, paddingHorizontal: layout.padding.HORIZONTAL, gap: layout.gap.NEIGHBORS, paddingVertical: layout.padding.VERTICAL }}>
        <View style={{ flex: 1,paddingVertical: layout.padding.VERTICAL  }}>
          <LazyLoader condition={state.currentQuestion} loaded={state.loaded} loading={state.loading}>
            <Text style={styles.questionStatement}>{state.currentQuestion?.statement}</Text>
            {state.currentQuestion?.type == "multiple" && (
              <View style={styles.multipleChoiceOptionsContainer}>
                {state.currentQuestion?.answer?.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={
                      currentAnswer?.answer?.givenAnswers?.includes(option)
                        ? [styles.option, styles.selectedOption]
                        : styles.option
                    }
                    onPress={() => {
                      optionsPressed(option);
                    }}>
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
          state.currentQuestion?.type == "single" && (
            <View style={{ paddingVertical: layout.padding.VERTICAL, gap:layout.gap.NEIGHBORS }}>
              <TextInput
                color={colors.font.PRIMARY} placeholderTextColor={colors.font.PLACEHOLDER}
                style={styles.singleQuestionTextInput}
                onChangeText={onTextInputChanged}
                value={currentAnswer?.answer?.givenAnswer}
                multiline={true}
              />
            </View>
          )
        }
          </LazyLoader>
        </View>
        <View style={{flex:0, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: layout.gap.NEIGHBORS }}>
            {state.currentIndex != 0 &&
              <Button style={{ flex: 1 }} onPress={onPrevious}> Previous</Button>
            }
            {state.currentIndex != payload?.quiz?.questions?.length - 1 &&
              <Button style={{ flex: 1 }} onPress={onNext}>Next</Button>}
            {state.currentIndex == payload?.quiz?.questions?.length - 1 &&
              <Button  style={{ flex: 1 }}  onPress={onSubmit}>Submit</Button>}
          </View>
      </View>
    </Container>
  );
};

const getScaledStyles = fontScale => {
  return StyleSheet.create({
    questionStatement: {
      fontFamily: typography.fontFamilies.PRIMARY,
      color: colors.font.PRIMARY,
      fontWeight: typography.fontWights.BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM / fontScale
    },
    singleQuestionTextInput:{ 
      height: 250,
      borderColor: 'lightgrey',
      padding: 5,
      borderWidth: 1,
      borderRadius: layout.borderRadius.INPUT_FIELD
    },
    multipleChoiceOptionsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: layout.gap.NEIGHBORS,
      paddingVertical: layout.padding.VERTICAL
    },
    option: {
      justifyContent: "center",
      paddingHorizontal: layout.padding.INPUT_FIELDS,
      backgroundColor: 'white',
      minHeight: 50 / fontScale,
      borderRadius: layout.borderRadius.INPUT_FIELD,
      width: "100%",
      borderWidth: 1,
      borderColor: colors.general.BACKGROUND,
    },
    selectedOption: {
      backgroundColor: colors.general.BRAND,
      borderColor: colors.general.BRAND,
    },
    selectedOptionText: {
      color: colors.font.SECONDARY,
    },
    optionText: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.NORMAL,
      fontSize: typography.fontSizes.FONT_SIZE_SMALL / fontScale,
      color: colors.font.PRIMARY,
    }
  })
};

export default QuizAttempt;
