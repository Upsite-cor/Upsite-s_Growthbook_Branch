import React from "react";
import { View, Image, Text } from "react-native";
import marketing1 from '../../../assets/images/marketing1.png';
import marketing2 from '../../../assets/images/marketing2.png';
import marketing3 from '../../../assets/images/marketing3.png';
import MarketingStylesheet from "./MarketingSlide.style";

const MarketingSlide = ({slideNum = "first"}) =>{

    const slides = {
        first: {
            image: marketing1,
            text: "The Greatest Lessons, Organized"
        },
        second: {
            image: marketing2,
            text: "Unprecedented Sales Development"
        },
        third:{
            image: marketing3,
            text: "Digital Credentials and Badges"
        }
    }

    const currentSlide = slides[slideNum];

    return(
        <View style={MarketingStylesheet.container}>
            <Image source={currentSlide.image}/>
            <View style={MarketingStylesheet.textContainer}>
            <Text style={MarketingStylesheet.text}>{currentSlide.text}</Text>
            </View>
        </View>
    );
};

export default MarketingSlide;