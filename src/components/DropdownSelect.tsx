import React, { FC, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import { Country } from '../models/models'
import { globalStyles } from '../styles/globals'
import { ControlledInput, Props } from '../utils/interfaces'
import Input from './Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Divider from './Divider'
import { useCountries } from '../context/Countries.context'
import CountryCode from './CountryCode'
import { Controller } from 'react-hook-form'
import InputErrorText from './InputErrorText'

interface IProps extends Props, ControlledInput {
    label: string
    onSelect?: Function
}

const DropdownSelect: FC<IProps> = ({ label, controlled, style }) => {
    const { selected } = useCountries()
    const [downed, setDowned] = useState(false)

    return controlled ? (
        <Controller
            {...controlled}
            render={({ formState: { errors } }) => (
                <View>
                    <Text style={styles.label}>
                        {label} {errors[controlled.name] && <InputErrorText />}
                    </Text>
                    
                    <TouchableOpacity 
                        style={[styles.subcontainer, { borderWidth: downed ? 1 : 0 }, style]}
                        onPress={() => setDowned(!downed)}
                    >
                        <View style={styles.flagCodeContainer}>
                            <CountryCode />
                            {
                                selected ? 
                                <Image source={{ uri: selected.flag }} style={styles.flag}/>
                                :
                                <MaterialCommunityIcons name='diving-scuba-flag' color={'white'} size={20}/>
                            }
                        </View>
                        
                        <MaterialIcons 
                            name={ downed ? 'expand-less' : 'expand-more' } 
                            color={'white'} 
                            size={20}
                            style={{ alignSelf: 'flex-end' }}
                        />
                    </TouchableOpacity>

                    {downed && <CountriesDropdown />}
                </View>
            )}
        />
    ) : (
        <View>
            <Text style={styles.label}>{label}</Text>
            
            <TouchableOpacity 
                style={[styles.subcontainer, { borderWidth: downed ? 1 : 0 }, style]}
                onPress={() => setDowned(!downed)}
            >
                <View style={styles.flagCodeContainer}>
                    <CountryCode />
                    {
                        selected ? 
                        <Image source={{ uri: selected.flag }} style={styles.flag}/>
                        :
                        <MaterialCommunityIcons name='diving-scuba-flag' color={'white'} size={20}/>
                    }
                </View>
                
                <MaterialIcons 
                    name={ downed ? 'expand-less' : 'expand-more' } 
                    color={'white'} 
                    size={20}
                    style={{ alignSelf: 'flex-end' }}
                />
            </TouchableOpacity>

            {downed && <CountriesDropdown />}
        </View>
    )
}

const styles = StyleSheet.create({
    subcontainer: {
        backgroundColor: globalStyles.colors.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderColor: globalStyles.colors.primaryLight
    },
    flag: {
        width: 20,
        height: 15
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    flagCodeContainer: {
        alignItems: 'center'
    }
})


interface ICountryBadgeProps {
    country: Country
    onPress: Function
    selected?: boolean
}

const CountryBadge: FC<ICountryBadgeProps> = ({ country, selected, onPress }) => {
    const { code } = country
    return (
        <TouchableOpacity
            style={[countryBadgeStyles.container, { backgroundColor: selected ? '#c4c4c4' : '' }]}
            onPress={() => onPress()}
        >
            <View style={countryBadgeStyles.flagCode}>
                {/* flag */}
                <Image source={{uri: country.flag}} style={countryBadgeStyles.flag}/>

                {/* name */}
                <Text style={[countryBadgeStyles.text, {color: selected ? 'black' : 'white', marginLeft: 3}]}>
                    {code.root+(code.suffix)}
                </Text>
            </View>

            <Text style={[countryBadgeStyles.text, {color: selected ? 'black' : 'white'}]}>{country.name}</Text>
        </TouchableOpacity>
    )
}

const countryBadgeStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 4
    },
    flagCode: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        fontWeight: '600',
        fontSize: 15
    },
    flag: {
        width: 20,
        height: 20
    }
})


interface ICountriesListProps {
    countries: Array<Country>
}

const CountriesList: FC<ICountriesListProps> = ({ countries }) => {
    const { selected, setSelected } = useCountries()

    return (
        <View style={countriesListStyles.container}>
            {
                countries.length > 0 ?
                <View>
                    <View style={countriesListStyles.headerTable}>
                        <Text style={countriesListStyles.headerText}>Código</Text>
                        <Text style={countriesListStyles.headerText}>Nombre</Text>
                    </View>

                    <Divider style={countriesListStyles.divider}/>
                
                    <ScrollView
                        style={{ height: 200 }}
                    >
                    {
                        countries.map((country, index) => 
                            <CountryBadge 
                                key={index}
                                country={country}
                                onPress={() => {
                                    setSelected(country)
                                }}
                                selected={country.name === selected?.name}
                            />    
                        )
                    }
                    </ScrollView>
                </View>
                :
                <Text style={countriesListStyles.text}>
                    No se encontraron Resultados. Ingresa el código manualmente en el cuadro de texto
                </Text>
            }
        </View>
    ) 
}

const countriesListStyles = StyleSheet.create({
    container: {
    },
    text: {
        padding: 10,
        textAlign: 'center'
    },
    headerTable: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headerText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    },
    divider: {
        borderBottomColor: 'white',
        marginHorizontal: 20,
        marginVertical: 5       
    }
})



interface ICountriesDropdownProps {
    children?: any
}

const CountriesDropdown: FC<ICountriesDropdownProps> = (props) => {
    const { countries } = useCountries()
    const [filteredCountries, setFilteredCountries] = useState(countries)

    function filterCountries(value: string) {
        setFilteredCountries(filteredCountries.filter(country => 
            country.name.toLowerCase().includes(value.toLowerCase()) ||
            country.code.toString().includes(value.toLowerCase())
        ))
    }
    
    return (
        <View 
            style={countriesDropdownStyles.container}
        >
            <Input 
                style={countriesDropdownStyles.input}
                placeholder='Busca por nombre o codigo'
                onChangeText={filterCountries}
            />
            <CountriesList countries={filteredCountries}/>
        </View>
    )
}

const countriesDropdownStyles = StyleSheet.create({
    container: {
        maxHeight: 320,
        backgroundColor: globalStyles.colors.secondary,
        position: 'absolute',
        zIndex: 1,
        top: 81,
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
    },
    input: {
        backgroundColor: globalStyles.colors.secondaryLight,
        margin: 10,
        borderRadius: 15,
        paddingHorizontal: 10
    }
})

export default DropdownSelect