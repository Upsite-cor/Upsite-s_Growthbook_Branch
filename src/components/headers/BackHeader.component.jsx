import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout, typography } from '../../styles/theme.style';
import HeaderButton from '../buttons/HeaderButton.component';

const BackHeader = ({ onPress, text ="", type = "default", style = null}) => {
  const {fontScale} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const styles = getScaledStyle(fontScale,insets);
  return (
    <View style={[styles.container, style]}>
      {
        type=="default" &&  <View style={styles.iconContainer}>
        <HeaderButton icon={'chevron-back'} type={"SECONDARY"} onPress={onPress} />
        </View>
      }
      <Text style={styles.text}>{text}</Text>
    </View>
  )
};

const getScaledStyle = (fontScale,insets) => {
  return StyleSheet.create({
    container: {
      flexDirection:"row",
      alignItems:"center",
      position:"relative",
      paddingHorizontal: layout.padding.HORIZONTAL/fontScale,
      paddingVertical: layout.padding.VERTICAL/fontScale,
      marginTop: layout.margin.HORIZONTAL,
    },
    iconContainer:{
      position:"absolute",
      left: layout.padding.HORIZONTAL,
      zIndex:999
    },
    text:{
      fontFamily: typography.fontFamilies.PRIMARY,
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM/fontScale,
      fontWeight: typography.fontWights.BOLD,
      flex:1,
      color: colors.font.BRAND,
      textAlign:"center"
      
    }
  })
}

export default BackHeader;
