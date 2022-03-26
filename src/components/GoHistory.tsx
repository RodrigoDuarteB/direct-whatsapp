import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { globalStyles } from '../styles/globals'

interface IProps {
    navigation: any
}

const GoHistory: FC<IProps> = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('History')}
            style={styles.container}
        >
            <Text style={styles.text}>Ver Historial</Text>
            <Fontisto name='history' color={globalStyles.colors.primaryLight} size={22}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        marginRight: 8,
        fontSize: 15
    }
})

export default GoHistory