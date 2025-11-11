import axios from 'axios';
import { anime } from './config';

export interface CharacterData {
  characterId: number;
  animeId: number;
  name: string;
  lifeTime: number;
  deathReason: string;
  causeOfDeathDetails?: string;
  imageUrl: string;
  bowCount: number;
  age: number;
  saying: string;
  state: string;
  deathOfDay: string;
}

interface CharacterDataResponse {
  message: string;
  data: CharacterData;
}

export const getCharacter = async (characterId: number): Promise<CharacterDataResponse> => {
  const response = await axios.get(`${anime}/characters/${characterId}`);
  return response.data;
};
