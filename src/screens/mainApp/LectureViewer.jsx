import React, { useContext, useEffect, useReducer } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import BackHeader from '../../components/headers/BackHeader.component';
import Container from '../../components/layout/Container2.component';
import LazyLoader from '../../components/layout/LazyLoader.component';
import Pdf from 'react-native-pdf';
import CourseService from '../../services/courses/Course.service';
import { colors, layout } from '../../styles/theme.style';
import { UserContext } from '../../navigators/Application';
import { isContentCompleted, markContentCompleted } from '../../services/courses/progressService';

const initialState = { loading: true, internalLoading: true, error: false, loaded: false, lecture: null }

const reducer = (state, action) => {
  switch (action.type) {
    case "HIDE_INTERNAL_LOADER":
      return { ...state, internalLoading: false };
    case "SET_ERROR":
      return { ...state, error: true, internalLoading: false };
    case "SET_LOADED":
      return { ...state, loaded: true, loading: false, lecture: action.payload };
    default:
      return state;
  }
}

const LectureViewer = ({ route, navigation }) => {
  const { payload } = route.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useContext(UserContext);
  const { width } = useWindowDimensions();

  const fetchData = async () => {
    try {
      var lecture = null;
      if (payload?.item?.contentId) {
        lecture = await CourseService.getLectureFile(payload.item.contentId);
      }
      dispatch({ type: "SET_LOADED", payload: lecture });
    } catch (error) {
      dispatch({ type: "SET_ERROR" });
    }
  }

  const updateProgress = async () => {
    try {
      const progress = await CourseService.getProgress(payload.courseId, user.uid);
      if (!isContentCompleted(payload?.item?.contentId, progress)) {
        const updatedProgress = markContentCompleted(payload?.item?.contentId, progress);
        await CourseService.updateProgress(updatedProgress);
      }
      dispatch({ type: "HIDE_INTERNAL_LOADER" });
    } catch (error) {
      dispatch({ type: "SET_ERROR" });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <View style={{ flex: 1, gap: layout.gap.NEIGHBORS }}>
        <BackHeader onPress={() => navigation.goBack()} />
        <LazyLoader loading={state.loading} loaded={state.loaded} condition={!state.error}>
          <View style={{ flex: 1, position: "relative" }}>
            {state.internalLoading &&
              <View style={styles.internalLoader}>
                <ActivityIndicator color={colors.general.BRAND} />
              </View>}
            <Pdf
              trustAllCerts={false}
              maxScale={1}
              style={{
                flex: 1,
                width: width
              }}
              source={{
                uri: state?.lecture?.file,
                cache: false,
              }}
              onLoadComplete={updateProgress}
              onError={error => {
                dispatch({ type: "SET_ERROR" })
              }}
            />
          </View>
        </LazyLoader>
      </View>
    </Container>
  )
};

const styles = StyleSheet.create({
  internalLoader: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    zIndex: 999,
    backgroundColor: colors.general.WHITE,
    width: "100%", height: "100%"
  }
});

export default LectureViewer;
