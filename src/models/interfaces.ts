import { Country, Message } from "./models";

export interface ICountryData {
    getLastCountryUsed: () => Promise<Country | null>
    saveLastCountryUsed: (country: Country | null) => Promise<void>
}

export interface IMessageData {
    getMessages: () => Promise<Array<Message>>
    removeMessages: () => Promise<void>
    saveMessage: (message: Omit<Message, 'id' | 'datetime'>) => Promise<void>
    removeMessage: (id: string) => Promise<void>
}

export interface StorageService extends ICountryData, IMessageData {

}