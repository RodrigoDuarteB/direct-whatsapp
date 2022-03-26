import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import AppLogo from '../components/AppLogo'
import Button from '../components/Button'
import DropdownSelect from '../components/DropdownSelect'
import GoHistory from '../components/GoHistory'
import Input from '../components/Input'
import Layout from '../components/Layout'
import SwitchOption from '../components/SwitchOption'
import { Country } from '../models/models'
import { globalStyles } from '../styles/globals'
import { Props, ScreenProps } from '../utils/interfaces'
import Ionicicons from 'react-native-vector-icons/Ionicons'

interface IProps extends ScreenProps, Props {

}

const Home: FC<IProps> = ({ navigation }) => {
    return (
        <Layout>
            <AppLogo style={styles.logo}/>
            <Form />
            <GoHistory navigation={navigation}/>
        </Layout>
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
    return (
        <View style={formStyles.container}>
            <View style={formStyles.inputsContainer}>
                {/* code */}
                <DropdownSelect 
                    label='Código'
                    onSelect={function (selected: Country): void {
                        throw new Error('Function not implemented.')
                    }}
                />
                {/* phone number */}
                <Input 
                    label='Numero de Telefono' 
                    style={formStyles.phoneInput}
                    keyboardType='numeric'
                    containerStyle={{ marginLeft: 5 }}
                />
            </View>

            <Input label='Mensaje' style={formStyles.messageInput} multiline numberOfLines={7}/>

            <View style={formStyles.switchesContainer}>
                {/* Save Contact */}
                <SwitchOption 
                    label={'Guardar Contacto'} 
                    onChange={(value) => {}} 
                    textStyle={formStyles.switchText}
                    style={{ marginBottom: 5 }}
                />

                {/* Save message */}
                <SwitchOption 
                    label={'Guardar Mensaje'} 
                    onChange={(value) => {}} 
                    textStyle={formStyles.switchText}
                />
            </View>

            <Button 
                label={'Enviar'} 
                onPress={() => {}}
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