import axios, { AxiosResponse } from 'axios';
import { API_URL, API_KEY } from './config';
import { BreedImageType, BreedType } from 'types/breeds';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export const fetchBreeds = (
  page: number,
): Promise<AxiosResponse<{ data: BreedType[] }>> =>
  api.get('/breeds', { params: { limit: 10, page } });

export const getRandomBreedImage = (breedId: string): Promise<BreedImageType> =>
  api.get(`/images/search?breed_id=${breedId}`).then((result) => result.data[0]);
