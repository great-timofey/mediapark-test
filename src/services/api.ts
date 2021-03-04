import axios, { AxiosResponse } from 'axios';
import { API_URL, API_KEY } from './config';
import { BreedType } from 'types/breeds';

export const api = axios.create({
  timeout: 12000,
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export const fetchBreeds = (
  page: number,
): Promise<AxiosResponse<{ data: BreedType[] }>> =>
  api.get('/breeds', { params: { limit: 5, page } });
