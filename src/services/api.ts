import axios from "axios";

export const api = axios.create({
  baseURL: "https://free-nba.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
  },
});
