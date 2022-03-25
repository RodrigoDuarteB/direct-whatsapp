import React, { FC, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Message } from '../models/models'
import Badge from './Badge'
import ChooseAction from './ChooseAction'

interface IProps {
    message: Message
}

const MessageBadge: FC<IProps> = ({ message }) => {
    const [deleting, setDeleting] = useState(false)

    return !deleting ? (
        <View>
            <View>
                <Text>Enviado a:</Text>
                <Text>{message.datetime.toLocaleDateString()}</Text>
            </View>

            <View>
                <View>
                    <Badge>
                        {/* Icon */}
                        <Text>{message.country.code}</Text>
                        <Text>{message.country.name}</Text>
                    </Badge>

                    <Text>Mensaje:</Text>
                    <Badge>
                        <Text>{message.message}</Text>
                    </Badge>

                    <Text>
                        {
                            message.contactSaved ? 'Guardaste el contacto' : 'No guardaste el contacto'
                        }
                    </Text>
                </View>

                {/* Icon */}
            </View>
        </View>
    ) : 
    <ChooseAction 
        condition='Estás seguro que deseas eliminar este mensaje?'
        onReject={() => {}}
        onAccept={() => {}}
    />
}

const styles = StyleSheet.create({})

export default MessageBadge