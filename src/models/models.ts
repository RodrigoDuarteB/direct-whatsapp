export interface Country {
    code: {
        root: string
        suffix: string
    }
    name: string
    idd: {
        root: string
        suffixes: Array<string>
    },
    flag: string
}

export interface Message {
    id: string
    country: Omit<Country, 'idd'>
    phoneNumber: string
    message: string
    datetime: Date | string
    contactSaved?: boolean
}

export interface SendMessage {
    phoneNumber: string
    message: string
    saveContact: boolean
    saveMessage: boolean
    contactName?: string
}
