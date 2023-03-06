import React, { useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native'
import MarketingSlide from '../atoms/MarketingSlide.component';
import marketing1 from '../../../assets/images/marketing1.png';
import marketing2 from '../../../assets/images/marketing2.png';
import marketing3 from '../../../assets/images/marketing3.png';
import { StyleSheet } from "react-native";
import { colors, layout } from '../../../styles/theme.style';

const viewConfigRef = { viewAreaCoveragePercentageThreshold: 95, itemVisiblePercentThreshold: 95 }
const slides = [
    {
        id:1,
        image: marketing1,
        text: "The Greatest Lessons, Organized"
    }
    ,{
        id:2,
        image: marketing2,
        text: "Unprecedented Sales Development"
    },
    {
        id:3,
        image: marketing3,
        text: "Digital Credentials and Badges"
    }
]


const MarketingSlides = ({ style }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleWidth, setVisibleWidth] = useState(0);

    let flatListRef = useRef();

    const handleLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setVisibleWidth(width);
    };
    const handleOnScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
        setCurrentIndex(currentIndex);
    };
    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index })
        setCurrentIndex(index);
    }

    return (
        <View style={{ style }} onLayout={handleLayout}>
            <FlatList
                style={{borderRadius: layout.borderRadius.INPUT_FIELD }}
                data={slides}
                renderItem={({ item }) => <MarketingSlide currentSlide={item} width={visibleWidth} />}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                ref={(ref) => {
                    flatListRef.current = ref;
                }}
                viewabilityConfig={viewConfigRef}
                onScroll={handleOnScroll}
                pagingEnabled />

            <View style={styles.dotView}>
                {slides.map((item, index) => (
                    <TouchableOpacity onPress={() => { scrollToIndex(index) }} style={[styles.circle, {
                        backgroundColor: index == currentIndex ? colors.font.WHITE : colors.font.DARK
                    }]} key={index.toString()}>

                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: "absolute",
        left: "50%",
        bottom: 20,
        gap: 3
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    }
});

export default MarketingSlides