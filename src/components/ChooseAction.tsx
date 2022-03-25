import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Button from './Button'

export interface ChooseActionProps {
    condition: string
    onReject: Function
    onAccept: Function
}

const ChooseAction: FC<ChooseActionProps> = (props) => {
    return (
        <View>
            <Text>{props.condition}</Text>

            <View>
                <Button
                    label='No'
                    onPress={() => props.onReject()}
                />

                <Button
                    label='Si'
                    onPress={() => props.onAccept()}
                />
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default ChooseAction