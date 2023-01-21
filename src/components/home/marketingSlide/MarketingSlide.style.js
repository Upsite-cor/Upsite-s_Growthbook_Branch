import { StyleSheet } from "react-native";
import { colors, typography } from "../../../styles/theme.style";
const MarketingStylesheet = StyleSheet.create({
    container:{
        maxWidth:398,
        maxHeight:170
    },
    textContainer:{
        position: "absolute",
        top:20,
        left: 16,
        maxWidth: 220,
    },
    text:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "700",
        fontSize: 24,
        color: colors.font.SECONDARY
    }
})

export default MarketingStylesheet;