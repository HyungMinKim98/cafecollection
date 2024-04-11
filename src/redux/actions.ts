// src >redux>actions.ts
import { Dispatch } from 'redux';
import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE, FETCH_REVIEWS } from './actionTypes';
import { Review, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, UserActionTypes, User, } from '../types/types';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the structure for the update payload
interface UpdateProfilePayload {
  firebaseUid: string;
  name: string;
  email: string;
  region: string;
}

export const addReview = (newReview: Review) => async (dispatch: Dispatch) => {
  try {
    // Simulate posting the review to a backend
    const response = await fetch('http://localhost:5001/reviews', {
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
    const response = await fetch('http://localhost:5001/reviews');
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    dispatch({ type: FETCH_REVIEWS, payload: data.reviews });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    dispatch({
      type: FETCH_REVIEWS,
      payload: []
    });
  }
};
// Update the updateUserProfile thunk to use the correct typing for its parameter
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: UpdateProfilePayload, { rejectWithValue }) => {
    const { firebaseUid, name, email, region } = userData;
    try {
      const response = await axios.post(`/api/users/${firebaseUid}/update`, {
        name, email, region
      });
      if (response.data) {
        return response.data;
      } else {
        throw new Error('No data returned');
      }
    } catch (error: any) {
      return rejectWithValue('Failed to update profile');
    }
  }
);