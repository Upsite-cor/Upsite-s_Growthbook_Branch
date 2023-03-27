import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'
import { colors, layout, typography } from '../../styles/theme.style';

const TabBar = ({ tabs = [], activeIndex, setActiveIndex }) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);

    return (
        <View style={styles.container}>
            {tabs.map((item, index) => (
                <TouchableOpacity key={index} onPress={()=>{setActiveIndex? setActiveIndex(index):{}}} style={[styles.button, activeIndex == index ? styles.active : {}]}>
                    <Text style={[styles.text, { color: activeIndex == index ? colors.font.PRIMARY : colors.font.DARK }]}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const getScaledStyles = fontScale =>{
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.general.BACKGROUND,
            alignItems: "center",
            paddingHorizontal: layout.padding.HORIZONTAL/fontScale,
            paddingVertical: layout.padding.VERTICAL/fontScale,
            borderRadius: layout.borderRadius.INPUT_FIELD,
        },
        active: {
            backgroundColor: colors.font.SECONDARY,
            paddingHorizontal: layout.padding.HORIZONTAL/fontScale,
            paddingVertical: layout.padding.VERTICAL/fontScale,
            borderRadius: layout.borderRadius.INPUT_FIELD,
            shadowColor:  colors.general.BLACK,
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 0.3,
            elevation: 3,
            shadowRadius: layout.borderRadius.INPUT_FIELD,
        },
        text: {
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: typography.fontWights.SEMI_BOLD,
            fontSize: typography.fontSizes.FONT_SIZE_BUTTON_OUTLINE/fontScale
        }
    });
    
}
export default TabBar