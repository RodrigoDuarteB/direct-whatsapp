import React, { FC, createContext, PropsWithChildren, useState, useContext } from 'react'
import LocalStorageService from '../services/LocalStorageService'
import { StorageService } from '../models/interfaces'

interface IAppContext {
    isCloudSynced: boolean,
    storageProvider: StorageService
}

const AppContext = createContext<IAppContext>({
    isCloudSynced: false,
    storageProvider: new LocalStorageService()
})

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isCloudSynced, setIsCloudSynced] = useState(false)
    const [storageProvider, setStorageProvider] = useState<StorageService>(new LocalStorageService())

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