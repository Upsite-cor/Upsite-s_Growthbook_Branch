import React from "react";
import { View,Text, TouchableOpacity, useWindowDimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckIcon from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import { colors, layout, typography } from "../../../styles/theme.style";

const iconForItem = {
    audio: 'file-audio-o',
    material: 'file-text-o',
    quiz: 'question-circle-o',
  };
  
const TableContentItem = ({item,onPress ,isChapter = true}) => {
    const {fontScale} = useWindowDimensions();
    const styles = getScaledStyles(fontScale);
    return (
      <>
        {isChapter && (
          <View>
            <View
              style={[
                styles.itemContainer,
                {
                  backgroundColor: colors.general.BACKGROUND,
                },
              ]}>
              <Text
                style={[
                  styles.itemText,
                  {
                    fontWeight: typography.fontWights.BOLD,
                  },
                ]}>
                {item.title}
              </Text>
            </View>
            {item?.child?.map(subItem => (
              <TableContentItem
                key={subItem?.id}
                item={subItem}
                onPress={onPress}
                isChapter={false}
              />
            ))}
          </View>
        )}
        {!isChapter && (
          <TouchableOpacity onPress={()=>{onPress? onPress(item): {}}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: layout.padding.HORIZONTAL
              }}>
              <View
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor: colors.general.WHITE,
                  },
                ]}>
                <Icon size={20} name={iconForItem[item.type]}></Icon>
                <Text
                  style={[
                    styles.itemText,
                    {
                      fontWeight: typography.fontWights.NORMAL,
                    },
                  ]}>
                  {item.title}
                </Text>
              </View>
              <View>
                {item.isCompleted && (
                  <CheckIcon size={20} color={colors.general.GREEN} name="checkcircleo" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

const getScaledStyles = fontScale =>{
    return StyleSheet.create({
        itemContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: layout.gap.NEIGHBORS,
          paddingHorizontal: layout.padding.HORIZONTAL/fontScale,
          paddingVertical: layout.padding.HORIZONTAL/fontScale
        },
        itemText: {
          fontFamily: typography.fontFamilies.PRIMARY,
          color: colors.font.PRIMARY,
          fontSize: typography.fontSizes.FONT_SIZE_SMALL/fontScale,
          color: colors.font.PRIMARY
        },
      })
}
  export default TableContentItem;