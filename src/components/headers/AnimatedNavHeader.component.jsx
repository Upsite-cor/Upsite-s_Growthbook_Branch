import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import HeaderButton from "../buttons/HeaderButton.component";
import { layout } from "../../styles/theme.style";

const AnimatedNavHeader = ({onBackPress}) =>{
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.headerButtonContainer, { marginTop: insets.top + 5 }]}>
            <HeaderButton
                onPress={onBackPress}
                icon={'chevron-back'}
            />
            {/* <HeaderButton icon={'heart-outline'} /> */}
        </View>
    );
};
const styles = StyleSheet.create({
    headerButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: layout.padding.HORIZONTAL
    },
})
export default AnimatedNavHeader;