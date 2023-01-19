import {StyleSheet} from 'react-native';
import {colors, typography} from '../../../styles/theme.style';

const CategoryPillStylesheet = StyleSheet.create({
    button:{
        alignItems:"center",
        alignSelf:"flex-start",
        borderRadius:4,
        paddingVertical: 10,
        paddingHorizontal:15,
    },
    text:{
        color: colors.font.SECONDARY,
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "600",
        fontSize: 16,
    }
});

export default CategoryPillStylesheet;