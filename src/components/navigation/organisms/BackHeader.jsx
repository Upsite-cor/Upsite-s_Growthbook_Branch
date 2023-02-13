import React from 'react';
import {View,Text} from 'react-native';
import { colors, typography } from '../../../styles/theme.style';
import BackButton from '../atoms/BackButton';

const BackHeader = ({onPress ,text, type = "default"}) => {
    if(type=="default"){
      return (
        <View style={{flexDirection: 'row',height:40,position:"relative", alignItems: 'center'}}>
      <View style={{position:"absolute",zIndex:99, left:0, top:0}}>
      <BackButton onPress={onPress} />
      </View>
      <View style={{flex:1}}>
      {text && <Text style={{textAlign:"center",color: colors.font.BRAND,fontSize:24, lineHeight:22, fontFamily: typography.fontFamilies.PRIMARY, fontWeight:600}}>{text}</Text>}
      </View>
    </View>
      )
    }
    if(type=="text"){
      return(
        <View style={{flexDirection: 'row',height:40, alignItems: 'center'}}>
       <View style={{flex:1}}>
      {text && <Text style={{textAlign:"center",color: colors.font.BRAND,fontSize:24, lineHeight:22, fontFamily: typography.fontFamilies.PRIMARY, fontWeight:400}}>{text}</Text>}
      </View>
      </View>
      )
    }
};

export default BackHeader;
