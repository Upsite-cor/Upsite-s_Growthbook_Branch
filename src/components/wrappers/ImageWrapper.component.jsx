import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import errorImage from '../../assets/images/errorImage.png';
import { colors } from "../../styles/theme.style";
const ImageWrapper = ({ src, style, imageStyle, errorImageStyle,spinnerStyle }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleLoaded = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    return (<View style={style}>
        {isLoading && <ActivityIndicator style={spinnerStyle} color={colors.general.BRAND} />}
        {!isError && <Image onError={handleError} onLoadEnd={handleLoaded} style={imageStyle} source={{ uri: src }} />}
        {isError && <Image style={errorImageStyle} source={errorImage} />}
    </View>)
}

export default ImageWrapper;