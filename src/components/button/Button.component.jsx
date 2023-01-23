import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors, typography } from '../../styles/theme.style'

const Button = ({title}) => {
  return (
   <TouchableOpacity style={styles.container}>
    <Text style={styles.text}>{title}</Text>
   </TouchableOpacity>
  )
}


const styles= StyleSheet.create({
    container:{
        width:"100%",
        borderRadius:4,
        backgroundColor:colors.general.BRAND,
        padding:10,
        height:50,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
      fontFamily: typography.fontFamilies.PRIMARY,
      fontWeight:"600",
      fontSize:20,
      color: colors.font.SECONDARY
    }
})
export default Button