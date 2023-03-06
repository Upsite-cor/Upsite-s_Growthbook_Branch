import React from 'react';
import { StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { View, Text } from 'react-native';
import { colors, layout, typography } from '../../styles/theme.style';

const defaultProps = {
  placeholder: "Enter text here...",
  keyboardType: 'default',
  secureTextEntry: false,
  maxLength: 40,
  multiline: false,
  editable: true,
  autoCorrect: false,
  autoCapitalize: 'none',
};

const propTypes = {
  email: {
    keyboardType: 'email-address',
    textContentType: "emailAddress",
    inputMode: "email"
  },
  password: {
    keyboardType: 'default',
    secureTextEntry: true,
    autoCapitalize: 'none',
  },
  phone: {
    keyboardType: 'phone-pad',
    autoCapitalize: 'none',
  },
};

const Field = ({type, error, ...otherProps}) => {
  const {fontScale} = useWindowDimensions();
  const propsToUse = getPropsToUse(type);
  const styles = getScaledStyles(fontScale);
  return (
    <View>
      <TextInput color={colors.font.PRIMARY} placeholderTextColor={colors.font.PLACEHOLDER} style={styles.container} {...propsToUse} {...otherProps} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const getPropsToUse =(type) =>{
  let propsToUse = { ...defaultProps };
  if (type) {
    propsToUse = { ...propsToUse, ...propTypes[type] };
  }
  return propsToUse;
}

const getScaledStyles = fontScale =>{
  return StyleSheet.create({
    container: {
      height: 50/fontScale,
      padding: layout.padding.INPUT_FIELDS,
      backgroundColor: colors.font.WHITE,
      borderColor: colors.font.PLACEHOLDER,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: layout.borderRadius.INPUT_FIELD,
    },
    errorText: {
      fontFamily: typography.fontFamilies.PRIMARY,
      color: colors.font.ERROR,
      fontWeight: typography.fontWights.NORMAL,
      fontSize: typography.fontSizes.CAPTION/fontScale
    }
  });
}
export default Field;
