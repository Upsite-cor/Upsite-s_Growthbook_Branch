import { StyleSheet } from "react-native"
import { colors, typography } from "../../../styles/theme.style";

const CourseCardStylesheet= StyleSheet.create({
    container:{
        width:250,
    },
    imageContainer:{
        height:141,
        alignItems: "center",
        justifyContent: "center"
    },
    image:{
        height:"100%",
        width:"100%",
        borderRadius:4,
    },
    title:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "700",
        fontSize: 18,
        color: colors.font.PRIMARY,
        marginTop: 5
    },
    authorName:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "400",
        fontSize: 14,
        color: colors.font.DARK,
        marginTop: 5
    }
})

export default CourseCardStylesheet;