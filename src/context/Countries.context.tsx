import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { Country } from '../models/models'
import { getAllCountries, saveLastUsed, setSelectedCountry } from '../services/Countries.service'

interface ICountriesContext {
    countries: Array<Country>
    selected: Country | null
    setSelected: (country: Country) => void
}

const CountriesContext = createContext<ICountriesContext>({
    countries: [],
    selected: null,
    setSelected: () => {},
})

const CountriesProvider: FC = ({ children }) => {
    const [selected, setSelected] = useState<Country | null>(null)
    const [countries, setCountries] = useState<Array<Country>>([])

    useEffect(() => {
        setSelectedCountry(setSelected)
        
        getAllCountries()
        .then(res => setCountries(res))
    }, [])

    useEffect(() => {
        saveLastUsed(selected)
    }, [selected])

    return (
        <CountriesContext.Provider value={{ countries, selected, setSelected }}>
            {children}
        </CountriesContext.Provider>
    )
}

export const useCountries = () => useContext(CountriesContext)

export default CountriesProvider