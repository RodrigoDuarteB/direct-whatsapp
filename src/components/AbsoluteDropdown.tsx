import React, { FC, Fragment } from 'react'
import { View, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globals'
import { Props } from '../utils/interfaces'

export interface DropdownProps extends Props {
    dropped?: boolean
}

const AbsoluteDropdown: FC<DropdownProps> = ({ children, style, dropped }) => {
    return dropped ? (
        <View style={[styles.container, style]}>
            {children}
        </View>
    ) : <Fragment />
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colors.secondary,
        position: 'absolute',
        shadowColor: globalStyles.colors.primary,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.27,
        borderRadius: 10,
        top: '100%',
        left: 0
    }
})

export default AbsoluteDropdown