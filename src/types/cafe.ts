// src/types/cafe.ts
export interface Cafe {
  _id: string;
  name: string;
  photo: string;
  rating?: number;
  reviewsCount?: number;
  address?: string;
  phone?: string;
  description: string;
  hours: string[];
  menuHighlights: string[];
  location: {
    address: string;
    coordinates: [number, number];
  };
}
