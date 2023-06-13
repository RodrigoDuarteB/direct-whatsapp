import { Requester } from "./Requester";

class CountriesService extends Requester {

    constructor(){
        super('https://restcountries.com/v3.1')
    }

    async getAll(): Promise<Array<any>> {
        return this.request('all', 'GET', {
            params: {
                fields: 'name,idd,translations,flags'
            }
        })
        .then(res => res.map((c: any) => {
            return {
                idd: c.idd,
                name: c.translations.spa ? c.translations.spa.common : c.name.common,
                flag: c.flags.png ? c.flags.png : c.flags.svg,
                mainCode: c.idd.root + c.idd.suffixes[0]
            }
        }).sort((a: any, b: any) => a.name.localeCompare(b.name)))    
    }

}

export default new CountriesService