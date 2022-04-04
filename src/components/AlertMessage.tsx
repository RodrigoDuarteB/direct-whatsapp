import React, { FC } from 'react'
import { View, StyleSheet, Text, StyleProp, TextStyle, ViewStyle, ScrollView } from 'react-native'
import { globalStyles } from '../styles/globals'
import { Props } from '../utils/interfaces'
import Button from './Button'
import Modal from './Modal'

interface IProps extends Props {
    title: string
    onAccept: Function
    buttonTitle?: string
    visible?: boolean
    titleStyle?: StyleProp<TextStyle>
    buttonStyle?: StyleProp<ViewStyle>
}

const AlertMessage: FC<IProps> = (props) => {
    return (
        <Modal
            visible={props.visible}
            onRequestClose={() => props.onAccept()}
        >
            <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
                        
            <ScrollView 
                contentContainerStyle={[styles.children, props.style]} 
                style={styles.childrenContainer}
            >
                {props.children}
            </ScrollView>

            <Button 
                label={props.buttonTitle ? props.buttonTitle : 'Aceptar'}
                onPress={() => props.onAccept()}
                style={[styles.button, props.buttonStyle]}
                textStyle={styles.textButton}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    children: {
        alignItems: 'center'
    },
    childrenContainer: {
        marginVertical: 10,
        minWidth: '60%',
        maxWidth: '90%'
    },
    button: {
        backgroundColor: globalStyles.colors.primaryLight,
        borderRadius: 15,
        alignSelf: 'center',
        width: '50%',
        paddingVertical: 10,
    },
    textButton: {
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
        fontSize: 16
    }
})

export default AlertMessage