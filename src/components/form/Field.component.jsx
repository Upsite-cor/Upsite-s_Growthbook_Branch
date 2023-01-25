import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text } from 'react-native';
import { typography } from '../../styles/theme.style';

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
    autoCapitalize: 'none',
    inputMode: "email"
  },
  password: {
    keyboardType: 'visible-password',
    secureTextEntry: true,
    autoCapitalize: 'none',
  },
  phone: {
    keyboardType: 'phone-pad',
    autoCapitalize: 'none',
  },
};

const Field = (props) => {
  const { type,error,style, ...otherProps } = props;
  let propsToUse = { ...defaultProps };
  let styleProps = {...styles.container, ...style}
  if (type) {
    propsToUse = {...propsToUse, ...propTypes[type]};
  }
  return (
    <View>
      <TextInput style={styleProps} {...propsToUse} {...otherProps} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        height: 50,
        padding:10,
        backgroundColor: 'white',
        borderColor: '#808080',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    errorText:{
      fontFamily: typography.fontFamilies.PRIMARY,
      color: "red",
      fontWeight:"400",
      fontSize:12
    }
});
export default Field;
