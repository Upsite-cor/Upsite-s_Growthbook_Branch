import React from "react";
import {View} from 'react-native';
import ContainerStylesheet from "./Container.component.style";

const Container = ({children}) =>{
    return(
        <View style={ContainerStylesheet.container}>
            {children}
        </View>
    );
};

export default Container;