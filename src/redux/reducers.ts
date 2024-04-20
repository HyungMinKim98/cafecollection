// src>redux>reducers.ts
import { ADD_REVIEW, FETCH_REVIEWS } from './actionTypes';
import { Review } from '../types/types';


interface Action {
  type: string;
  payload: any;
}

interface State {
  reviews: Review[];
}

const initialState: State = {
  reviews: [],
};

const reviewsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
