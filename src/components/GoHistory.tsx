import React, { FC } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

interface IProps {
    navigation: any
}

const GoHistory: FC<IProps> = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('History')}
        >
            <Text>Ver Historial</Text>
            {/* Icon */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default GoHistory