import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { typography } from '../../../styles/theme.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const SocialLoginProvider = ({ title, type, onPress = () => { }, loading = false }) => {
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyle(fontScale);
  return (
    <TouchableOpacity
      style={[styles.provider, { borderColor: colors[type] }]}
      onPress={() => (loading ? null : onPress(type))}>
      <View style={styles.providerContainer}>
        {!loading && <Icon size={30 / fontScale} color={colors[type]} name={icons[type]} />}
        {loading && <ActivityIndicator color={colors[type]} />}
        <Text style={[styles.providerText, { color: colors[type] }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getScaledStyle = (fontScale) => {
  return StyleSheet.create({
    providerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 15,
      flex: 1
    },
    provider: {
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      height: 50 / fontScale
    },
    providerText: {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.SEMI_BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_BUTTON / fontScale,
    },
  });
}

export default SocialLoginProvider;
