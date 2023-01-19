import React, {useState} from "react";
import { ActivityIndicator, Image,Text, TouchableOpacity, View} from "react-native";
import CourseCardStylesheet from "./CourseCard.component.style";

const CourseCard = ({course, clickHandler}) =>{
    const [isLoading, setIsLoading] = useState(true);
    
    return(        
        <TouchableOpacity style={CourseCardStylesheet.container}>
            <View style={CourseCardStylesheet.imageContainer}>
            {/* <ActivityIndicator animating={isLoading} /> */}
            <Image style={CourseCardStylesheet.image} source={{
             uri: course.coverArt }} />
            </View>
            <Text style={CourseCardStylesheet.title}>{course.title}</Text>
            <Text style={CourseCardStylesheet.authorName}>{course.authorName}</Text>
        </TouchableOpacity>
    );      
}

export default CourseCard;