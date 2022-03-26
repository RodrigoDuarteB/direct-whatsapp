import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {

}

const Center: FC<IProps> = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    }
})

export default Center