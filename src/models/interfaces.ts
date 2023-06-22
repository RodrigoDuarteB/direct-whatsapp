import { Country, Message } from "./models";

export interface ICountryData {
    getLastCountryUsed: () => Promise<Country | null>
    saveLastCountryUsed: () => Promise<void>
}

export interface IMessageData {
    getMessages: () => Promise<Array<Message>>
    removeMessages: () => Promise<void>
    saveMessage: () => Promise<void>
    removeMessage: (id: string) => Promise<void>
}