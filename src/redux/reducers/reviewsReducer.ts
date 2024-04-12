// src/redux/reducers/reviewsReducer.ts
import { AnyAction } from 'redux';
import { Review } from '../../types/types'; // Review 인터페이스 임포트
import { fetchReviews } from '../actions';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};
interface ReviewData {
  cafeId: string;
  // Add other expected properties of a review
  user: string;
  comment: string;
  rating: number;
}

const reviewsReducer = (state: ReviewsState = initialState, action: AnyAction): ReviewsState => {
  switch (action.type) {
    case 'FETCH_REVIEWS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_REVIEWS_SUCCESS':
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case 'FETCH_REVIEWS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_REVIEW_SUCCESS':
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        error: null,
      };
    case 'ADD_REVIEW_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;