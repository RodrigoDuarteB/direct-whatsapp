import React, { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { View, StyleSheet, Switch, Text, StyleProp, TextStyle, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globals'
import { ControlledInput, Props } from '../utils/interfaces'
import InputErrorText from './InputErrorText'

interface IProps extends Props, ControlledInput {
    label: string
    onChange?: (value: boolean) => void
    initialValue?: boolean
    textStyle?: StyleProp<TextStyle>
    colorOnEnabled?: string
    colorOnDisabled?: string
}

const SwitchOption: FC<IProps> = (props) => {
    const [value, setValue] = useState(props.initialValue)

    const thumbColorEnabled = props.colorOnEnabled || globalStyles.colors.primary
    const thumbColorDisabled = props.colorOnDisabled || globalStyles.colors.secondaryDark

    if(props.controlled){
        const { controlled } = props
        return (
            <Controller 
                name={controlled.name}
                control={controlled.control}
                defaultValue={controlled.defaultValue}
                rules={controlled.rules}
                render={({ field: { onChange, value }, formState: { errors } }) => {
                    return (
                        <View style={[styles.container, props.style]}>
                            {errors[controlled.name] && <InputErrorText text='Es requerido'/>}
                            
                            <View style={[styles.subcontainer, props.style]}>
                                <Switch
                                    value={value} 
                                    onValueChange={value => {
                                        props.onChange && props.onChange(value)
                                        onChange(value)
                                    }}
                                    thumbColor={ value ? thumbColorEnabled : thumbColorDisabled}
                                    trackColor={{false: 'gray', true: 'white'}}
                                />

                                <TouchableOpacity onPress={() => onChange(!value)}>
                                    <Text style={[styles.text, props.textStyle]}>
                                        {props.label}
                                    </Text>            
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        )
    }
    
    return (
        <View style={[styles.subcontainer, props.style]}>
            <Switch
                value={value} 
                onValueChange={value => {
                    props.onChange && props.onChange(value)
                    setValue(value)
                }}
                thumbColor={ value ? thumbColorEnabled : thumbColorDisabled}
                trackColor={{false: 'gray', true: 'white'}}
            />

            <TouchableOpacity onPress={() => setValue(!value)}>
                <Text style={[styles.text, props.textStyle]}>
                    {props.label}
                </Text>            
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    subcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 5
    }
})

export default SwitchOption