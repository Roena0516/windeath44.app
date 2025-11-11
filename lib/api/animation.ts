import axios from 'axios';
import { anime } from './config';

interface AnimeData {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

interface AnimeResponse {
  message: string;
  data: AnimeData;
}

export const getAnimation = async (animeId: number): Promise<AnimeResponse> => {
  const response = await axios.get(`${anime}/${animeId}`);
  return response.data;
};
