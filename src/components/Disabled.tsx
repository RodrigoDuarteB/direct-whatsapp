import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {
    enabled?: boolean
}

const Disabled: FC<IProps> = (props) => {
    return (
        <View pointerEvents={props.enabled ? 'auto' : 'none'} style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
})

export default Disabled