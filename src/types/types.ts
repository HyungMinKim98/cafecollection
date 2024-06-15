// src/types/types.ts

// Define action types
export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL';

// Define action payloads
interface ProfileUpdateRequestAction {
  type: typeof PROFILE_UPDATE_REQUEST;
}

interface ProfileUpdateSuccessAction {
  type: typeof PROFILE_UPDATE_SUCCESS;
  payload: User; // Assuming User is already defined in your types
}

interface ProfileUpdateFailAction {
  type: typeof PROFILE_UPDATE_FAIL;
  payload: string; // Error message
}

// Combine the actions using a type union
export type UserActionTypes = ProfileUpdateRequestAction | ProfileUpdateSuccessAction | ProfileUpdateFailAction;

export interface Review {
  id?: string;
  cafeId: string;
  user: string; // The name or identifier of the reviewer
  content: string;
  rating?: number;
  photoUrl?: string;
}


export interface ReviewData {
  content: string;
  rating: number;
  user:  string;
  cafe: string; // 추가된 속성

}

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  userInfo: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
export interface User {
  name?: string;
  email?: string;
  region?: string;
  firebaseUid?: string;
  photoUrl?: string; // 새로 추가된 속성
}
