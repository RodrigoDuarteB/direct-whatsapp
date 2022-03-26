import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {

}

const Divider: FC<IProps> = (props) => {
    return <View style={[styles.divider, props.style]}/>            
}

const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: 1
    }
})

export default Divider