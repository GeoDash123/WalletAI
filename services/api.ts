import axios from "axios";

const API_URL = "http://192.168.1.103:5678";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});