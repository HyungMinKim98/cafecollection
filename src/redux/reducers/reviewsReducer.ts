// src/redux/reducers/reviewsReducer.ts
import { AnyAction } from 'redux';
import { Review } from '../../types/types'; // Review 인터페이스 임포트

interface ReviewsState {
  reviews: Review[];
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  error: null,
};

export default function reviewsReducer(state: ReviewsState = initialState, action: AnyAction): ReviewsState {
  switch (action.type) {
    case 'ADD_REVIEW_SUCCESS':
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case 'ADD_REVIEW_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
