import React, { FC, useState } from 'react'
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import AppLogo from '../components/AppLogo'
import Button from '../components/Button'
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
import { SendMessage } from '../models/models'
import IconButton from '../components/IconButton'
import CountriesDropdown from '../components/CountriesDropdown'
import LocalStorageService from '../services/LocalStorageService'
import ContactsService from '../services/ContactsService'

interface IProps extends ScreenProps, Props {

}

const Home: FC<IProps> = ({ navigation }) => {
    const [showErrors, setShowErrors] = useState(false)

    return (
        <CountriesProvider>
            <Layout>
                <ScrollView>
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
                    <Button 
                        label='Go to Test'
                        onPress={() => navigation.navigate('Test')}
                    />
                </ScrollView>
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
    const { handleSubmit, control, watch, reset } = useForm()

    const saveContactEnabled = watch('saveContact', false)

    function checkPhoneNumber(phoneNumber: string) {
        return phoneNumber.replace(/[^0-9]+/g, '')
    }

    async function sendMessage(message: string, phoneNumber: string) {
        const { code } = selected!
        const checkedPhoneNumber = `${typeof code !== 'string' ? code.root + code.suffix : code}` + checkPhoneNumber(phoneNumber)
        
        await Linking.openURL(`https://wa.me/${checkedPhoneNumber}?text=${message}`)
    }

    async function send(form: any) {
        let formCasted: SendMessage = form
        //save contact
        if(formCasted.saveContact){
            await ContactsService.saveOne(formCasted.contactName!, formCasted.phoneNumber, selected!)
        }

        //save message
        if(formCasted.saveMessage){
            await LocalStorageService.saveMessage({
                message: formCasted.message,
                phoneNumber: formCasted.phoneNumber,
                contactSaved: formCasted.saveContact,
                country: selected!
            })
        }

        //finally send message to whatsapp (we sure that selected is not null through form)
        await sendMessage(formCasted.message, formCasted.phoneNumber)
        reset()
    }
    
    return (
        <View style={formStyles.container}>
            <IconButton 
                icon={<Ionicicons name='reload-circle' color={'black'} size={30}/>}
                onPress={() => reset({}, {
                    keepErrors: true,
                })}
                style={{ alignSelf: 'flex-end', margin: 0 }}
            />

            <View style={formStyles.inputsContainer}>
                {/* code */}
                {/* <DropdownSelect 
                    label='Código'
                    controlled={{
                        name: 'code',
                        control,
                        defaultValue: selected,
                        rules: {
                            required: !selected ? true : false,
                        }
                    }}
                /> */}
                <CountriesDropdown />

                {/* phone number */}
                <Input 
                    label='Número de Telefono' 
                    style={[formStyles.phoneInput, formStyles.inputText]}
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
                style={[formStyles.messageInput, formStyles.inputText]} 
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
                            style={[formStyles.contactInput, formStyles.inputText]}
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
        padding: 20,
        paddingTop: 0
    },
    inputsContainer: {
        flexDirection: 'row',
    },
    phoneInput: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        flexGrow: 1
    },
    messageInput: {
        borderRadius: 15,
        paddingVertical: 10,
        textAlignVertical: 'top'
    },
    inputText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 15,
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
    },
    contactInput: {
        borderRadius: 10,
        marginBottom: 5
    }
})

export default Home