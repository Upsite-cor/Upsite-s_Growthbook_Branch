import React from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../../styles/theme.style";
import ErrorMessage from "../exceptions/atoms/ErrorMessage.component";
import FlexWrapper from "../wrappers/FlexWrapper.component";
const LazyLoader = ({ loading, loaded, condition, children }) => {
    if (loading) {
        return (
            <FlexWrapper>
                <ActivityIndicator color={colors.general.BRAND} />
            </FlexWrapper>
        );
    }
    if (loaded && !condition) {
        return (
            <FlexWrapper>
                <ErrorMessage />
            </FlexWrapper>
        )
    }
    if (loaded && condition) {
        return children;
    }
}

export default LazyLoader;