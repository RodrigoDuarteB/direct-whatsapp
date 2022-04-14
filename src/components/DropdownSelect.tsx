import React, { FC, memo, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { Country } from '../models/models'
import { globalStyles } from '../styles/globals'
import { ControlledInput, Props } from '../utils/interfaces'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Divider from './Divider'
import { useCountries } from '../context/Countries.context'
import CountryCode from './CountryCode'
import { Controller } from 'react-hook-form'
import InputErrorText from './InputErrorText'
import CodeFilter from './CodeFilter'

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
                                selected && selected.flag ? 
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
            style={[
                countryBadgeStyles.container,
                selected && countryBadgeStyles.selected
            ]}
            onPress={() => onPress()}
        >
            <View style={[countryBadgeStyles.flagContainer]}>
                {/* flag */}
                <Image source={{uri: country.flag}} style={countryBadgeStyles.flag}/>

                {/* name */}
                <Text style={[countryBadgeStyles.text, {color: selected ? 'black' : 'white', marginLeft: 3}]}>
                    {typeof code !== 'string' ? `${code.root}(${code.suffix})` : code}
                </Text>
            </View>

            <View style={countryBadgeStyles.nameContainer}>
                <Text style={[countryBadgeStyles.text, {color: selected ? 'black' : 'white'}]}>{country.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const countryBadgeStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    selected: {
        borderWidth: 2,
        borderColor: globalStyles.colors.primaryLight,
        borderBottomColor: globalStyles.colors.primaryLight,
        backgroundColor: '#c4c4c4'
    },
    text: {
        fontWeight: '600',
        fontSize: 15
    },
    flag: {
        width: 30,
        height: 20
    },
    flagContainer: {
        width: '50%',
        flexDirection: 'row',
        paddingLeft: '10%',
        alignItems: 'center'
    },
    nameContainer: {
        width: '50%',
        paddingLeft: '10%',
    }
})


interface ICountriesListProps {
    countries: Array<Country>
}

const CountriesList: FC<ICountriesListProps> = memo(({ countries }) => {
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

                    <FlatList 
                        data={countries}
                        renderItem={({ item, index }) => 
                            <CountryBadge 
                                key={index}
                                country={item}
                                onPress={() => {
                                    setSelected(item)
                                }}
                                selected={item.name === selected!.name}
                            />
                        }
                        style={{ height: 200 }}
                        initialNumToRender={10}
                    />
                </View>
                :
                <Text style={countriesListStyles.text}>
                    No se encontraron Resultados. Ingresa el código manualmente en el cuadro de texto
                </Text>
            }
        </View>
    ) 
}, (prev, curr) => prev.countries.length === curr.countries.length)

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

const CountriesDropdown: FC<ICountriesDropdownProps> = memo((props) => {
    const { countries } = useCountries()
    const [filteredCountries, setFilteredCountries] = useState(countries)

    function filterCountries(value: string) {
        setFilteredCountries(countries.filter(country => 
            country.name.toLowerCase().includes(value.toLowerCase()) ||
            country.code.toString().includes(value.toLowerCase())
        ))
    }
    
    return (
        <View 
            style={countriesDropdownStyles.container}
        >
            <CodeFilter onFilter={filterCountries}/>
            <CountriesList countries={filteredCountries}/>
        </View>
    )
})

const countriesDropdownStyles = StyleSheet.create({
    container: {
        maxHeight: 320,
        backgroundColor: globalStyles.colors.secondary,
        position: 'absolute',
        zIndex: 1,
        top: 75,
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
    }
})

export default DropdownSelect