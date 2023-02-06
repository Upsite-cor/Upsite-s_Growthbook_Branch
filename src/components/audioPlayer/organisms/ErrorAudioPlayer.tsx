import React from "react";
import { SafeAreaView,View,Text,ActivityIndicator } from "react-native";
import { colors } from "../../../styles/theme.style";

const ErrorAudioPlayer = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>Please configure the audio player.</Text>
            <ActivityIndicator color={colors.general.BRAND} />
          </View>
        </SafeAreaView>
      );
}

export default ErrorAudioPlayer;