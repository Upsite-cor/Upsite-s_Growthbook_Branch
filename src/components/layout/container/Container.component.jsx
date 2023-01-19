import React from "react";
import {ScrollView} from 'react-native';
import ContainerStylesheet from "./Container.component.style";

const Container = ({children}) =>{
    return(
        <ScrollView style={ContainerStylesheet.container}>
            {children}
        </ScrollView>
    );
};

export default Container;