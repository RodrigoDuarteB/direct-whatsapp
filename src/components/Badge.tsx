import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {

}

const Badge: FC<IProps> = (props) => {
    return (
        <View style={[props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({})

export default Badge