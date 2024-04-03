import { Dispatch } from 'redux';
import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE, FETCH_REVIEWS } from './actionTypes';

interface Review {
  cafeId: string;
  user: string;
  comment: string;
}

export const addReview = (newReview: Review) => async (dispatch: Dispatch) => {
  try {
    // Simulate posting the review to a backend
    const response = await fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      throw new Error('Failed to submit review');
    }

    const data = await response.json();
    dispatch({
      type: 'ADD_REVIEW_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ADD_REVIEW_FAILURE',
      payload: error,
    });
  }
};

// Define a type for the dispatch function
export const fetchReviews = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    dispatch({ type: FETCH_REVIEWS, payload: data.reviews });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }
};