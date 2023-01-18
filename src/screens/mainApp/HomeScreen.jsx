import React from 'react';
import { Text, View, Image } from "react-native";
import growthbookLogo from '../../assets/images/growthbookLogo.png'
import globalStylesheet from '../../styles/global.style'
import homeScreenStylesheet from './HomeScreen.style';

export const HomeScreen = () =>{
    return(
        <View>
            <View style={[globalStylesheet.centered, homeScreenStylesheet.logo]}>
                <Image source={growthbookLogo} />
                <Text>Hello</Text>
                </View>
        </View>
    )
};