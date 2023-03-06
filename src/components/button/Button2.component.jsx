import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import { colors, typography } from '../../styles/theme.style';

const Button = ({ children, onPress, type = 'default', style = null, containerStyle = null, textStyle = null }) => {
  const { fontScale } = useWindowDimensions();
  const styles = useScaledStyles(fontScale);
  const [presetContainerStyle, presetTextStyle] = getpresetStyles(type, fontScale);
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress} style={[styles.container, presetContainerStyle, containerStyle]}>
        <Text style={[styles.text, presetTextStyle, textStyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getpresetStyles = (type, fontScale) => {
  const presetContainerStyle = type == "default" ? {
    borderRadius: 4,
    backgroundColor: colors.general.BRAND
  } : {}
  const presetTextStyle = type == "default" ? {
    fontSize: typography.fontSizes.FONT_SIZE_BUTTON / fontScale,
    color: colors.font.SECONDARY
  } : {
    fontSize: typography.fontSizes.FONT_SIZE_BUTTON_OUTLINE / fontScale,
    color: colors.font.BRAND
  }
  return [presetContainerStyle, presetTextStyle]
}

const useScaledStyles = (fontScale) => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50 / fontScale,
    },
    text: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.SEMI_BOLD
    },
  });
}
export default Button;
