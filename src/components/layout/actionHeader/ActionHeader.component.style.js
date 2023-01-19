import {StyleSheet} from 'react-native';
import { typography, colors } from '../../../styles/theme.style';

const ActionHeaderStylesheet = StyleSheet.create({
    container:{
        marginTop: 15,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    heading:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontSize: 24,
        fontWeight:"700",
        color: colors.font.PRIMARY,
    },
    actionButtonText:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontSize: 14    ,
        fontWeight:"600",
        color: colors.font.BRAND,
    }
});

export default ActionHeaderStylesheet;