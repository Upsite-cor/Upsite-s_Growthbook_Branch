import React from 'react';
import {Text, Image, View, TouchableWithoutFeedback, Alert} from 'react-native';
import searchIcon from '../../../assets/icons/search.png';

import SearchButtonStylesheet from './SearchButton.component.style';

const SearchButton = ({clickHandler}) => {
  return (
    <TouchableWithoutFeedback onPress={clickHandler}>
      <View style={SearchButtonStylesheet.container}>
        <Image style={{width: 28, height: 28}} source={searchIcon} />
        <Text style={SearchButtonStylesheet.text}>
          What do you want to learn?
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchButton;
