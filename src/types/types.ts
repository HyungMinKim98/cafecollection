// src/types/types.ts

export interface Review {
  id?: string;
  cafeId: string; // Essential for associating the review with a specific cafe
  user: string; // The name or identifier of the reviewer
  comment: string; // The main content of the review
  rating?: number; // Optional, in case you want to add ratings later
  photoUrl?: string; 
}

export interface ClientReview {
  cafeId: string;
  user: string;
  comment: string;
  rating?: number;
  photoUrl?: string;
}

export interface ReviewState {
  reviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  region: string; // 사용자의 지역 정보 추가
}