import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors, typography} from '../../styles/theme.style';

const Button = ({title, onPress, type = 'default', style = null, innerStyle =null,textStyle = null}) => {

  const getText = ()=>{
    return (
      <Text style={[type=="default"? styles.text: styles.textOutline, textStyle]}>{title}</Text>
    )
  }
  const styleProps = type=="default"? {...styles.container, ...innerStyle}: {...styles.containerOutline, ...innerStyle}
  return (
    <View style={style}>
      {type == 'default' && (
        <TouchableOpacity onPress={onPress} style={styleProps}>
        {getText()}
        </TouchableOpacity>
      )}
      {type == 'outline' && (
        <TouchableOpacity onPress={onPress} style={styleProps}>
        {getText()}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: colors.general.BRAND,
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '600',
    fontSize: 20,
    color: colors.font.SECONDARY,
  },

  containerOutline: {
    width: '100%',
    borderRadius: 4,
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOutline: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '600',
    fontSize: 16,
    color: colors.font.BRAND,
  },
});
export default Button;
