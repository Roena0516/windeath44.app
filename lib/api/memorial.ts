import axios from 'axios';
import { memorial } from './config';

export type OrderBy =
  | 'recently-updated'
  | 'lately-updated'
  | 'ascending-bow-count'
  | 'descending-bow-count';

export interface MemorialItem {
  memorialId: number;
  characterId: number;
  [key: string]: any;
}

export interface FetchMemorialsParams {
  orderBy: OrderBy;
  page: number;
  characters: number[];
}

interface MemorialsResponse {
  message: string;
  data: {
    values: MemorialItem[];
  };
}

export const fetchMemorials = async ({
  orderBy,
  page,
  characters,
}: FetchMemorialsParams): Promise<MemorialsResponse> => {
  if (!orderBy) throw new Error('orderBy is required');
  if (typeof page !== 'number') throw new Error('page must be a number');
  if (!Array.isArray(characters)) throw new Error('characters must be an array');

  const uniqSorted = Array.from(new Set(characters.filter((n) => Number.isInteger(n)))).sort(
    (a, b) => a - b,
  );

  const response = await axios.post<MemorialsResponse>(`${memorial}/character-filtered`, {
    orderBy,
    page,
    characters: uniqSorted,
  });
  return response.data;
};
