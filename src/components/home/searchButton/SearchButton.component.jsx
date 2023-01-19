import React from "react";
import { Text, Image, View } from "react-native";
import searchIcon from '../../../assets/icons/search.png';

import SearchButtonStylesheet from "./SearchButton.component.style";

const SearchButton = ({clickHandler}) => {
    return(
        <View style={SearchButtonStylesheet.container}>
        <Image style={{width:28, height:28}} source={searchIcon}/>
        <Text style={SearchButtonStylesheet.text}>What do you want to learn?</Text>
        </View>
    );
};

export default SearchButton;