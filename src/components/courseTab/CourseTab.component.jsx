import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, typography } from '../../styles/theme.style';

const CourseTab = ({tabs= []}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    
   const handlePress = (index) => {
    setActiveIndex(index);
  }


  return (
    <View style={styles.container}>
        {tabs.map((item, index)=>(
            <TouchableOpacity key={index} onPress={()=>{handlePress(index)}} style={[styles.button, activeIndex==index? styles.active: {}]}>
                <Text style={[styles.text, {color: activeIndex==index? colors.font.PRIMARY: colors.font.DARK}]}>{item}</Text>
            </TouchableOpacity>
        ))}
    </View>
  )
}

const styles =StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal: 15,
        paddingVertical:5,
        backgroundColor:"#EDF0F5",
        alignItems:"center",
        borderRadius:8,
        minHeight:42
    },
    button:{

    },
    active:{
        backgroundColor:"#fff",
        paddingHorizontal: 7,
        paddingVertical:5,
        borderRadius:8,
        minHeight:32,
        shadowColor: 'rgba(0, 0, 0, 0.25)', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 1, 
        shadowRadius: 4,
    },
    text:{
        fontFamily:typography.fontFamilies.PRIMARY,
        fontWeight:"600",
        fontSize: 16

    }
});

export default CourseTab