import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { globalStyles } from '../styles/globals'
import { Props } from '../utils/interfaces'

interface IProps extends Props {

}

const Layout: FC<IProps> = ({ children }) => {
    
    return (
        <LinearGradient 
            colors={[globalStyles.colors.primaryLight, globalStyles.colors.secondaryLight]} 
            style={styles.container}
            locations={[0, 0.42]}
        >
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Layout