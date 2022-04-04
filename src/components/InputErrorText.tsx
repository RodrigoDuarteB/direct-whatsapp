import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props{
    text?: string
}

const InputErrorText: FC<IProps> = (props) => {
    return <Text style={[styles.text, props.style]}>* {props.text && props.text}</Text>
}

const styles = StyleSheet.create({
    text: {
        color: 'red',
        fontWeight: 'bold'
    }
})

export default InputErrorText