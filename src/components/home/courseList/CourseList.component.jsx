import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CourseCard from "../courseCard/CourseCard.component";

const CourseList = ({courses}) =>{
    return(
        <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CourseCard course={item}/>}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    )
};

export default CourseList;