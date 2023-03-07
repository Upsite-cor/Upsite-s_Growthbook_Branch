import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Entypo';
import { colors, layout, typography } from '../../../styles/theme.style';
const LearningPill = ({learning, clickHandler}) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return (
        <View style={styles.learningPill}>
        <Icon style={{color: colors.general.GREEN}} name="check" size={typography.fontSizes.FONT_SIZE_BUTTON_OUTLINE/fontScale} />
        <Text style={styles.learningText}>{learning}</Text>
      </View>
    );
};

const getScaledStyles = fontScale =>{
    return  StyleSheet.create({
        learningPill: {
            flexDirection: 'row',
            alignItems:"flex-start",
            gap: layout.gap.INTERNAL,
          },
        learningText: {
          fontFamily: typography.fontFamilies.PRIMARY,
          fontWeight: typography.fontWights.NORMAL,
          fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
          color: colors.font.PRIMARY,
          lineHeight: typography.lineHeight.DEFAULT,
        }
      });
      
}

export default LearningPill;