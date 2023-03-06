import { typography, colors } from "../../styles/theme.style";
import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
const LineBreak = ({style}) => {
    const {fontScale} = useWindowDimensions();
    const styles =  useScaledStyle(fontScale);
    return (
        <View style={[styles.lineBreakContainer,style]}>
            <View style={styles.lineSegment} />
            <Text style={styles.lineText}>
                OR
            </Text>
            <View style={styles.lineSegment} />
        </View>
    );
};

const useScaledStyle = fontScale => {
    return StyleSheet.create({
        lineBreakContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        lineSegment: {
            flex: 1,
            height: 1,
            backgroundColor: colors.general.BRAND
        },
        lineText: {
            width: 50,
            color: colors.font.BRAND,
            textAlign: 'center',
            fontFamily: typography.fontFamilies.PRIMARY,
            fontWeight: 700,
            fontSize: typography.fontSizes.FONT_SIZE_SMALL / fontScale
        }
    });
}

export default LineBreak;