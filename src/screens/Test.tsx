import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

interface IProps {

}

const Test: FC<IProps> = (props) => {
    return (
        <View>
            <Text style={styles.text}>Holaaa</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'pink',
        width: 50
    }
})

export default Test