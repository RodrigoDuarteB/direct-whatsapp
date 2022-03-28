import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import IconButton from '../components/IconButton'
import Layout from '../components/Layout'
import MessageBadge from '../components/MessageBadge'
import SwitchOption from '../components/SwitchOption'
import { Message } from '../models/models'
import { ScreenProps } from '../utils/interfaces'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface IProps extends ScreenProps {

}

const History: FC<IProps> = ({ navigation }) => {
    return (
        <Layout style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Historial de Mensajes</Text>
                <IconButton 
                    onPress={() => navigation.goBack()}
                    icon={<MaterialCommunityIcons name='arrow-expand-left' color={'black'} size={30}/>}
                />
            </View>

            <SwitchOption 
                label='Sincronizar con la nube (Proximamente)'
                onChange={() => {}}
            />

            <MessagesList />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    }
})



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