import { Country } from "../models/models";
import { Requester } from "./Requester";

class CountriesService extends Requester {

    constructor(){
        super('https://restcountries.com/v3.1')
    }

    
    async getAll(): Promise<Array<Country>> {
        return this.request<Array<Country>>('all', 'GET', {
            params: {
                fields: 'name,idd,translations,flags'
            }
        })
        .then(res => res.map((c: any) => {
            return {
                idd: c.idd,
                name: c.translations.spa ? c.translations.spa.common : c.name.common,
                flag: c.flags.png ? c.flags.png : c.flags.svg,
                code: {
                    root: c.idd.root,
                    suffix: c.idd.suffixes[0]
                }
            } as Country
        }).sort((a, b) => a.name.localeCompare(b.name)))    
        .catch(e => [])
    }


    async getOneByCode(code: string): Promise<Country | undefined> {
        return this.request<Country | undefined>(`alpha/${code}`, 'GET')
        .then((c: any) => {
            c = c[0]
            return {
                idd: c.idd,
                name: c.translations.spa ? c.translations.spa.common : c.name.common,
                flag: c.flags.png ? c.flags.png : c.flags.svg,
                code: {
                    root: c.idd.root,
                    suffix: c.idd.suffixes[0]
                }
            } as Country
        })
        .catch(e => undefined)
    }

}

export default new CountriesService