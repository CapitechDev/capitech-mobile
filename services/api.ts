import axios from "axios";

export const api = axios.create({
    baseURL: "https://4sem-capitech-api.vercel.app/",
    headers: {
        "Content-Type": "application/json",
    },
})