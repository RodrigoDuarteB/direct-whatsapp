import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Button from '../components/Button'
import IconButton from '../components/IconButton'
import Layout from '../components/Layout'
import MessageBadge from '../components/MessageBadge'
import SwitchOption from '../components/SwitchOption'
import { Message } from '../models/models'
import { Props, ScreenProps } from '../utils/interfaces'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Disabled from '../components/Disabled'
import { globalStyles } from '../styles/globals'
import AlertChooseAction from '../components/AlertChooseAction'
import { getMessages, removeMessage, removeMessages } from '../services/Messages.service'

interface IProps extends ScreenProps {

}

const History: FC<IProps> = ({ navigation }) => {
    
    return (
        <Layout style={styles.container}>
            {/* <ScrollView> */}

            
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Historial de Mensajes</Text>
                <IconButton 
                    onPress={() => navigation.goBack()}
                    icon={<MaterialCommunityIcons name='arrow-expand-left' color={'black'} size={30}/>}
                />
            </View>

            <Disabled style={styles.switch}>
                <SwitchOption 
                    label='Sincronizar con la nube (Proximamente)'
                    onChange={() => {}}
                    textStyle={{ color: 'black', fontSize: 15 }}
                />
            </Disabled>

            <MessagesList />
            {/* </ScrollView> */}
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
    },
    switch: {
        alignSelf: 'center',
        marginVertical: 8
    }
})



interface IMessagesListProps extends Props{

}

const MessagesList: FC<IMessagesListProps> = (props) => {
    const [messages, setMessages] = useState<Array<Message>>([])
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        getMessages()
        .then(res => setMessages(res))
    }, [deleting])

    return (
        <View style={[messagesListStyles.container, { justifyContent: messages.length > 0 ? 'flex-start' : 'center'}, props.style]}>

            <AlertChooseAction 
                visible={deleting}
                condition='Está seguro que desea limpiar el historial?'
                onAccept={async () => {
                    await removeMessages()
                    setDeleting(false)
                }}
                onReject={() => {
                    setDeleting(false)
                }}
            />
            {
                messages.length > 0 ?
                <View style={messagesListStyles.subcontainer}>
                    <Button 
                        label='Limpiar Historial'
                        onPress={() => setDeleting(true)}
                        style={messagesListStyles.button}
                        textStyle={messagesListStyles.buttonText}
                    >
                        <MaterialCommunityIcons name='delete-clock' color={'black'} size={27}/>
                    </Button>
                    
                    <FlatList 
                        data={messages}
                        renderItem={({ item, index }) => 
                            <MessageBadge 
                                key={index}
                                message={item}
                                style={{ marginBottom: index < messages.length - 1 ? 9 : 0 }}
                                onDelete={() => {
                                    removeMessage(item.id)
                                    .then(_ => {
                                        getMessages()
                                        .then(res => setMessages(res))
                                    })
                                }}
                            />
                        }
                        style={messagesListStyles.list}
                    />

                </View>
                :
                <Text style={messagesListStyles.textOnEmpty}>No hay mensajes Guardados</Text>
            }
        </View>
    )
}

const messagesListStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    textOnEmpty: {
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: globalStyles.colors.primaryLight,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 25,
        width: '50%',
        marginVertical: 5,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
    },
    subcontainer: {
        justifyContent: 'center',
        flex: 1
    },
    list: {
        paddingVertical: 5,
    }
})
export default History