import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-animatable';
import { colors, layout, typography } from '../../../styles/theme.style';
const SkillPill = ({skill, clickHandler}) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return (
      <TouchableOpacity onPress={()=>{clickHandler(skill)}}>
        <View style={styles.pill} onPress>
        <Text style={styles.learningText}>{skill}</Text>
      </View>
      </TouchableOpacity>
    );
};

const getScaledStyles = fontScale =>{
    return  StyleSheet.create({
        learningText: {
          fontFamily: typography.fontFamilies.PRIMARY,
          fontWeight: typography.fontWights.NORMAL,
          fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
          color: colors.font.PRIMARY,
          lineHeight: typography.lineHeight.DEFAULT,
        },
        pill: {
          backgroundColor: colors.general.BACKGROUND,
          borderRadius: layout.borderRadius.INPUT_FIELD,
          paddingHorizontal: layout.padding.HORIZONTAL/fontScale,
          paddingVertical: layout.padding.VERTICAL/fontScale,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
      
}

export default SkillPill;