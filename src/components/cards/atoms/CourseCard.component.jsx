import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { StyleSheet } from "react-native"
import { colors, layout, typography } from "../../../styles/theme.style";
import StarRating from "../../rating/StarRating.component";
import errorImage from '../../../assets/images/errorImage.png';

const CourseCard = ({ course, clickHandler }) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    const handleLoaded = () => {
        setIsLoading(false);
    };

    return (
        <TouchableOpacity onPress={() => clickHandler ? clickHandler(course) : () => { }} style={styles.container}>
            <View style={styles.imageContainer}>
                {isLoading && <ActivityIndicator style={styles.activityLoader} />}
                {!isError && <Image onError={handleError} onLoadEnd={handleLoaded} style={styles.image} source={{ uri: course?.coverArt }} />}
                {isError && <Image style={styles.image} source={errorImage} />}
            </View>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.authorName}>{course.author?.name}</Text>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingAverageText}>{course.rating.average}</Text>
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
                <Text style={styles.ratingCount}>({course.rating.count})</Text>
            </View>
        </TouchableOpacity>
    );
}

const getScaledStyles = fontScale =>{
    return StyleSheet.create({
        container: {
            width: 250,
        },
        imageContainer: {
            height: 140,
            alignItems: "center",
            justifyContent: "center"
        },
        image: {
            height: "100%",
            width: "100%",
            borderRadius: 4,
        },
        title: {
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.BOLD,
            fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
            color: colors.font.PRIMARY,
            marginTop: layout.margin.INERNAL
        },
        authorName: {
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.NORMAL,
            fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
            color: colors.font.DARK,
            marginTop: layout.margin.INERNAL
        },
        ratingContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: layout.margin.INERNAL,
            gap: layout.gap.INTERNAL
        },
        ratingAverageText: {
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.BOLD,
            fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
            color: colors.font.GOLDEN,
        },
        ratingCount: {
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.NORMAL,
            fontSize:  typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
            color: colors.font.DARK,
        },
        activityLoader: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
        }
    });
}
export default CourseCard;