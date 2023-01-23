import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderButton = ({icon}) =>{
    return(
      <TouchableOpacity style={{
        backgroundColor:"white",
        width:40,
        height:40,
        borderRadius:50,
        alignItems: "center",
        justifyContent:"center"
      }}>
        <Icon name={icon} size={24}/>
      </TouchableOpacity>
    );
  };

  export default HeaderButton;