import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native';
import {colors, typography} from '../../styles/theme.style';

const WordWrapper = ({
  text="",
  textStyle,
  buttonTextStyle,
  buttonContainerStyle,
}) => {
  const {fontScale} = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedText, setExpandedText] = useState(
    text?.split(' ')?.slice(0, 50)?.join(' ') ??"" + '...',
  );

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setExpandedText(text?.split(' ')?.slice(0, 50)?.join(' ') + '...');
    } else {
      setExpandedText(text);
    }
  };

  const defaultButtonContainerStyle = {};

  return (
    <View>
      <Text style={[styles.defaultTextStyle, textStyle]}>{expandedText}</Text>
      <TouchableOpacity
        style={[defaultButtonContainerStyle, buttonContainerStyle]}
        onPress={handleClick}>
        <Text style={[styles.defaultButtonTextStyle, buttonTextStyle]}>
          {isExpanded ? 'Show Less' : 'Show All'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const getScaledStyles = fontScale =>{
  return StyleSheet.create({
    defaultTextStyle : {
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight: typography.fontWights.NORMAL,
      fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
      color: colors.font.PRIMARY,
      lineHeight: typography.lineHeight.DEFAULT,
    },
    defaultButtonTextStyle: {fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight:  typography.fontWights.SEMI_BOLD,
      fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale,
      color: colors.font.BRAND,
      lineHeight: typography.lineHeight.DEFAULT,
    }
  })
}

export default WordWrapper;
