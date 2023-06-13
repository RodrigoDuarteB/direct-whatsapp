import React, { FC, memo } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Country } from '../models/models'
import { useCountries } from '../context/Countries.context'
import { globalStyles } from '../styles/globals'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface IProps {
    onSelect?: (selected: Country) => void
}

const CountriesDropdown: FC<IProps> = ({ onSelect }) => {
    const { countries, selected, setSelected } = useCountries()
    return (
        <View>
            <Text style={styles.label}>Código</Text>
            <Dropdown<Country> 
                data={countries}
                value={selected}
                labelField='name'
                valueField='idd'
                onChange={(country) => {
                    onSelect && onSelect(country)
                    setSelected(country)
                }}
                renderItem={(country, selected) => 
                    <CountryItem 
                        country={country} 
                        selected={selected} 
                        key={country.idd.root}
                    />
                }
                style={styles.input}
                containerStyle={styles.itemsContainer}
                renderLeftIcon={() => {
                    return selected ? (
                        <View>
                            <Text>{selected.idd.root}</Text>
                            <Image source={{ uri: selected.flag }} style={styles.flag}/>        
                        </View>
                    ) : (
                        <MaterialCommunityIcons name='diving-scuba-flag' color={'white'} size={20} style={{ marginHorizontal: 5 }}/>
                    )
                }}
                renderRightIcon={(visible) => 
                    <MaterialIcons 
                        name={ visible ? 'expand-less' : 'expand-more' } 
                        color={'white'} 
                        size={20}
                    />
                }
                search
                selectedTextStyle={{ color: 'white' }}
                inputSearchStyle={styles.searchInput}
                flatListProps={{
                    initialNumToRender: 9,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: globalStyles.colors.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderColor: globalStyles.colors.primaryLight
    },
    itemsContainer: {
        maxHeight: 300,
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
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        top: '0.5%',
        borderColor: globalStyles.colors.secondary
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    flag: {
        width: 25,
        height: 18,
        marginHorizontal: 5
    },
    searchInput: {
        backgroundColor: globalStyles.colors.secondaryLight,
        borderRadius: 15,
    }
})

export default CountriesDropdown

//CountryItem
interface ICountryItemProps {
    country: Country
    selected?: boolean
}

const CountryItem: FC<ICountryItemProps> = memo(({ country, selected }) => {
    return (
        <View style={countryItemStyles.container}>
            <View style={countryItemStyles.imageContainer}>
                <Image source={{ uri: country.flag }} style={countryItemStyles.flag}/>
            </View>

            <View style={countryItemStyles.nameContainer}>
                <Text style={[countryItemStyles.name, {
                    color: selected ? 'black' : 'white'
                }]}>
                    { country.name }
                </Text>
            </View>
        </View>
    )
})

const countryItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    imageContainer: {
        width: '30%',
        flexDirection: 'row',
        paddingLeft: '10%',
        alignItems: 'center'
    },
    flag: {
        width: 30,
        height: 20
    },
    nameContainer: {
        paddingLeft: '10%',
        flexGrow: 1,
    },
    name: {
        textAlign: 'left',
        paddingRight: 80
    }
})