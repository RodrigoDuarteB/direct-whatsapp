import React, { FC, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Message } from '../models/models'
import { globalStyles } from '../styles/globals'
import { Props } from '../utils/interfaces'
import Badge from './Badge'
import ChooseAction from './ChooseAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconButton from './IconButton'

interface IProps extends Props {
    message: Message
    onDelete: Function
}

const MessageBadge: FC<IProps> = ({ message, style, onDelete }) => {
    const { country, datetime, phoneNumber } = message
    const { code: { root, suffix } } = country
    const [deleting, setDeleting] = useState(false)

    return (
        <View style={[styles.container, style]}>
            {
                !deleting ?
                <View>
                    <View style={styles.header}>
                        <Text>Enviado a:</Text>

                        <Text>
                            {datetime.toLocaleString()}
                        </Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        <View>
                            <Badge style={styles.badgeCountry}>
                                {
                                    country.flag ? 
                                    <Image source={{ uri: country.flag }} style={styles.flag}/>
                                    :
                                    <MaterialCommunityIcons name='diving-scuba-flag' color={'white'} size={20}/>
                                }
                                <Text style={styles.countryText}>
                                    {`${root+suffix} ${phoneNumber} `}
                                </Text>

                                <Text style={styles.countryText}>{country.name}</Text>
                            </Badge>

                            <Text style={{ marginBottom: 5 }}>Mensaje:</Text>
                            <Badge>
                                <ScrollView>
                                    <Text style={styles.messageText}>{message.message}</Text>
                                </ScrollView>
                            </Badge>

                            <Text>
                                {
                                    message.contactSaved ? 'Guardaste el contacto' : 'No guardaste el contacto'
                                }
                            </Text>
                        </View>

                        <IconButton
                            icon={<MaterialCommunityIcons name='delete' size={30}/>}
                            onPress={() => setDeleting(true)}
                            style={{ alignSelf: 'center' }}
                        />
                    </View>
                </View>
            :
                <ChooseAction 
                    condition='Estás seguro que deseas eliminar este mensaje?'
                    onReject={() => setDeleting(false)}
                    onAccept={() => {
                        onDelete()
                        setDeleting(false)
                    }}
                />
            }
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        height: 160
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    bodyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    badgeCountry: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    messageText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    countryText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flag: {
        width: 20,
        height: 15
    }
})

export default MessageBadge