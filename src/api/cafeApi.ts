// src>api>cafeApi.ts

import { Cafe } from '../types/cafe';

export const fetchCafeDetails = async (id: string): Promise<Cafe> => {
  const response = await fetch(`http://localhost:5001/cafes/${id}`);
  if (!response.ok) throw new Error('Cafe not found');
  const data: Cafe = await response.json();
  console.log(data)
  return data;
};