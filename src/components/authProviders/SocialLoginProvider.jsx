import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import { typography } from '../../styles/theme.style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SocialLoginProvider = ({title,type, onPress = () => {}, loading = false}) => {
  const icons = {
    apple: 'apple',
    google: 'google',
    facebook: 'facebook',
  };
  const colors = {
    apple: '#000000',
    google: '#808080',
    facebook: '#4267B2',
  };
  Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <TouchableOpacity
      style={[styles.provider, {borderColor: colors[type]}]}
      onPress={() => (loading ? null : onPress(type))}>
      <View style={styles.providerContainer}>
        {!loading && <Icon size={30} color={colors[type]} name={icons[type]} />}
        {loading && <ActivityIndicator color={colors[type]} />}
        <Text style={[styles.providerText, {color: colors[type]}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //Header
  imageContainer: {
    alignItems: 'center',
    marginTop: 45,
    maxHeight: 45,
  },
  logo: {
    maxWidth: 218,
    maxHeight: 45,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 45,
  },
  textContent: {
    textAlign: 'center',
  },

  //Social Login
  provider: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    height: 50,
  },
  providerContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  providerText: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '600',
    fontSize: 20,
  },
});

export default SocialLoginProvider;
