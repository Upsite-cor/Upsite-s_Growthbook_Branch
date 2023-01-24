import {StyleSheet} from 'react-native';
import {colors, typography} from '../../../styles/theme.style';

const CourseDetailStylesheet = StyleSheet.create({
  aboutText: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '700',
    fontSize: 24,
    color: colors.font.PRIMARY,
    marginTop:15
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
  tabSeperator:{
    marginTop:15
  },
  contentSectionTitle:{
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '700',
    fontSize: 20,
    color: colors.font.PRIMARY,
  },
  ctaButton:{
   
  },
  ctaContianer:{
    backgroundColor:"yellow",
    position:'absolute', 
    bottom:25,
    left:0,
    right:0,
    marginLeft:16,
    marginRight:16,
    zIndex:888,
    flex:1

  }
});
export default CourseDetailStylesheet;
