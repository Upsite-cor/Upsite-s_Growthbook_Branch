import React from "react";
import { View, FlatList } from 'react-native';
import CourseCard from "../atoms/CourseCard.component";

const CourseList = ({courses, clickHandler, style}) =>{
    return(
        <FlatList
        style={style}
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