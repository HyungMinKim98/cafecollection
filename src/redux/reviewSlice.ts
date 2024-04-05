//src>redux> reviewSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Review } from '../types/types';


interface ReviewState {
  reviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ReviewState = {
  reviews: [],
  status: 'idle',
  error: null,
};

// Async thunk for posting a review
export const postReview = createAsyncThunk(
  'reviews/postReview',
  async (review: Review, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5001/cafes/${review.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (!response.ok) {
        throw new Error(`Failed to submit review, status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error posting review:", error);
      return rejectWithValue(error.message ? error.message : 'Unknown error');
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.status = 'succeeded';
        state.reviews.push(action.payload);
      })
      .addCase(postReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error?.message || 'An unknown error occurred';
      });
  },
});

export default reviewsSlice.reducer;