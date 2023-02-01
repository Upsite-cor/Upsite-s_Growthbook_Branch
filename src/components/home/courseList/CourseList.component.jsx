import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CourseCard from "../courseCard/CourseCard.component";
import CourseListStylesheet from "./CourseList.component.style";

const CourseList = ({courses, clickHandler}) =>{
    return(
        <FlatList
        style={CourseListStylesheet.container}
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CourseCard course={item} clickHandler={clickHandler}/>}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width:15 }} />}
        showsHorizontalScrollIndicator={false}
      />
    )
};

export default CourseList;