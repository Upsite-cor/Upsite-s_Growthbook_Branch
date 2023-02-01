import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import CategoryPillStylesheet from './CategoryPill.component.style';

const CategoryPill = ({category, resolver, color, clickHandler}) =>{
    return(
        <TouchableOpacity onPress={clickHandler} style={[CategoryPillStylesheet.button, {backgroundColor: color ?? "red"}]}>
          {resolver==null && <Text style={CategoryPillStylesheet.text}>{category?.name}</Text>}
          {resolver!=null && <Text style={CategoryPillStylesheet.text}>{resolver(category)}</Text>}
      </TouchableOpacity>
    );
}

export default CategoryPill