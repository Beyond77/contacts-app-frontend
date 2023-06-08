import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_CONTACTS_API } = getEnvVariables();

const contactsApi = axios.create({
    baseURL: VITE_CONTACTS_API
})

contactsApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "x-token": localStorage.getItem("token")
    }

    return config;
})

export default contactsApi;