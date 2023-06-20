import React, { FC, useEffect, useState, memo } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import Select from '../components/Select'
import { getCountryByCallingCode, getAllCountries } from '../services/Countries.service'
import { Dropdown } from 'react-native-element-dropdown'
import { Country } from '../models/models'
import { globalStyles } from '../styles/globals'
import CountriesService from '../services/CountriesService'
import DeviceCountry from 'react-native-device-country';

interface IProps {

}

const Test: FC<IProps> = (props) => {
    const [countries, setCountries] = useState<Country[]>([])
    const [country, setCountry] = useState<Country | null>(null)

    useEffect(() => {
        DeviceCountry.getCountryCode('any')
        .then(res => {
            CountriesService.getOneByCode('c')
            .then(res => console.log(res))
        })

        CountriesService.getAll()
        .then(res => {
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
                    backgroundColor: globalStyles.colors.secondary,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderColor: globalStyles.colors.primaryLight
                }}
                renderItem={(item) => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray'
                        }}>
                            <View style={{
                                width: '50%',
                                flexDirection: 'row',
                                paddingLeft: '10%',
                                alignItems: 'center'
                            }}>
                                <Image 
                                    source={{ uri: item.flag }} 
                                    style={{
                                        width: 30,
                                        height: 20
                                    }}
                                />
                            </View>

                            <View style={{
                                width: '50%',
                                paddingLeft: '10%',
                            }}>
                                <Text style={{ 
                                    color: country?.name == item.name ? 'black' : 'white',
                                    textAlign: 'left' 
                                }}
                                    >
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    )
                }}
                containerStyle={{
                    maxHeight: 320,
                    backgroundColor: globalStyles.colors.secondary,
                    width: 230,
                    shadowColor: globalStyles.colors.primary,
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowOpacity: 0.27,
                    elevation: 8,
                    borderRadius: 10,
                    borderTopLeftRadius: 0
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