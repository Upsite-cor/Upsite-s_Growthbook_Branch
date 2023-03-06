import React from "react";
import { TouchableOpacity, Text, View, useWindowDimensions} from "react-native";
import {StyleSheet} from 'react-native';
import { colors, typography } from "../../styles/theme.style";

const ActionHeader = ({heading, actionTitle, actionHandler}) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return(
        <View style={styles.container}>
            <Text style={styles.heading}>{heading}</Text>
            <TouchableOpacity onPress={actionHandler? ()=> actionHandler(): ()=>{}}>
                {actionTitle && <Text style={styles.actionButtonText}>{actionTitle}</Text>}
            </TouchableOpacity>
        </View>
    );
};

const getScaledStyles = fontScale =>{
    return  StyleSheet.create({
        container:{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        },
        heading:{
            fontFamily: typography.fontFamilies.PRIMARY,
            fontSize: typography.fontSizes.FONT_SIZE_MEDIUM/ fontScale,
            fontWeight:typography.fontWights.BOLD,
            color: colors.font.PRIMARY,
        },
        actionButtonText:{
            fontFamily: typography.fontFamilies.PRIMARY,
            fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
            fontWeight: typography.fontWights.SEMI_BOLD,
            color: colors.font.BRAND,
        }
    });
}

export default ActionHeader;