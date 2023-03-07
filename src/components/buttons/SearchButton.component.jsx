import React from 'react';
import {Text, Image, View, TouchableWithoutFeedback,StyleSheet, useWindowDimensions} from 'react-native';
import searchIcon from '../../assets/icons/search.png';
import { colors, layout, typography } from '../../styles/theme.style';

const SearchButton = ({clickHandler, style=null}) => {
  const {fontScale} = useWindowDimensions();
  const styles = getScaledStyle(fontScale);
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={clickHandler}>
      <View style={styles.container}>
        <Image style={{width: 28/fontScale, height: 28/fontScale}} source={searchIcon} />
        <Text style={styles.text}>
          What do you want to learn?
        </Text>
      </View>
    </TouchableWithoutFeedback>
    </View>
  );
};
const getScaledStyle = fontScale =>{
  return StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal: layout.padding.INPUT_FIELDS,
        paddingVertical: layout.padding.INPUT_FIELDS,
        gap: layout.gap.NEIGHBORS,
        backgroundColor: colors.general.BACKGROUND,
        borderRadius: layout.borderRadius.INPUT_FIELD,
    },
    text:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: typography.fontWights.NORMAL,
        fontSize: typography.fontSizes.FONT_SIZE_BUTTON_OUTLINE/fontScale,
        color: colors.font.DARK,
    }
  });
}
export default SearchButton;
