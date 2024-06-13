// src/redux/reviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewData, ReviewsState, Review } from '../types/types';

// Define async thunks
export const postReview = createAsyncThunk(
  'reviews/postReview',
  async ({ reviewData, cafeId, token }: { reviewData: ReviewData; cafeId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5001/api/cafes/${cafeId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for fetching reviews by cafe ID
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
      return rejectWithValue((error as Error).message);
    }
  }
);

// Review Slice
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  } as ReviewsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        console.error('Error fetching reviews:', action.error.message);
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default reviewsSlice.reducer;