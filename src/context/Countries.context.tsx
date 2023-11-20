import React, { createContext, FC, useContext, useEffect, useState, PropsWithChildren } from 'react'
import { Country } from '../models/models'
import LocalStorageService from '../services/LocalStorageService'
import CountriesService from '../services/CountriesService'

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

const CountriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [selected, setSelected] = useState<Country | null>(null)
    const [countries, setCountries] = useState<Array<Country>>([])

    useEffect(() => {
        new LocalStorageService().getLastCountryUsed()
        .then(res => setSelected(res))

        CountriesService.getAll()
        .then(res => setCountries(res))
    }, [])

    useEffect(() => {
        new LocalStorageService().saveLastCountryUsed(selected)
    }, [selected])

    return (
        <CountriesContext.Provider value={{ countries, selected, setSelected }}>
            {children}
        </CountriesContext.Provider>
    )
}

export const useCountries = () => useContext(CountriesContext)

export default CountriesProvider