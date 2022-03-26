import React, { FC } from 'react'
import { View, StyleSheet, Text, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native'
import { globalStyles } from '../styles/globals'

interface IProps extends TextInputProps {
    required?: boolean
    label?: string
    containerStyle?: StyleProp<ViewStyle>
}

const Input: FC<IProps> = (props) => {
    return props.label ? (
        <View style={[styles.container, props.containerStyle]}>
            <Text>{props.label}</Text>
            <TextInput {...props} style={[styles.input, props.style]}/>
        </View>
    ) : (
        <View style={[styles.container, props.containerStyle]}>
            <TextInput {...props} style={[styles.input, props.style]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    input: {
        backgroundColor: globalStyles.colors.secondary,
        padding: 3
    }
})

export default Input