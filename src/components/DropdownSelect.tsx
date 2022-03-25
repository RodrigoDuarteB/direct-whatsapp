import React, { FC } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Country } from '../models/models'
import { Props } from '../utils/interfaces'
import Input from './Input'

interface IProps extends Props {
    label: string
    onSelect: (selected: Country) => void
}

const DropdownSelect: FC<IProps> = (props) => {
    return (
        <View>
            <View>
                <View>
                    <Text>{props.label}</Text>
                    {/* <Icon /> (flag) */}
                </View>
                {/* <Icon /> (arrow) */}
            </View>

            <CountriesDropdown />
        </View>
    )
}

const styles = StyleSheet.create({})


interface ICountryBadgeProps {
    country: Country
    onPress: Function
    selected?: boolean
}

const CountryBadge: FC<ICountryBadgeProps> = ({ country }) => {
    return (
        <TouchableOpacity>
            <View>
                {/* Icon */}
                <Text>{country.code}</Text>
            </View>

            <Text>{country.name}</Text>
        </TouchableOpacity>
    )
}

const countryBadgeStyles = StyleSheet.create({})


interface ICountriesListProps {

}

const CountriesList: FC<ICountriesListProps> = (props) => {

    const countries: Array<Country> = []
    return (
        <View>
            {
                countries.length > 0 ?
                <View>
                    <View>
                        <Text>Código</Text>
                        <Text>Nombre</Text>
                    </View>

                    {
                        countries.map((country, index) => 
                            <CountryBadge 
                                key={index}
                                country={country}
                                onPress={() => {}}
                            />    
                        )
                    }
                </View>
                :
                <Text>No se encontraron Resultados. Ingresa el código manualmente en el cuadro de texto</Text>
            }
        </View>
    ) 
}

const countriesListStyles = StyleSheet.create({})



interface ICountriesDropdownProps {

}

const CountriesDropdown: FC<ICountriesDropdownProps> = (props) => {
    return (
        <View>
            <Input />
            <CountriesList />
        </View>
    )
}

const countriesDropdownStyles = StyleSheet.create({})

export default DropdownSelect