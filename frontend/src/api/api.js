import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_Backend_URL,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json' // Corrected header name
    },
});

export default api;