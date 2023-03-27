import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../styles/theme.style';

const types = {
  back: {
    icon: {name: 'play-skip-back', color: colors.general.BRAND, size: 40},
    style: {},
  },
  forward:{
    icon: {name: 'play-skip-forward', color: colors.general.BRAND, size: 40},
    style: {},
  },
  play: {
    icon: {name: 'play-circle', color: colors.general.BRAND, size: 80},
    style: {},
  },
  pause:{
    icon: {name: 'pause-circle', color: colors.general.BRAND, size: 80},
    style: {},
  },
};

export const PlayerButton = ({type, onPress ,style = null}) => {
  const button = types[type];
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon
        name={button.icon.name}
        color={button.icon.color}
        size={button.icon.size}></Icon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD479',
    padding: 20,
  },
  secondary: {
    fontSize: 14,
    color: '#FFD479',
    padding: 22,
  },
});
