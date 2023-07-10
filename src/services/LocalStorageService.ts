import DeviceCountry from 'react-native-device-country';
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICountryData, IMessageData } from "../models/interfaces";
import { Country } from "../models/models";
import { Message } from "../models/models";
import CountriesService from './CountriesService';

class LocalStorageService implements ICountryData, IMessageData {

    async getLastCountryUsed(): Promise<Country | null> {
        var lastUsed = await AsyncStorage.getItem('lastCountryUsed')
        if(lastUsed){
            return JSON.parse(lastUsed)
        }else{
            try {
                const { code } = await DeviceCountry.getCountryCode()
                const country = await CountriesService.getOneByCode(code)
                return country ?? null
            } catch (error) {
                return null
            }
        }
    }

    async saveLastCountryUsed(country: Country | null): Promise<void> {
        if(country)
            await AsyncStorage.setItem('lastCountryUsed', JSON.stringify(country))
    }

    async getMessages(): Promise<Message[]> {
        var messages: Array<Message> = []
        var saved = await AsyncStorage.getItem('messages')
        if(saved) {
            return JSON.parse(saved)
        }
        return messages
    }

    async saveMessage(message: Omit<Message, 'id' | 'datetime'>): Promise<void> {
        var messages = await this.getMessages()
        messages.push({
            ...message,
            id: uuid.v4() as string,
            datetime: new Date().toString()
        })
        await AsyncStorage.setItem('messages', JSON.stringify(messages))
    }

    async removeMessages(): Promise<void> {
        await AsyncStorage.removeItem('messages')
    }

    async removeMessage(id: string): Promise<void> {
        var messages = (await this.getMessages()).filter(m => m.id != id)
        await AsyncStorage.setItem('messages', JSON.stringify(messages))
    }
    
}

export default new LocalStorageService