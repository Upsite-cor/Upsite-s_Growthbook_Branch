import React from "react";
import {ScrollView, SafeAreaView as NativeSafeAreaView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerStylesheet from "./Container.component.style";

const Container = ({children, useDefaultSafeArea = true}) =>{
    return(
        <>
        {
            useDefaultSafeArea && (
                <NativeSafeAreaView>
                    <ScrollView style={ContainerStylesheet.container}>
                {children}
            </ScrollView>
                </NativeSafeAreaView>
            )
        }
        {
            !useDefaultSafeArea && (
                <SafeAreaView>
                <ScrollView style={ContainerStylesheet.container}>
            {children}
        </ScrollView>
            </SafeAreaView>
            )
        }
        </>
    )
};

export default Container;