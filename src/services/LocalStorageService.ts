import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICountryData, IMessageData } from "../models/interfaces";
import { Country } from "../models/models";
import { Message } from "../models/models";

class LocalStorageService implements ICountryData, IMessageData {

    getLastCountryUsed(): Promise<Country | null> {
        //return AsyncStorage.getItem('lastCountryUsed')
        throw new Error('not implemented')
    }

    saveLastCountryUsed(): Promise<void> {
        throw new Error('not implemented')
    }

    getMessages(): Promise<Message[]> {
        throw new Error('not implemented')
    }

    removeMessages(): Promise<void> {
        throw new Error('not implemented')
    }

    saveMessage(): Promise<void> {
        throw new Error('not implemented')
    }

    removeMessage(id: string): Promise<void> {
        throw new Error('not implemented')
    }
    
}

export default new LocalStorageService