import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { Country, Message, SendMessage } from "../models/models";
import uuid from 'react-native-uuid'

const URL = 'https://wa.me'

/**
 * filters a phone number
 * @param phoneNumber the phone number to analyze
 * @returns the checked phone number
 */
function checkPhoneNumber(phoneNumber: string){
    return phoneNumber.replace(/[^0-9]+/g, '')
}

/**
 * Sends the whatsapp direct message to the selected number 
 * @param selectedCountry the current selected country of the context
 * @param phoneNumber the phone number of destination
 * @param message the message to send
 */
export async function sendMessage(selectedCountry: Country, phoneNumber: string, message: string){
    const { code } = selectedCountry
    const checkedPhoneNumber = `${typeof code !== 'string' ? code.root + code.suffix : code}` + checkPhoneNumber(phoneNumber)
    
    await Linking.openURL(`${URL}/${checkedPhoneNumber}?text=${message}`)
}

/**
 * save the message into the local storage
 * @param sended the form message being sended
 * @param selectedCountry the selected country of the context
 */
export async function saveMessage(sended: SendMessage, selectedCountry: Country){
    const { idd, ...country } = selectedCountry
    const newMessage: Message = {
        id: uuid.v4() as string,
        country,
        datetime: new Date().toString(),
        message: sended.message,
        phoneNumber: sended.phoneNumber,
        contactSaved: sended.saveContact
    }
    const { id, ...newMessageWithoutId } = newMessage

    const messages = await AsyncStorage.getItem('messages')
    let messagesObject: any = {}

    // if already exists a stored object 'messages', then push
    if(messages){
        messagesObject = JSON.parse(messages)     
    }
    messagesObject[id] = newMessageWithoutId
    await AsyncStorage.setItem('messages', JSON.stringify(messagesObject))
}

/**
 * looks for all messages stored in local storage
 * @returns the array with all the stored messages
 */
export async function getMessages(): Promise<Array<Message>> {
    let messages: Array<Message> = []
    const storedMessages = await AsyncStorage.getItem('messages')
    if(storedMessages){
        const parsed = JSON.parse(storedMessages)
        messages = Object.keys(parsed).map(id => {
            const value = parsed[id]
            const message: Message = {
                id,
                datetime: new Date(value.datetime),
                ...value
            }
            return message
        })
    } 
    return messages
}


/**
 * remove all stored messages
 */
export async function removeMessages(){
    await AsyncStorage.removeItem('messages')
}


/**
 * Remove the message of the id given
 * @param id the id of the message to delete
 */
export async function removeMessage(id: string){
    const storedMessages = await AsyncStorage.getItem('messages')
    if(storedMessages){
        const parsed = JSON.parse(storedMessages)
        delete parsed[id]
        if(Object.keys(parsed).length > 0){
            await AsyncStorage.setItem('messages', JSON.stringify(parsed))
        }else{
            await removeMessages()
        }
    }
}