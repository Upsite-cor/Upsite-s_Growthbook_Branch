import {StyleSheet} from 'react-native';
import { colors, typography } from '../../../styles/theme.style';

const SearchButtonStylesheet = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal: 2,
        paddingVertical: 5,
        gap: 10,
        backgroundColor: colors.general.BACKGROUND,
        borderRadius: 8,
        marginTop: 15
    },
    text:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "400",
        fontSize: 16,
        color: colors.font.DARK,
        

        
    }
});

export default SearchButtonStylesheet;