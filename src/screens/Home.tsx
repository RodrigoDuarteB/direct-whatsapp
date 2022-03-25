import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppLogo from '../components/AppLogo'
import Button from '../components/Button'
import DropdownSelect from '../components/DropdownSelect'
import GoHistory from '../components/GoHistory'
import Input from '../components/Input'
import Layout from '../components/Layout'
import SwitchOption from '../components/SwitchOption'
import { Country } from '../models/models'
import { Props, ScreenProps } from '../utils/interfaces'
import Icon from 'react-native-vector-icons/AntDesign'

interface IProps extends ScreenProps, Props {

}

const Home: FC<IProps> = ({ navigation }) => {
    return (
        <Layout>
            <Icon name='left' size={30} color="#900"/>
            <AppLogo />
            <Form />
            <GoHistory navigation={navigation}/>
        </Layout>
    )
}

const styles = StyleSheet.create({})

interface IFormProps {

}

const Form: FC<IFormProps> = (props) => {
    return (
        <View>
            <View>
                {/* code */}
                <DropdownSelect 
                    label='Código'
                    onSelect={function (selected: Country): void {
                        throw new Error('Function not implemented.')
                    }}
                />
                {/* phone number */}
                <Input />
            </View>

            <Input />

            <View>
                {/* Save Contact */}
                <SwitchOption label={'Guardar Contacto'} onChange={function (value: boolean): void {
                    throw new Error('Function not implemented.')
                } } />

                {/* Save message */}
                <SwitchOption label={'Guardar Mensaje'} onChange={function (value: boolean): void {
                    throw new Error('Function not implemented.')
                } } />
            </View>

            <Button label={'Enviar'} onPress={() => {}} />
        </View>
    )
}

const formStyles = StyleSheet.create({})

export default Home