import React from "react";
import { View, Text, StyleSheet, useWindowDimensions,Linking } from "react-native";
import { colors, typography } from "../../styles/theme.style";
const TermOfService = () => {
    const { fontScale } = useWindowDimensions();
    const styles = getScaledStyles(fontScale)
    return (
        <View style={styles.tosContainer}>
            <Text style={styles.tosText}>
                By using our services you are agreeing to our{' '}
                <Text onPress={()=>{
                    Linking.openURL("https://growthbookapp.io/");
                }} style={styles.tosBoldText}>
                    Terms
                </Text>
                {' '} and{' '}
                <Text onPress={()=>{
                    Linking.openURL("https://growthbookapp.io/privacy-policy#");
                }} style={styles.tosBoldText}>
                    Privacy Statement
                </Text>
            </Text>
        </View>
    );
};

const getScaledStyles = fontScale => {
    return StyleSheet.create({
        tosContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        tosText: {
            textAlign: 'center',
            fontFamily: typography.fontFamilies.PRIMARY,
            fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
            fontWeight: 400,
            color: colors.font.PRIMARY
        },
        tosBoldText: { color: colors.font.BRAND, fontWeight: 700 }

    })
}

export default TermOfService;