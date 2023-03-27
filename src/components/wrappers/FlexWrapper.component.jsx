import React from "react";
import {View} from 'react-native';

const FlexWrapper = ({children}) =>{
    return(
        <View style={{ flex: 1, justifyContent: "center" }}>
            {children}
      </View>
    );
}

export default FlexWrapper;