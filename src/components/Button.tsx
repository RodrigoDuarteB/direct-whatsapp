import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, Text, StyleProp, TextStyle } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {
    label: string
    onPress: Function
    textStyle?: StyleProp<TextStyle>
}

const Button: FC<IProps> = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={[styles.container, props.style]}
        >
            <Text style={[props.textStyle]}>{props.label}</Text>
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        paddingVertical: 3,
        paddingHorizontal: 5,
        alignItems: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default Button