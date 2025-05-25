import axios from "axios";

export const newsApi = axios.create({
    baseURL: `https://newsapi.org/v2`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.EXPO_PUBLIC_NEWS_API_KEY}`,
        "X-Api-Key": process.env.EXPO_PUBLIC_NEWS_API_KEY,
    },
})