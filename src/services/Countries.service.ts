import DeviceCountry from 'react-native-device-country';
import { Country } from '../models/models';
import axios, { AxiosRequestConfig } from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS = {
    VERSIONS: {
        '2': 'v2',
        '3.1': 'v3.1'
    },
}

const ENDPOINTS = {
    all: 'all',
    code: 'alpha',
    callingCode: 'callingcode'
}

const URL = 'https://restcountries.com'

const config: AxiosRequestConfig = {}


/**
 * Takes the name, idd and flag of each country of REST countries API
 * @returns {Array<Country>} all the countries of the REST countries API
 */
export async function getAllCountries(): Promise<Array<Country>> {
    let countries: Array<Country> = []
    try {
        const list = await axios.get<Array<any>>(`${URL}/${SETTINGS.VERSIONS['3.1']}/${ENDPOINTS.all}`, {
            ...config,
            params: {
                fields: 'name,idd,flags'
            }
        })
    
        countries = list.data.map(({ name, idd, flags }) => {
            return {
                name: name.common,
                code: {
                    root: idd.root,
                    suffix: idd.suffixes[0]
                },
                idd,
                flag: flags.png ? flags.png : flags.svg
            } as Country
        }).sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
        
    }
    return countries
}


/**
 * Search a country by the code given in REST Countries API
 * @param code the country code to be searched
 * @returns the country if exists, then null
 */
async function getCountryByCode(code: string): Promise<Country | null>{
    try {
        const country = await axios.get(`${URL}/${SETTINGS.VERSIONS['3.1']}/${ENDPOINTS.code}/${code}`, {
            ...config
        })
        const data = country.data
        if(data && data.length > 0){
            const { name, idd, flags } = data[0]
            return {
                name: name.common,
                code: {
                    root: idd.root,
                    suffix: idd.suffixes[0]
                },
                idd,
                flag: flags.png ? flags.png : flags.svg
            }
        }
        return null 
    } catch (error) {
        return null
    }
}

/**
 * Searchs a country by the calling root code on REST countries API
 * @param code the calling root code to search (without suffix)
 * @returns the country of the root code or null if not found
 */
export async function getCountryByCallingCode(code: 'string'): Promise<Country> {
    /* try {
        const country = await axios.get(`${URL}/${SETTINGS.VERSIONS[2]}/${ENDPOINTS.callingCode}/${code}`)
        const { data } = country
        if(data && data.length > 0){
            const { nativeName, flags, callingCodes } = data[0]
            return {
                name: nativeName,
                flag: flags.png ? flags.png : flags.svg,
                code: callingCodes[0],
                idd: {
                    root: '',
                    suffixes: []
                }
            }
        }
    } catch (error) {
        
    }
    return null */
    let country: Country = {
        code,
        flag: '',
        idd: {
            root: '',
            suffixes: []
        },
        name: ''
    }
    try {
        const countries = await getAllCountries()
        const found = countries.find(country => {
            const countryCode: any = country.code
            const joined = countryCode.root + countryCode.suffix
            return joined === code
        })
        if(found){
            country = found
        }
    } catch (error) {
        return country
    }
    return country
}


/**
 * Save the current selected country of the context in local storage
 * @param {Country | null} selected the current selected country of the context
 */
export async function saveLastUsed(selected: Country | null) {
    if(selected){
        await AsyncStorage.setItem('lastUsed', JSON.stringify(selected))
    }
}


/**
 * sets the selected country of the context, if last used exists is setted, otherwise by the country device if can be detected, then null
 * @param setSelected the function that sets the selected country in the context
 */
export async function setSelectedCountry(setSelected: (country: Country | null) => void){
    const lastUsed = await AsyncStorage.getItem('lastUsed')
    // if last used object exists, is setted
    if(lastUsed){
        setSelected(JSON.parse(lastUsed))
    }else{
        try {
            const { code } = await DeviceCountry.getCountryCode()
            const country = await getCountryByCode(code)
            if(country){
                setSelected(country)
            }else{
                setSelected(null)
            }
        } catch (error) {
            setSelected(null)
        }
    }
}