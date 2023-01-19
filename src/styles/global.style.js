import { StyleSheet } from "react-native";
import {colors, typography} from './theme.style';

const globalStylesheet= StyleSheet.create({
    centered:{
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"red"
    },
    container:{
        paddingHorizontal:16
    },
    //Typogrpahy
    heading:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontSize: 32,
        fontWeight:"700",
        color: colors.font.PRIMARY,
    },
    subHeading:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontSize: 24,
        fontWeight:"700",
        color: colors.font.PRIMARY,
    }
})

export default globalStylesheet;