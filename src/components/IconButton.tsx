import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props{
    icon: React.ReactNode
    onPress?: Function
}

const IconButton: FC<IProps> = (props) => {
    return (
        <TouchableOpacity 
            onPress={() => props.onPress ? props.onPress() : {}}
            style={[{alignSelf: 'flex-start'}, props.style]}
        >
            {props.icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default IconButton