import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apikey: process.env.EXPO_PUBLIC_API_KEY,
  },
});

export default instance;