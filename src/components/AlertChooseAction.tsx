import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import ChooseAction, { ChooseActionProps } from './ChooseAction'
import Modal from './Modal'

interface IProps extends ChooseActionProps {
    visible?: boolean
}

const AlertChooseAction: FC<IProps> = (props) => {
    return (
        <Modal
            visible={props.visible}
            onRequestClose={() => props.onReject()}
            animationType='fade'
        >
            <ChooseAction 
                {...props}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({})

export default AlertChooseAction