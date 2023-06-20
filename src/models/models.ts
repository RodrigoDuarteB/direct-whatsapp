interface Idd {
    root: string
    suffixes: Array<string>
}

interface CountryCode {
    root: string
    suffix: string
}

export interface Country {
    code: CountryCode | string
    name: string
    idd: Idd,
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
