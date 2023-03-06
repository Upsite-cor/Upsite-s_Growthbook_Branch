import React from "react";
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from "react-native";
import {colors, layout, typography} from '../../../styles/theme.style';

const CategoryPill = ({category, resolver, color, clickHandler}) =>{
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return(
        <TouchableOpacity onPress={clickHandler} style={[styles.button, {backgroundColor: color ?? "red"}]}>
          {resolver==null && <Text style={styles.text}>{category?.name}</Text>}
          {resolver!=null && <Text style={styles.text}>{resolver(category)}</Text>}
      </TouchableOpacity>
    );
}

const getScaledStyles = fontScale =>{
  return  StyleSheet.create({
    button:{
        alignItems:"center",
        alignSelf:"flex-start",
        borderRadius: layout.borderRadius.INPUT_FIELD,
        paddingVertical: layout.padding.VERTICAL,
        paddingHorizontal: layout.padding.HORIZONTAL,
    },
    text:{
        color: colors.font.SECONDARY,
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: typography.fontWights.SEMI_BOLD,
        fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
    }
});
}
export default CategoryPill