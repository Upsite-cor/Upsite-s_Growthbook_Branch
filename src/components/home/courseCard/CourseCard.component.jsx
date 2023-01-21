import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../styles/theme.style";
import StarRating from "../../rating/StarRating.component";
import CourseCardStylesheet from "./CourseCard.component.style";
import errorImage from '../../../assets/images/errorImage.png';

const CourseCard = ({ course, clickHandler }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleError = () =>{
        setIsLoading(false);
        setIsError(true);
    };

    const handleLoaded = () =>{
        // setIsLoading(false);
    };

    return (
        <TouchableOpacity style={CourseCardStylesheet.container}>
            <View style={CourseCardStylesheet.imageContainer}>
            {isLoading && <ActivityIndicator  style={CourseCardStylesheet.activityLoader}/>}
            {!isError && <Image onError={handleError} onLoadEnd={handleLoaded} style={CourseCardStylesheet.image} source={{uri:course.coverArt}} />}
            {isError && <Image style={CourseCardStylesheet.image} source={errorImage} />}
            </View>
            <Text style={CourseCardStylesheet.title}>{course.title}</Text>
            <Text style={CourseCardStylesheet.authorName}>{course.authorName}</Text>
            <View style={CourseCardStylesheet.ratingContainer}>
                <Text style={CourseCardStylesheet.ratingAverageText}>{course.rating.average}</Text>
                <StarRating
                    containerStyle={{ gap: 3 }}
                    disabled={false}
                    maxStars={5}
                    fullStarColor={colors.rating.FULL_STAR}
                    halfStarColor={colors.rating.HALF_STAR}
                    emptyStarColor={colors.rating.EMPTY_STAR}
                    rating={course.rating.average}
                    starSize={10}
                />
                <Text style={CourseCardStylesheet.ratingCount}>({course.rating.count})</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CourseCard;