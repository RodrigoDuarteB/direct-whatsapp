import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import Layout from '../components/Layout'
import MessageBadge from '../components/MessageBadge'
import SwitchOption from '../components/SwitchOption'
import { Message } from '../models/models'
import { ScreenProps } from '../utils/interfaces'

interface IProps extends ScreenProps {

}

const History: FC<IProps> = (props) => {
    return (
        <Layout>
            <View>
                <Text>Historial de Mensajes</Text>
                {/* IconButton */}
            </View>

            <SwitchOption 
                label='Sincronizar con la nube (Proximamente)'
                onChange={() => {}}
            />

            <MessagesList />
        </Layout>
    )
}

const styles = StyleSheet.create({})



interface IMessagesListProps {

}

const MessagesList: FC<IMessagesListProps> = (props) => {
    const data: Array<Message> = []

    return (
        <View>
            {
                data.length > 0 ?
                <View>
                    <Button 
                        label='Limpiar Historial'
                        onPress={() => {}}
                    />

                    <View>
                        {
                            data.map((message, index) => 
                                <MessageBadge 
                                    key={index}
                                    message={message}
                                />
                            )
                        }
                    </View>
                </View>
                :
                <Text>No hay mensajes Guardados</Text>
            }
        </View>
    )
}

const messagesListStyles = StyleSheet.create({})
export default History