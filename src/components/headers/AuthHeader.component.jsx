import React from "react";
import { View, Image, Text, StyleSheet, useWindowDimensions } from "react-native";
import Logo from '../../assets/images/growthbookLogo-2.png';
import { colors, typography } from "../../styles/theme.style";

const AuthHeader = ({ title }) => {
    const { fontScale } = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image resizeMode="contain" style={styles.logo} source={Logo} />
            </View>
            {title && <Text style={styles.text}>{title}</Text>}
        </View>
    )
};

export const getScaledStyles = (fontScale) => {
    return StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            gap: 45,
        },
        logoContainer: {
            alignItems: "center",
            marginTop: 15
        },
        logo: {
            maxWidth: 200,
            height: 45,
        },
        text: {
            fontFamily: typography.fontFamilies.PRIMARY,
            color: colors.font.PRIMARY,
            fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale
        }
    })
}

export default AuthHeader;