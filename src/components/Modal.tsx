import React, { FC } from 'react'
import { Modal as NativeModal , ModalProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { globalStyles } from '../styles/globals'

interface IProps extends ModalProps {
    containerStyle?: StyleProp<ViewStyle>
}

const Modal: FC<IProps> = (props) => {
    return (
        <NativeModal
            transparent
            {...props}
        >
            <View style={[styles.modalContainer, props.containerStyle]}>
                <View style={[styles.content, props.style]}>
                    {props.children}
                </View>
            </View>
        </NativeModal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flexGrow: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: globalStyles.colors.secondary,
        alignSelf: 'center',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        shadowColor: globalStyles.colors.primaryLight,
        minWidth: '60%',
        minHeight: '30%',
        maxHeight: '60%',
        maxWidth: '90%'
    },
})

export default Modal