import React, { useEffect, useReducer } from "react";
import { ScrollView, Text, View, useWindowDimensions, StyleSheet } from "react-native";
import Container from "../../components/layout/Container2.component";
import SearchInput from "../../components/forms/SearchInput.component";
import { layout } from "../../styles/theme.style";
import LineBreak from "../../components/layout/LineBreak.component";
import LazyLoader from "../../components/layout/LazyLoader.component";
import { Storage } from "../../utils";
import CoursePillHolder from "../../components/pills/molecules/CoursePillHolder.component";
import Button from "../../components/buttons/Button2.component";
import waitingSearch from '../../assets/images/waitingSearch.png';
import ErrorMessage from "../../components/exceptions/atoms/ErrorMessage.component";
import CourseService from "../../services/courses/Course.service";
import emptyCart from '../../assets/images/emptyCart.png';
import CourseSlimCard from "../../components/cards/atoms/CourseSlimCard.component";

const initialState = { loading: true, searchValue: "", inputVal: "", recentSearches: [], courses: [], courseLoaded: false, searchResults: [] };
const RECENT_SEARCHES_KEY = "@recentSearches";

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULT':
      return { ...state, searchResults: action.payload };
    case 'SET_COURSES':
      return { ...state, courses: action.payload, loading: false, courseLoaded: true };
    case 'SET_RECENT_SEARCHES':
      return { ...state, recentSearches: action.payload };
    case 'CLEAR_SEARCH':
      return { ...state, searchValue: "" };
    case 'CLEAR_RECENT':
      return { ...state, recentSearches: [] }
    case 'SET_SEARCH_VAL':
      return { ...state, searchValue: state.inputVal };
    case 'SET_SKILL_VAL':
      return { ...state, searchValue: action.payload, inputVal: action.payload };
    case 'UPDATE_INPUT_VAL':
      return { ...state, inputVal: action.payload };
    case 'UPDATE_RECENT_SEARCHES':
      return { ...state, recentSearches: action.payload?.recentSearches, searchValue: action.payload?.searchValue };
    default:
      return state;
  }
}

const Search = ({ navigation }) => {
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchCourses = async () => {
    var courses = null;
    try {
      courses = await CourseService.getAllCourses();
    } catch (error) {
    }
    dispatch({ type: "SET_COURSES", payload: courses });
  }
  const fetchStoredSearches = async () => {
    var recentSearches = [];
    try {
      recentSearches = await Storage.getParsed(RECENT_SEARCHES_KEY);
      if (recentSearches == null) {
        recentSearches = [];
      }
    } catch (error) {
      recentSearches = [];
    }
    dispatch({ type: "SET_RECENT_SEARCHES", payload: recentSearches });
  }
  const updateInputVal = (val) => {
    dispatch({ type: "UPDATE_INPUT_VAL", payload: val });
  }
  const clearInput = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  }
  const performSearch = (inputVal) => {
    var courses = state.courses.filter(x => x.title.toLowerCase().includes(inputVal.toLowerCase()) || x?.description?.toLowerCase().includes(inputVal.toLowerCase()));
    dispatch({ type: "SET_SEARCH_RESULT", payload: courses });
  }
  const handleSearch = async () => {
    if (state.inputVal) {
      if (state.recentSearches.indexOf(state.inputVal) === -1) {
        const searches = [state.inputVal, ...state.recentSearches.slice(0, 9)];
        dispatch({ type: "UPDATE_RECENT_SEARCHES", payload: { recentSearches: searches, searchValue: state.inputVal } });
        try {
          await Storage.parseSet(RECENT_SEARCHES_KEY, searches);
        } catch (e) {
        }
      }else{
        dispatch({type:"SET_SEARCH_VAL"});
      }
      performSearch(state.inputVal);
    } else {
      dispatch({ type: "CLEAR_SEARCH" });
    }
  }
  const courseOpened = course => {
    navigation.navigate('course', { payload: course });
  };
  const fetchData = async () => {
    try {
      await fetchStoredSearches();
    }
    catch (error) {

    }
    await fetchCourses();
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <Container>
      <LazyLoader loaded={state.courseLoaded} loading={state.loading} condition={state.courses}>
        <View style={{ paddingVertical: layout.padding.VERTICAL, paddingHorizontal: layout.padding.HORIZONTAL }}>
          <SearchInput updateInputVal={updateInputVal} inputVal={state.inputVal} handleSubmit={handleSearch} clearInput={clearInput} />
        </View>
        <LineBreak type="continuous" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.viewContainer}>
            {state.searchValue == "" && state.recentSearches?.length > 0 && <>
              <Text>Top Searches</Text>
              <CoursePillHolder clickHandler={(search) => {
                dispatch({ type: "SET_SKILL_VAL", payload: search });
                performSearch(search);
              }} skills={state.recentSearches}></CoursePillHolder>
              <Button onPress={async () => {
                dispatch({ type: "CLEAR_RECENT" });
                await Storage.parseSet(RECENT_SEARCHES_KEY, []);
              }} type="outline" containerStyle={{ alignItems: 'flex-start' }}>Clear History</Button></>
            }
            {
              state.searchValue == "" && (!state.recentSearches || state.recentSearches?.length == 0) &&
              <ErrorMessage text={"Waiting to search!"} imageSource={waitingSearch} />
            }
            {
              state.searchValue != "" && <>
                {
                  (!state.searchResults || state.searchResults?.length <= 0) &&
                  <ErrorMessage imageSource={emptyCart} text={"No Result found."} />
                }
                {
                  state.searchResults?.length > 0 && state.searchResults.map(course => (
                    <CourseSlimCard key={course.id} course={course} clickHandler={courseOpened}></CourseSlimCard>
                  ))
                }
              </>
            }
          </View>
        </ScrollView>
      </LazyLoader>
    </Container>
  )
};

const getScaledStyles = fontScale => {
  return StyleSheet.create({
    viewContainer: {
      paddingHorizontal: layout.padding.HORIZONTAL,
      paddingVertical: layout.padding.VERTICAL,
      gap: layout.gap.NEIGHBORS,
      flex: 1,
    }
  });
}


export default Search;