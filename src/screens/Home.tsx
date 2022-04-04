import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppLogo from '../components/AppLogo'
import Button from '../components/Button'
import DropdownSelect from '../components/DropdownSelect'
import GoHistory from '../components/GoHistory'
import Input from '../components/Input'
import Layout from '../components/Layout'
import SwitchOption from '../components/SwitchOption'
import { globalStyles } from '../styles/globals'
import { Props, ScreenProps } from '../utils/interfaces'
import Ionicicons from 'react-native-vector-icons/Ionicons'
import AlertMessage from '../components/AlertMessage'
import CountriesProvider, { useCountries } from '../context/Countries.context'
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { saveContact } from '../services/Contacts.service'
import { saveMessage, sendMessage } from '../services/Messages.service'
import { SendMessage } from '../models/models'

interface IProps extends ScreenProps, Props {

}

const Home: FC<IProps> = ({ navigation }) => {
    const [showErrors, setShowErrors] = useState(false)

    useEffect(() => {        
        AsyncStorage.getAllKeys()
        .then(res => console.log(res))

        //AsyncStorage.multiRemove(['lastUsed', 'messages'])
    }, [])

    return (
        <CountriesProvider>
            <Layout>
                <AlertMessage 
                    title='Errores'
                    onAccept={() => setShowErrors(false)}
                    visible={showErrors}
                    style={{}}
                >
                    <Text>Errores</Text>
                    <Text>Errores</Text>
                </AlertMessage>
                <AppLogo style={styles.logo}/>
                <Form />
                <GoHistory navigation={navigation}/>
            </Layout>
        </CountriesProvider>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 45
    }
})


interface IFormProps {

}

const Form: FC<IFormProps> = (props) => {
    const { selected } = useCountries()
    const { handleSubmit, control, watch } = useForm()

    const saveContactEnabled = watch('saveContact', true)

    async function send(form: SendMessage) {

        //save contact
        if(form.saveContact){
            await saveContact(form.contactName!, selected!, form.phoneNumber)
        }

        //save message
        if(form.saveMessage){
            await saveMessage(form, selected!)
        }

        //finally send message to whatsapp (we sure that selected is not null through form)
        await sendMessage(selected!, form.phoneNumber, form.message)
    }
    
    return (
        <View style={formStyles.container}>
            <View style={formStyles.inputsContainer}>
                {/* code */}
                <DropdownSelect 
                    label='Código'
                    controlled={{
                        name: 'code',
                        control,
                        defaultValue: selected,
                        rules: {
                            required: !selected ? true : false,
                        }
                    }}
                />

                {/* phone number */}
                <Input 
                    label='Numero de Telefono' 
                    style={formStyles.phoneInput}
                    keyboardType='numeric'
                    containerStyle={{ marginLeft: 5 }}
                    controlled={{
                        name: 'phoneNumber',
                        control,
                        rules: {
                            required: true
                        }
                    }}
                />
            </View>

            <Input 
                label='Mensaje' 
                style={formStyles.messageInput} 
                multiline 
                numberOfLines={7}
                controlled={{
                    name: 'message',
                    control,
                    defaultValue: ''
                }}
            />

            <View style={formStyles.switchesContainer}>
                {/* Save Contact */}
                <SwitchOption 
                    label={'Guardar Contacto'} 
                    textStyle={formStyles.switchText}
                    style={{ marginBottom: saveContactEnabled ? 0 : 5 }}
                    controlled={{
                        name: 'saveContact',
                        control,
                        defaultValue: false
                    }}
                />
                    
                {
                    saveContactEnabled && 
                        <Input 
                            label='Nombre Contacto'
                            style={{ marginBottom: 5 }}
                            controlled={{
                                name: 'contactName',
                                control,
                                rules: {
                                    required: true
                                }
                            }}
                        />
                }

                {/* Save message */}
                <SwitchOption 
                    label={'Guardar Mensaje'} 
                    textStyle={formStyles.switchText}
                    controlled={{
                        name: 'saveMessage',
                        control,
                        defaultValue: false
                    }}
                />
            </View>

            <Button 
                label={'Enviar'} 
                onPress={handleSubmit(send)}
                style={formStyles.button}
                textStyle={formStyles.textButton}
            >
                <Ionicicons name='send' color={'black'} size={20}/>
            </Button>
        </View>
    )
}

const formStyles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputsContainer: {
        flexDirection: 'row',
    },
    phoneInput: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    messageInput: {
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    switchText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    switchesContainer: {
        alignItems: 'center',
        marginTop: 15
    },
    button: {
        backgroundColor: globalStyles.colors.primaryLight,
        borderRadius: 15,
        alignSelf: 'center',
        width: '50%',
        marginTop: 20,
        paddingVertical: 10
    },
    textButton: {
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
        fontSize: 16
    }
})

export default Home