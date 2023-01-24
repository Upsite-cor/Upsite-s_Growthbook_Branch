import React from 'react'
import { TextInput } from 'react-native'

const FormField = ({value, placeHolder="sss", valueChanged, inputMode="text", style=null}) => {
  return (
    <>
    <TextInput style={style} value={value} valueChanged={valueChanged} inputMode={inputMode} placeholder={placeHolder}>

    </TextInput>
    </>
  )
}

export default FormField