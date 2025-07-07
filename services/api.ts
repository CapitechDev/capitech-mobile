import axios from "axios";

// API principal (Vercel) - para funcionalidades gerais como trilhas
export const api = axios.create({
    baseURL: "https://4sem-capitech-api.vercel.app/",
    headers: {
        "Content-Type": "application/json",
    },
})

// API Mobile - para autenticação e funcionalidades específicas do mobile

export const mobileApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 segundos de timeout
})
