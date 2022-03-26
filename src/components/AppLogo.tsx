import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Ionicicons from 'react-native-vector-icons/Ionicons';
import { Props } from '../utils/interfaces';

interface IProps extends Props {

}

const AppLogo: FC<IProps> = (props) => {
    return (
        <View style={[props.style]}>
            <View style={styles.logosContainer}>
                <Ionicicons name='md-arrow-redo' size={80} color="black" style={styles.arrowIcon}/>
                <Ionicicons name='logo-whatsapp' size={80} color="black"/>
            </View>
            <Text style={styles.appName}>Direct Whatsapp</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logosContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    appName: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    arrowIcon: {
        marginTop: 35,
    }
})

export default AppLogo