import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apikey: '9672d839',
  },
});

export default instance;