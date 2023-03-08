import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, TextInput, useWindowDimensions, TouchableOpacity } from "react-native";
import { colors, layout, typography } from "../../styles/theme.style";
const SearchInput = ({ inputVal, updateInputVal, handleSubmit, clearInput }) => {
  const { fontScale } = useWindowDimensions();
  const styles = getScaledStyles(fontScale);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        <Icon name="search" style={styles.icon} />
        <TextInput
          color={colors.font.PRIMARY}
          placeholderTextColor={colors.font.PLACEHOLDER}
          placeholder="Search"
          returnKeyType="search"
          style={styles.input}
          onChangeText={newText => updateInputVal ? updateInputVal(newText) : {}}
          value={inputVal}
          onSubmitEditing={handleSubmit}
        />
      </View>
      {inputVal && <TouchableOpacity style={styles.clearButton} onPress={() => { updateInputVal ? updateInputVal('') : {}; clearInput ? clearInput() : {} }}>
        <Icon name="times" style={styles.clearIcon} />
      </TouchableOpacity>}
    </View>
  )
};

const getScaledStyles = fontScale => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.general.BACKGROUND,
      borderColor: colors.font.PLACEHOLDER,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: layout.borderRadius.INPUT_FIELD,
      paddingHorizontal: layout.padding.HORIZONTAL
    },
    icon: {
      fontSize: typography.fontSizes.FONT_SIZE_BUTTON / fontScale,
      color: 'gray',
    },
    clearIcon: {
      fontSize: typography.fontSizes.FONT_SIZE_MEDIUM / fontScale,
      color: 'gray',
    },
    input: {
      height: 50 / fontScale,
      padding: layout.padding.INPUT_FIELDS,
      width: "90%",
    },
    clearButton: {
      flex: 0,
      height: 50 / fontScale,
      width: 50 / fontScale,
      justifyContent: "center",
      alignItems: "center"
    }
  });
}

export default SearchInput;
