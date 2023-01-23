import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import courseNoSyllabus from '../../assets/images/courseNoSyllabus.png';
import {colors, typography} from '../../styles/theme.style';
import Icon from 'react-native-vector-icons/FontAwesome';


const iconForItem = {
    audio :"file-audio-o",
    material: "file-text-o",
    quiz: "question-circle-o"
}
const TableOfContent = ({content}) => {
  const TableContentItem = ({item, isChapter = true}) => {
    return (
      <>
      {isChapter && 
      <View>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: colors.general.BACKGROUND,
              
          },
        ]}>
        <Text style={[styles.itemText, {
          fontWeight:  "700"
        }]}>{item.title}</Text>
      </View>
      {item?.child?.map((subItem)=> (
          <TableContentItem key={subItem?.id} item={subItem} isChapter={false}/>
      ))}
    </View>}
    {
        !isChapter && 
        <TouchableOpacity>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: colors.general.WHITE,
            },
          ]}>
            <Icon size={20} name={iconForItem[item.type]}></Icon>
          <Text style={[styles.itemText, {
            fontWeight: "400"
          }]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    }
      </>
    );
  };
  return (
    <View style={styles.container}>
      {(content == null || content.length <= 0) && (
        <View style={styles.errorContainer}>
          <Image
            style={styles.errorImage}
            resizeMode={'contain'}
            source={courseNoSyllabus}
          />
          <Text style={styles.errorText}>
            Instructor has no uploaded the syllabus for this course. Please
            check again.
          </Text>
        </View>
      )}
      {content?.length > 0 && (
        <View>
          {content.map((chapter, index) => (
            <TableContentItem key={index} item={chapter} />
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  errorContainer: {
    marginTop: 15,
  },
  errorImage: {
    width: '100%',
    height: 250,
  },
  errorText: {
    fontFamily: typography.fontFamilies.PRIMARY,
    color: colors.font.DARK,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 15,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginHorizontal: -16,
    flexDirection:"row",
              alignItems: "center",
              gap: 10
  },
  itemText:{
    fontFamily: typography.fontFamilies.PRIMARY,
    color: colors.font.PRIMARY,
    fontSize: 16
  }
});

export default TableOfContent;
