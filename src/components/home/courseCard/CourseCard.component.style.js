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
    },
    ratingContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:5,
        gap:2
    },
    ratingAverageText:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "700",
        fontSize: 14,
        color: colors.font.GOLDEN,
    },
    ratingCount:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "400",
        fontSize: 14,
        color: colors.font.DARK,
    },
    activityLoader:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default CourseCardStylesheet;