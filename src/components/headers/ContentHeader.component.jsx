import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors, typography,layout } from "../../styles/theme.style";

const ContentHeader = ({children, title = '', style, headingStyle}) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return (
      <View style={[{gap:layout.gap.NEIGHBORS},style]}>
        <Text style={[styles.contentSectionTitle,headingStyle]}>{title}</Text>
        <View style={{marginTop: layout.margin.INERNAL}}>{children}</View>
      </View>
    );
};

const getScaledStyles = fontScale =>{
    return StyleSheet.create({
      contentSectionTitle:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: typography.fontWights.BOLD,
        fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
        color: colors.font.PRIMARY,
      },
    });
  }
export default ContentHeader;