import React from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme.style';
import HeaderButton from '../headerButtons/HeaderButtons.component';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CourseHeader = ({imageUrl, colorOpacity}) => {
  const safeAreaInsets = useSafeAreaInsets();
    return (
      <View>
        <Image
          style={[Stylesheet.headerImage]}
          source={{uri: imageUrl}}
        />
        <Animated.View
          style={{
            opacity: colorOpacity,
            backgroundColor: colors.general.BRAND,
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}></Animated.View>
        <View
          style={[
            {top: safeAreaInsets.top, paddingHorizontal: 16},
            Stylesheet.headerButtonContainer,
          ]}>
          <HeaderButton icon={'chevron-back'} />
          <HeaderButton icon={'heart-outline'} />
        </View>
      </View>
    );
  };

const Stylesheet = StyleSheet.create({
  headerButtonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
})

  export default CourseHeader;