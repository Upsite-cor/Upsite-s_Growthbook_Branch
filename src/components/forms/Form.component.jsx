import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { layout } from "../../styles/theme.style";
import Button from "../buttons/Button2.component";
import Field from "./Field.component";
const Form = ({ fields = [], buttonTitle = "", initalValues, validationSchema, handleSubmit, style = null }) => {
    return (
        <View style={style}>
            <Formik
                validationSchema={validationSchema}
                initialValues={initalValues}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit ? handleSubmit(values, resetForm) : {}
                }}>
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
                            // Check if the condition is defined and true
                            field.condition==undefined || field.condition  ? (
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
                                    {field.component && field.component()}
                                </View>
                            ) : null
                        ))}

                        <Button style={{ marginTop: layout.margin.NEIGHBORS }} onPress={handleSubmit}>
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