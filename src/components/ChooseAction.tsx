import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { globalStyles } from '../styles/globals'
import Button from './Button'

export interface ChooseActionProps {
    condition: string
    onReject: Function
    onAccept: Function
}

const ChooseAction: FC<ChooseActionProps> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.condition}>{props.condition}</Text>

            <View style={styles.buttonsContainer}>
                <Button
                    label='No'
                    onPress={() => props.onReject()}
                    style={[styles.button, styles.rejectButton]}
                    textStyle={styles.textButton}
                />

                <Button
                    label='Si'
                    onPress={() => props.onAccept()}
                    style={[styles.button, styles.acceptButton]}
                    textStyle={styles.textButton}
                />
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 8
    },
    condition: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: '30%',
        borderRadius: 12,
        paddingVertical: 12
    },
    textButton: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
    },
    rejectButton: {
        backgroundColor: globalStyles.colors.red
    },
    acceptButton: {
        backgroundColor: globalStyles.colors.primaryLight
    }
})

export default ChooseAction