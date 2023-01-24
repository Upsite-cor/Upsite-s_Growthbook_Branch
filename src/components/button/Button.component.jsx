import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors, typography} from '../../styles/theme.style';

const Button = ({title, type = 'default', style = null}) => {
  return (
    <View style={style}>
      {type == 'default' && (
        <TouchableOpacity style={styles.container}>
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      )}
       {type == 'outline' && (
        <TouchableOpacity style={styles.containerOutline}>
          <Text style={styles.textOutline}>{title}</Text>
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
