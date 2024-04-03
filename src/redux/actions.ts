import { Dispatch } from 'redux';
import { ADD_REVIEW, FETCH_REVIEWS } from './actionTypes';

interface Review {
  cafeId: string;
  user: string;
  comment: string;
}

export const addReview = (review: Review) => ({
  type: ADD_REVIEW,
  payload: review,
});

// Define a type for the dispatch function
export const fetchReviews = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/reviews`);
    const data = await response.json();
    dispatch({ type: FETCH_REVIEWS, payload: data.reviews });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }
};