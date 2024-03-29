import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Props } from '../utils/interfaces'

interface IProps extends Props {

}

const Badge: FC<IProps> = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c4c4c4',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5 
    }
})

export default Badge