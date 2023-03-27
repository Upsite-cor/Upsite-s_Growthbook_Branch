import React from "react";
import { View, StyleSheet } from "react-native";
import { layout } from "../../../styles/theme.style";
import CategoryPill from "../atoms/CategoryPill.component";

const Categories = ({ categories, clickHandler, resolver, style = null }) => {
    const backgroundColors = ["#19419A", "#3E7B54", "#365D74", "#372D87", "#9F395E"]
    return (
        <View style={[CategoryListStylesheet.container, style]}>
            {categories.map((category, index) => (
                <CategoryPill key={index} color={backgroundColors[index % backgroundColors.length]} clickHandler={clickHandler ? () => clickHandler(category) : () => { }} category={category} resolver={resolver} />
            ))}
        </View>
    );
};

const CategoryListStylesheet = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: layout.gap.NEIGHBORS,
    }
});


export default Categories;