import React, { FC, createContext, PropsWithChildren, useState, useContext } from 'react'
import LocalStorageService from '../services/LocalStorageService'
import GoogleCloudStorageService from '../services/GoogleCloudStorageService'

type StorageProvider = LocalStorageService | GoogleCloudStorageService

interface IAppContext {
    isCloudSynced: boolean,
    storageProvider: StorageProvider
}

const AppContext = createContext<IAppContext>({
    isCloudSynced: false,
    storageProvider: new LocalStorageService()
})

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isCloudSynced, setIsCloudSynced] = useState(false)
    const [storageProvider, setStorageProvider] = useState<StorageProvider>(new LocalStorageService())

    return (
        <AppContext.Provider value={{ 
            isCloudSynced, 
            storageProvider 
        }}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppInfo = () => useContext(AppContext)

export default AppContextProvider