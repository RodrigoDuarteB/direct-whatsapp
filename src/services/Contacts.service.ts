import { PermissionsAndroid } from "react-native";
import { getAll, Contact, addContact } from "react-native-contacts";
import { Country } from "../models/models";


async function checkReadPermission(){
    const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.',
          'buttonPositive': 'Please accept bare mortal'
        }
    )
    if(permission === PermissionsAndroid.RESULTS.GRANTED){
        return true
    }
    return false
}

async function checkWritePermission(){
    const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to write contacts.',
          'buttonPositive': 'Please accept bare mortal'
        }
    )
    if(permission === PermissionsAndroid.RESULTS.GRANTED){
        return true
    }
    return false
}

export async function getContacts(): Promise<Array<Contact> | null>{
    const perm = await checkReadPermission()
    if(perm){
        return await getAll()
    }
    return null
}

export async function saveContact(name: string, selectedCountry: Country, phoneNumber: string): Promise<void> {
    const perm = await checkWritePermission()
    if(perm){
        const { code: { root, suffix } } = selectedCountry

        const newContact: Contact = {
            givenName: name,
            displayName: name,
            phoneNumbers: [
                {
                    label: 'mobile',
                    number: `${root + suffix} ${phoneNumber}`
                }
            ],
            recordID: "",
            backTitle: "",
            company: "",
            emailAddresses: [],
            familyName: "",
            middleName: "",
            jobTitle: "",
            hasThumbnail: false,
            thumbnailPath: "",
            postalAddresses: [],
            prefix: "",
            suffix: "",
            department: "",
            birthday: {day: 0, month: 0, year: 0},
            imAddresses: [],
            note: ""
        }
        await addContact(newContact)
    }
}