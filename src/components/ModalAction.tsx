import React, { FC } from 'react'
import { StyleSheet, Modal } from 'react-native'
import ChooseAction, { ChooseActionProps } from './ChooseAction'

interface IProps extends ChooseActionProps {

}

const ModalAction: FC<IProps> = (props) => {
    return (
        <Modal>
            <ChooseAction 
                condition={props.condition}
                onReject={() => props.onReject()}
                onAccept={() => props.onAccept()}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({})

export default ModalAction