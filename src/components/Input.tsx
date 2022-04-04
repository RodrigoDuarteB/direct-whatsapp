import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { View, StyleSheet, Text, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native'
import { globalStyles } from '../styles/globals'
import { ControlledInput } from '../utils/interfaces'
import InputErrorText from './InputErrorText'

interface IProps extends TextInputProps, ControlledInput {
    required?: boolean
    label?: string
    containerStyle?: StyleProp<ViewStyle>
}

const Input: FC<IProps> = (props) => {
    const { controlled } = props

    if(controlled){
        return (
            <Controller
                name={controlled.name}
                control={controlled.control}
                defaultValue={controlled.defaultValue}
                rules={controlled.rules}
                render={({ field: { value, onBlur, onChange }, formState: { errors } }) => {
                    return (
                        <View style={[styles.container, props.containerStyle]}>
                            <Text style={styles.label}>
                                {props.label && props.label} { errors[controlled.name] && <InputErrorText text='Es requerido'/>}
                            </Text>

                            <TextInput 
                                {...props} 
                                style={[styles.input, props.style]}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                            />
                        </View>
                    ) 
                }}
            />
        )
    }
    return (
        <View style={[styles.container, props.containerStyle]}>
            { props.label && <Text style={styles.label}>{props.label}</Text> }
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
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }
})

export default Input