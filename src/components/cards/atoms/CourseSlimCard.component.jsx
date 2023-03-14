import React from "react";
import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import ImageWrapper from "../../wrappers/ImageWrapper.component";
import { layout } from "../../../styles/theme.style";
import { StyleSheet } from "react-native"
import { colors, typography } from "../../../styles/theme.style";

const CourseSlimCard = ({ course, clickHandler }) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return (
        <TouchableOpacity onPress={() => clickHandler ? clickHandler(course) : () => { }}>
            <View style={{ flexDirection: "row", gap: layout.gap.NEIGHBORS}}>
                <ImageWrapper src={course.coverArt}
                 errorImageStyle={styles.image} 
                 spinnerStyle={styles.activityLoader}
                style={styles.imageContainer} imageStyle={styles.image} />
                <View style={{flex:1,gap: layout.gap.INTERNAL, paddingVertical: layout.padding.VERTICAL}}>
                    <Text style={styles.title}>{course.title}</Text>
                    <Text style={styles.authorName}>{course.author?.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const getScaledStyles = fontScale =>{
    return StyleSheet.create({
        imageContainer:{
            height:80,
            width:80,
            flex:0,
            alignItems: "center",
            justifyContent: "center"
        },
        image:{
            height:"100%",
            width:"100%",
            borderRadius:4,
        },
        title:{
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.BOLD,
            fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
            color: colors.font.PRIMARY,
        },
        authorName:{
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.NORMAL,
            fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
            color: colors.font.DARK
        },
        activityLoader:{
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
export default CourseSlimCard;