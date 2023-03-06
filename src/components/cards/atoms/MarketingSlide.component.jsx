import React from "react";
import { View, Text, useWindowDimensions, ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { colors, layout, typography } from "../../../styles/theme.style";

const MarketingSlide = ({currentSlide, width}) =>{
    const {fontScale, height} = useWindowDimensions();
    const styles = getScaledStyles(fontScale, width, height);

    return(
        <View style={styles.container}>
            <ImageBackground imageStyle={styles.image} resizeMode="cover" style={styles.imageContainer} source={currentSlide.image}>
            <View style={styles.textContainer}>
            <Text style={styles.text}>{currentSlide.text}</Text>
            </View>
            </ImageBackground>
        </View>
    );
};
const getScaledStyles = (fontScale,width, height) => {
    return StyleSheet.create({
        container:{
            width:width,
        },
        imageContainer:{
            width:width,
            height: 170,
            backgroundColor: colors.general.BLACK,
            padding: layout.padding.HORIZONTAL
        },
        textContainer:{
            width:"70%",
        },
        image:{
            opacity:0.8,
        },
        text:{
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.BOLD,
            fontSize: typography.fontSizes.FONT_SIZE_MEDIUM/fontScale,
            color: colors.font.SECONDARY
        }
    })
}

export default MarketingSlide;