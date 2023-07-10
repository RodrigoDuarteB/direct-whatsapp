import { Contact, addContact, getAll } from "react-native-contacts";
import { Country } from "../models/models";
import { PermissionsAndroid } from "react-native";

class ContactsService {
    
    async checkReadPermission(){
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
    
    async checkWritePermission(){
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

    async getAll(): Promise<Array<Contact>> {
        var contacts: Array<Contact> = []
        const perm = await this.checkReadPermission()
        if(perm)
            contacts = await getAll()

        return contacts
    }

    async saveOne(name: string, phoneNumber: string, country: Country): Promise<void> {
        var { code } = country
        await addContact({
            givenName: name,
            displayName: name,
            phoneNumbers: [
                {
                    label: 'mobile',
                    number: `${typeof code !== 'string' ? code.root + code.suffix : code} ${phoneNumber}}`
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
            note: "",
            isStarred: false
        })
    }
}

export default new ContactsService