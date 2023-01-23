import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors, typography} from '../../styles/theme.style';

const WordWrapper = ({
  text,
  textStyle,
  buttonTextStyle,
  buttonContainerStyle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedText, setExpandedText] = useState(
    text.split(' ').slice(0, 50).join(' ') + '...',
  );

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setExpandedText(text.split(' ').slice(0, 50).join(' ') + '...');
    } else {
      setExpandedText(text);
    }
  };

  const defaultTextStyle = {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '400',
    fontSize: 14,
    color: colors.font.PRIMARY,
    lineHeight: 22,
  };
  const defaultButtonTextStyle = {fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '600',
    fontSize: 14,
    color: colors.font.BRAND,
    lineHeight: 22};
  const defaultButtonContainerStyle = {};

  return (
    <View>
      <Text style={[defaultTextStyle, textStyle]}>{expandedText}</Text>
      <TouchableOpacity
        style={[defaultButtonContainerStyle, buttonContainerStyle]}
        onPress={handleClick}>
        <Text style={[defaultButtonTextStyle, buttonTextStyle]}>
          {isExpanded ? 'Show Less' : 'Show All'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WordWrapper;
