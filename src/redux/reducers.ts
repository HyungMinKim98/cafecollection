// src>redux>reducers.ts
import { FETCH_CAFE_REQUEST, FETCH_CAFE_SUCCESS, FETCH_CAFE_FAIL, ADD_REVIEW, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAIL } from './actionTypes';
import { Review } from '../types/types';
import { Cafe } from '../types/cafe';

interface Action {
  type: string;
  payload: any;
}

interface CafeState {
  cafe: Cafe | null;
  loading: boolean;
  error: string | null;
}


const initialCafeState: CafeState = {
  cafe: null,
  loading: false,
  error: null,
};

const cafeReducer = (state: CafeState = initialCafeState, action: Action): CafeState => {
  switch (action.type) {
    case FETCH_CAFE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CAFE_SUCCESS:
      return { ...state, loading: false, cafe: action.payload };
    case FETCH_CAFE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialReviewsState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsReducer = (state: ReviewsState = initialReviewsState, action: Action): ReviewsState => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { cafeReducer, reviewsReducer };