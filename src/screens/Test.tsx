import React, { FC, useEffect, useState, memo } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import Select from '../components/Select'
import { getCountryByCallingCode, getAllCountries } from '../services/Countries.service'
import { Dropdown } from 'react-native-element-dropdown'
import { Country } from '../models/models'
import { globalStyles } from '../styles/globals'
import CountriesService from '../services/CountriesService'
import DeviceCountry from 'react-native-device-country';
import LocalStorageService from '../services/LocalStorageService'

interface IProps {

}

const Test: FC<IProps> = (props) => {
    const [countries, setCountries] = useState<Country[]>([])
    const [country, setCountry] = useState<Country | null>(null)

    useEffect(() => {
        /* LocalStorageService.saveMessage({
            message: 'mensaje de prueba para el local storage service',
            phoneNumber: '78496366',
            country: {
                code: {
                    root: '+5',
                    suffix: '91'
                },
                flag: 'https://flagcdn.com/w320/bo.png',
                name: 'Bolivia' 
            }
        })
        .then(res => console.log(res)) */
    }, [])

    return (
        <View style={{padding: 15}}>
            <Text style={{ backgroundColor: 'pink'}}>Holaa</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'pink',
        width: 50
    },
    select: {
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})

export default Test