export interface Country {
    code: string
    name: string
}

export interface Message {
    country: Country
    number: string
    message: string
    datetime: Date
    contactSaved?: string
}