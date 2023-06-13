import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios"

export abstract class Requester {
    
    public baseUrl: string
    public requester: AxiosInstance

    constructor(baseUrl: string){
        this.baseUrl = baseUrl
        this.requester = axios.create({
            baseURL: this.baseUrl
        })
    }  
    
    public async request(url: string, method: Method, options?: AxiosRequestConfig): Promise<any> {
        return this.requester.request({
            url,
            method,
            ...options
        })
        .then(res => res.data)
        .catch(e => {
            throw e
        })
    }
}