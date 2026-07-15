import axios from "axios";

const API_URL = "http://172.25.160.1:5678";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});