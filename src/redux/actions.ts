// src >redux>actions.ts
import { Dispatch } from 'redux';
import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE, FETCH_REVIEWS } from './actionTypes';
import { Review, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, UserActionTypes, User, } from '../types/types';
import axios from 'axios';

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

export const updateUserProfile = (firebaseUid: string, profileData: User) => 
  async (dispatch: Dispatch<UserActionTypes>) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    const response = await axios.post(`http://localhost:3000/users/${firebaseUid}/update`, profileData);
    if (response.status === 200) {
      const updatedUser: User = response.data;
      dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: updatedUser });
    } else {
      throw new Error('Profile update failed');
    }
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: errorMessage });
  }
};