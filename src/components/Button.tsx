import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {
    label: string
    onPress: Function
}

const Button: FC<IProps> = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={[props.style]}
        >
            <Text>{props.label}</Text>
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default Button