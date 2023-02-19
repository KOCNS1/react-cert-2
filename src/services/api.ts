import axios from "axios";

export const api = axios.create({
  baseURL: "https://free-nba.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX",
    "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
  },
});
