import React, { FC, useState } from 'react'
import { View, StyleSheet, Switch, Text, StyleProp, TextStyle, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globals'
import { Props } from '../utils/interfaces'

interface IProps extends Props {
    label: string
    onChange: (value: boolean) => void
    initialValue?: boolean
    textStyle?: StyleProp<TextStyle>
    colorOnEnabled?: string
    colorOnDisabled?: string
}

const SwitchOption: FC<IProps> = (props) => {
    const [value, setValue] = useState(props.initialValue)

    const thumbColorEnabled = props.colorOnEnabled || globalStyles.colors.primary
    const thumbColorDisabled = props.colorOnDisabled || globalStyles.colors.secondaryDark
    
    return (
        <View style={[styles.container, props.style]}>
            <Switch
                value={value} 
                onValueChange={value => {
                    props.onChange(value)
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 5
    }
})

export default SwitchOption