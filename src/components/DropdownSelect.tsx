import React, { FC, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Country } from '../models/models'
import { globalStyles } from '../styles/globals'
import { Props } from '../utils/interfaces'
import Input from './Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Divider from './Divider'

interface IProps extends Props {
    label: string
    onSelect: (selected: Country) => void
}

const DropdownSelect: FC<IProps> = (props) => {
    const [downed, setDowned] = useState(false)

    const country: Country = {
        code: '+51',
        name: 'Argentina'
    }

    return (
        <View>
            <Text>{props.label}</Text>
            
            <TouchableOpacity 
                style={[styles.subcontainer, props.style]}
                onPress={() => setDowned(!downed)}
            >
                <View>
                    <Text>{country.code}</Text>
                    <MaterialCommunityIcons name='diving-scuba-flag' color={'white'} size={20}/>
                </View>
                
                <MaterialIcons name={ downed ? 'expand-less' : 'expand-more' } color={'white'} size={20}/>
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
        borderBottomLeftRadius: 15
    }
})


interface ICountryBadgeProps {
    country: Country
    onPress: Function
    selected?: boolean
}

const CountryBadge: FC<ICountryBadgeProps> = ({ country, selected }) => {
    return (
        <TouchableOpacity
            style={[countryBadgeStyles.container, { backgroundColor: selected ? '#c4c4c4' : '' }]}
        >
            <View style={countryBadgeStyles.flagCode}>
                <MaterialCommunityIcons name='diving-scuba-flag' color={'white'} size={20}/>
                <Text style={[countryBadgeStyles.text, {color: selected ? 'black' : 'white', marginLeft: 3}]}>
                    {country.code}
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
    }
})


interface ICountriesListProps {

}

const CountriesList: FC<ICountriesListProps> = (props) => {

    const countries: Array<Country> = [
        { code: '+591', name: 'Bolivia' },
        { code: '+51', name: 'Argentina' }
    ]
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

                    {
                        countries.map((country, index) => 
                            <CountryBadge 
                                key={index}
                                country={country}
                                onPress={() => {}}
                                selected={index === 1}
                            />    
                        )
                    }
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

}

const CountriesDropdown: FC<ICountriesDropdownProps> = (props) => {
    return (
        <View style={countriesDropdownStyles.container}>
            <Input 
                style={countriesDropdownStyles.input}
                placeholder='Busca por nombre o codigo'
            />
            <CountriesList />
        </View>
)
}

const countriesDropdownStyles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colors.secondary,
        position: 'absolute',
        zIndex: 1,
        top: 73,
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