import React, { FC } from 'react'
import { View, StyleSheet, Text, TextInput, TextInputProps } from 'react-native'

interface IProps extends TextInputProps {
    required?: boolean
    label?: string
}

const Input: FC<IProps> = (props) => {
    return props.label ? (
        <View>
            <Text>{props.label}</Text>
            <TextInput {...props}/>
        </View>
    ) : (
        <TextInput {...props}/>
    )
}

const styles = StyleSheet.create({})

export default Input