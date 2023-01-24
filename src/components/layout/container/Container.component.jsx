import React from 'react';
import {ScrollView, SafeAreaView as NativeSafeAreaView} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ContainerStylesheet from './Container.component.style';


const Container = ({children, useDefaultSafeArea = true, edges= ["top", "bottom"], isScrollable = true}) => {

    const renderBody = ({children, isScrollable= true}) =>{
        return(
            <>
            { isScrollable && (
                <ScrollView style={ContainerStylesheet.container}>
            {children}
          </ScrollView>
            )}
            {
                !isScrollable && (
                    <>{children}</>
                )
            }
            </>
        )
    };
  return (
    <>
      {useDefaultSafeArea && (
        <NativeSafeAreaView style={{flex: 1, position:"relative"}}>
          {renderBody({children, isScrollable})}
        </NativeSafeAreaView>
      )}
      {!useDefaultSafeArea && (
        <SafeAreaProvider>
          <SafeAreaView  style={{flex: 1}} edges={edges}>
          {renderBody({children, isScrollable})}
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </>
  );
};


export default Container;
