import React from "react";
import { View, StyleSheet } from "react-native";
import Apple from "../molecules/Apple";
import Google from "../molecules/Google";
import Facebook from "../molecules/Facebook";
import { layout } from "../../../styles/theme.style";

const SocialLogin = ({style}) => {
    return (
        <View style={[styles.authProviderContainer, style]}>
            <Apple />
            <Google />
            <Facebook />
        </View>
    );
}

const styles = StyleSheet.create({
    authProviderContainer: {
        display: "flex",
        gap: layout.gap.NEIGHBORS
    }
})

export default SocialLogin;