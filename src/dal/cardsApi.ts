import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    // baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

