import { StyleSheet } from "react-native";

const MarketingSlideContainerStylesheet = StyleSheet.create({
    container:{
        marginTop:15
    },
    listItem:{
        maxHeight: 170
    },
    dotView:{
        flexDirection:'row',
        justifyContent: 'center',
        marginVertical: 20,
        position:"absolute",
        left: "50%",
        bottom: 10,
        gap: 3
    },
    circle:{
        width:10,
        height: 10,
        backgroundColor: "#D9D9D9",
        borderRadius: 50,

    }
});

export default MarketingSlideContainerStylesheet;