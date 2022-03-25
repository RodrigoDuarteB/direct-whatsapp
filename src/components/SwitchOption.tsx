import React, { FC } from 'react'
import { View, StyleSheet, Switch, Text } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {
    label: string
    onChange: (value: boolean) => void
    initialValue?: boolean
    textColor?: string
    colorOnEnabled?: string
    colorOnDisabled?: string
}

const SwitchOption: FC<IProps> = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <Switch
                value={props.initialValue} 
                onValueChange={value => props.onChange(value)}
                thumbColor={'white'}
                trackColor={{false: 'white', true: 'white'}}
            />
            <Text style={{ color: props.textColor }}>{props.label}</Text>            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default SwitchOption