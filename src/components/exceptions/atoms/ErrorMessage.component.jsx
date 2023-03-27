import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, layout, typography } from '../../../styles/theme.style';
import bugFix from '../../../assets/images/bugFix.png';

const ErrorMessage = ({ imageSource, text, style}) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return (
        <View style={[{flex:1, justifyContent:"center", gap:layout.gap.NEIGHBORS}, style]}>
            <Image
                style={styles.errorImage}
                resizeMode={'contain'}
                source={imageSource? imageSource: bugFix}
            />
            <Text style={styles.errorText}>
                {text ?? "We ran into an error. Please contact the administrator."}
            </Text>
        </View>
    )
}

const getScaledStyles = fontScale =>{
    return StyleSheet.create({
        errorImage: {
          width: '100%',
          height: 250/fontScale,
        },
        errorText: {
          fontFamily: typography.fontFamilies.PRIMARY,
          color: colors.font.DARK,
          textAlign: 'center',
          fontWeight: '600',
          fontSize: typography.fontSizes.FONT_SIZE_CAPTION/fontScale
        }
      });
}

export default ErrorMessage