import React, { FC, useEffect, useState, memo } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import Select from '../components/Select'
import { getCountryByCallingCode, getAllCountries } from '../services/Countries.service'
import { Dropdown } from 'react-native-element-dropdown'
import { Country } from '../models/models'

interface IProps {

}

const Test: FC<IProps> = (props) => {
    const [countries, setCountries] = useState<Country[]>([])
    const [country, setCountry] = useState<Country | null>(null)

    useEffect(() => {
        /* getCountryByCallingCode('1212')
        .then(res => console.log(res)) */
        getAllCountries()
        .then(res => {
            console.log(res)
            setCountries(res)
        })
    }, [])

    const _renderItem = (info: any) => {
        return (
            <Text key={info.item} style={{ color: 'black' }}>{info.item}</Text>
        )
    }

    return (
        <View style={{padding: 15}}>
            <Dropdown 
                data={countries}
                labelField='name'
                valueField='idd'
                onChange={(item) => setCountry(item)}
                style={{
                    backgroundColor: 'black'
                }}
                renderItem={(country) => {
                    return (
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Image 
                                source={{ uri: country.flag }} 
                                style={{
                                    width: 20,
                                    height: 15
                                }}
                            />
                            <Text style={{ color: 'black'}}>{country.name}</Text>
                        </View>
                    )
                }}
                value={country}
                renderLeftIcon={() => {
                    return (
                        <Image 
                            source={{ uri: country?.flag }}
                            style={{
                                width: 20,
                                height: 15
                            }}
                        /> 
                    )
                }}
                search
            />
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