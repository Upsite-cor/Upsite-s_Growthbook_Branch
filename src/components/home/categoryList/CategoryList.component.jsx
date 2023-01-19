import React from "react";
import { View } from "react-native";
import CategoryPill from "../categoryPill/CategoryPill.component";
import CategoryListStylesheet from "./CategoryList.component.style";

const CategoryList = ({categories, clickHandler,resolver}) =>{
    const backgroundColors = ["#19419A", "#3E7B54", "#365D74", "#372D87", "#9F395E"]
    return(
        <View style={CategoryListStylesheet.container}>
        {categories.map((category, index)=>(
           <CategoryPill key={index} color={backgroundColors[index% backgroundColors.length]} clickHandler={clickHandler? ()=> clickHandler(category): ()=>{}} category={category} resolver={resolver}/>
        ))}
        </View>
    );
};

export default CategoryList;