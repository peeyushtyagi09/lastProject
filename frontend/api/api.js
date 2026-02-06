const axios = require("axios");

const api = axios.create({
    baseURL: import.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: {
        "content-Type": "application/json",
    },
});

module.exports = api;