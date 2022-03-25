import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Props } from '../utils/interfaces'
import Button from './Button'

interface IProps extends Props {
    title: string
    onAccept: Function
}

const AlertMessage: FC<IProps> = (props) => {
    return (
        <View>
            <Text>{props.title}</Text>
            <View>
                {props.children}
            </View>
            <Button 
                label='Aceptar'
                onPress={() => props.onAccept()}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default AlertMessage