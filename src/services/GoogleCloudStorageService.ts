import { ICountryData, IMessageData } from "../models/interfaces";
import { Country } from "../models/models";
import { Message } from "../models/models";

export default class GoogleCloudStorageService implements ICountryData, IMessageData {

    async getLastCountryUsed(): Promise<Country | null> {
        throw new Error('Sin implementar')
    }
    
    async saveLastCountryUsed(country: Country | null): Promise<void> {
        throw new Error('Sin implementar')
    }

    async getMessages(): Promise<Message[]> {
        throw new Error('Sin implementar')
    }

    async removeMessages(): Promise<void> {
        throw new Error('Sin implementar')
    }

    async saveMessage(message: Omit<Message, "id" | "datetime">): Promise<void> {
        throw new Error('Sin implementar')
    }

    async removeMessage(id: string): Promise<void> {
        throw new Error('Sin implementar')
    }

}