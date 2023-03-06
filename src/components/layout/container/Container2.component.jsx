import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const Container = ({ children, safeAreaEdges = null, scrollViewBounce=false, refreshControl=null}) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={safeAreaEdges}>
            <ScrollView  contentContainerStyle={{ flexGrow: 1 }} bounces={scrollViewBounce} refreshControl={refreshControl}>
                {children}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
};

export default Container;