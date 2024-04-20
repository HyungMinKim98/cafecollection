// src >redux>actions.ts
import { Dispatch } from 'redux';
import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE } from './actionTypes';
import { Review } from '../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addReview = (cafeId: string, newReview: Review) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/api/cafes/${cafeId}/reviews`, {
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
      type: ADD_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error: any) {  // Using 'any' temporarily to access 'message'
    const message = error instanceof Error ? error.message : 'Failed to add review';
    dispatch({
      type: ADD_REVIEW_FAILURE,
      payload: message,
    });
  }
};

export const fetchReviews = createAsyncThunk(
  'reviews/fetchByCafeId',
  async (cafeId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5001/api/cafes/${cafeId}/reviews`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
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
