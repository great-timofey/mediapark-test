import axios from 'axios';
import { API_URL, API_KEY } from './config';

export const api = axios.create({
  timeout: 12000,
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});
