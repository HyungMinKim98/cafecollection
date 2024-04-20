//src>redux> reviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, ReviewData, ReviewsState, Review } from '../types/types';

// Define a type for the review data you expect to send


interface ThunkApiConfig {
  rejectValue: string;  // This is the type of the rejection value
}


// Define async thunks
export const postReview = createAsyncThunk<Review, { reviewData: ReviewData; cafeId: string; token: string }, { rejectValue: string }>(
  'reviews/postReview',
  async ({ reviewData, cafeId, token }, { rejectWithValue }) => {
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
export const fetchReviews = createAsyncThunk<Review[], string, { rejectValue: string }>(
  'reviews/fetchByCafeId',
  async (cafeId, { rejectWithValue }) => {
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

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default reviewsSlice.reducer;