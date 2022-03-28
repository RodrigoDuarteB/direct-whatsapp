import React, { FC } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props{
    icon: React.ReactNode
    onPress: Function
}

const IconButton: FC<IProps> = (props) => {
    return (
        <TouchableOpacity 
            onPress={() => props.onPress()}
            style={props.style}
        >
            {props.icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default IconButton