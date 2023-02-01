import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { colors, typography } from '../../styles/theme.style';

const AuthorHeader = ({author}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{uri: author?.profilePic}}/>
        <Text style={styles.text}>{author?.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        gap:35
    },
    image:{
        width:50,
        height:50,
        borderRadius:50
    },
    text:{
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 22,
        color: colors.font.PRIMARY
    }
})

export default AuthorHeader