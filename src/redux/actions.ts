// src >redux>actions.ts
import { Dispatch } from 'redux';
import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE, FETCH_REVIEWS } from './actionTypes';
import { Review, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, UserActionTypes, User, } from '../types/types';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { setUser } from './userSlice';

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

export const fetchReviews = createAsyncThunk(
  'reviews/fetchByCafeId',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5001/api/cafes/${_id}/reviews`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

