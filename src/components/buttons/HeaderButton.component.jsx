import React from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, layout, typography } from "../../styles/theme.style";

const HeaderButton = ({icon, onPress, type ="PRIMARY"}) =>{
  const {fontScale} = useWindowDimensions();
  const styles = getScaledStyle(fontScale,type);
    return(
      <TouchableOpacity onPress={()=> onPress? onPress(): ()=>{}} style={styles.button}>
        <Icon name={icon} size={typography.fontSizes.FONT_SIZE_LARGE/fontScale}/>
      </TouchableOpacity>
    );
  };

  const getScaledStyle = (fontScale,type) =>{
    return StyleSheet.create({
      button:{
        backgroundColor: colors.general.WHITE,
        width:layout.size.BUTTON/fontScale,
        height:layout.size.BUTTON/fontScale,
        borderRadius:type=="PRIMARY"? 50: 0,
        alignItems: "center",
        justifyContent:"center"
      }
    })
  }

  export default HeaderButton;