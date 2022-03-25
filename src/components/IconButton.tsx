import React, { FC } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

interface IProps {
    icon: React.ReactNode
    onPress: Function
}

const IconButton: FC<IProps> = (props) => {
    return (
        <TouchableOpacity 
            onPress={() => props.onPress()}
        >
            {props.icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default IconButton