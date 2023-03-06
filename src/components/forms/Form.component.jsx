import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { layout } from "../../styles/theme.style";
import Button from "../button/Button2.component";
import Field from "./Field.component";
const Form = ({ fields = [], buttonTitle="", initalValues, validationSchema, handleSubmit, style = null }) => {
    return (
        <View style={style}>
            <Formik
                validationSchema={validationSchema}
                initialValues={initalValues}
                onSubmit={handleSubmit}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <View style={styles.fieldContainer}>
                        {fields.map((field, index) => (
                            <View key={field?.name}>
                            <Field
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                error={errors[field.name]}
                                onChangeText={handleChange(field.name)}
                                onBlur={handleBlur(field.name)}
                                value={values[field.name]}
                            />
                            {
                                field.component && 
                                field.component()
                            }       
                            </View>
                        ))}
                        <Button style={{marginTop: layout.margin.NEIGHBORS}} onPress={handleSubmit}>
                            {buttonTitle}
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
};

const styles = StyleSheet.create({
    fieldContainer: {
        gap: layout.gap.NEIGHBORS
    }
})

export default Form;