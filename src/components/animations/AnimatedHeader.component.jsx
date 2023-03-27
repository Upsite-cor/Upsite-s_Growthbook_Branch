import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '../../styles/theme.style';

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 250;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = colors.general.BRAND;
const DEFAULT_BACKGROUND_COLOR = '#303F9F';
const DEFAULT_TITLE_COLOR = 'white';

const Course = ({ children, backgroundImage, navbarAction }) => {
    const scrollY = new Animated.Value(0);
    const insets = useSafeAreaInsets();
    const alwaysShowNavBar = true;
    const headerMinHeight = insets.top + 55;
    const paddingTop= insets.top;
    const title = "";
    const alwaysShowTitle = true;
    const inputRange = [-DEFAULT_EXTRA_SCROLL_HEIGHT, 0, DEFAULT_HEADER_MAX_HEIGHT - headerMinHeight];
    const headerHeight = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [
            DEFAULT_HEADER_MAX_HEIGHT + DEFAULT_EXTRA_SCROLL_HEIGHT,
            DEFAULT_HEADER_MAX_HEIGHT,
            headerMinHeight,
        ],
        extrapolate: 'clamp',
    });
    const imageScale = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [DEFAULT_BACKGROUND_IMAGE_SCALE, 1, 1],
        extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [0, 0, -50],
        extrapolate: 'clamp',
    });
    const navBarForegroundOpacity = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
        extrapolate: 'clamp',
    });
    const imageOpacity = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });
    const titleTranslateY = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [5, 0, 0],
        extrapolate: 'clamp',
    });
    const titleOpacity = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [1, 1, alwaysShowTitle ? 1 : 0],
        extrapolate: 'clamp',
    });
    const navBarOpacity = scrollY.interpolate({
        inputRange: inputRange,
        outputRange: [0, 1, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                style={styles.scrollView}
                scrollEventThrottle={SCROLL_EVENT_THROTTLE}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: false,
                        listener: null,
                    },
                )}>
                <View
                    style={{ marginTop: DEFAULT_HEADER_MAX_HEIGHT }}>
                    {children}
                </View>
            </Animated.ScrollView>
            <Animated.View
                style={[
                    styles.header,
                    {
                        height: headerHeight,
                        backgroundColor: DEFAULT_NAVBAR_COLOR,
                        opacity: navBarOpacity,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.header,
                    {
                        height: headerHeight,
                        opacity: imageOpacity,
                        backgroundColor: backgroundImage ? 'transparent' : DEFAULT_BACKGROUND_COLOR,
                    },
                ]}>
                {backgroundImage && <Animated.Image
                    style={[
                        styles.backgroundImage,
                        {
                            height: DEFAULT_HEADER_MAX_HEIGHT,
                            opacity: imageOpacity,
                            transform: [{ translateY: imageTranslate }, { scale: imageScale }],
                        },
                    ]}
                    source={{ uri: backgroundImage }}
                />}
                {!backgroundImage && <Animated.View
                    style={{
                        height: DEFAULT_HEADER_MAX_HEIGHT,
                        DEFAULT_BACKGROUND_COLOR,
                        opacity: imageOpacity,
                        transform: [{ translateY: imageTranslate }, { scale: imageScale }],
                    }}
                />}
            </Animated.View>
            <Animated.View
                style={[
                    styles.headerTitle,
                    {
                        transform: [{ translateY: titleTranslateY }],
                        height: headerHeight,
                        opacity: titleOpacity,
                        paddingTop: paddingTop
                    },
                ]}>
                {typeof title === 'string' && (
                    <Text style={[styles.headerText, styles.headerText]}>{title}</Text>
                )}
                {typeof title !== 'string' && title}
            </Animated.View>
            <Animated.View
                style={[
                    styles.bar,
                    {
                        height: headerMinHeight,
                        opacity: navBarForegroundOpacity,
                    },
                ]}>
                {navbarAction()}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'whitez',
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: DEFAULT_NAVBAR_COLOR,
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: DEFAULT_HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    headerTitle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: DEFAULT_TITLE_COLOR,
        textAlign: 'center',
        fontSize: 16,
    },
});

const CourseDetailStylesheet = StyleSheet.create({
    aboutText: {
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: '700',
        fontSize: 24,
        color: colors.font.PRIMARY,
        marginTop: 15
    },
    courseTitle: {
        marginTop: 15,
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: '700',
        fontSize: 32,
        color: colors.font.PRIMARY,
    },
    scrollingContainer: {
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 10,
        top: -42,
    },
    tabSeperator: {
        marginTop: 15
    },
    contentSectionTitle: {
        fontFamily: typography.fontFamilies.PRIMARY,
        fontWeight: '700',
        fontSize: 20,
        color: colors.font.PRIMARY,
    },
    ctaButton: {

    },
    ctaContianer: {
        backgroundColor: "yellow",
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        marginLeft: 16,
        marginRight: 16,
        zIndex: 888,
        flex: 1

    }
});

export default Course;
