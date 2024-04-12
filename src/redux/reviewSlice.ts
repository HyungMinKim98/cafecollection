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
  async (reviewData: Review, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5001/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unknown error');
      }
      return data;
    } catch (error: any) { // Explicitly casting error as any to access message property
      return rejectWithValue(error.message || 'Failed to post review');
    }
  }
);

export const fetchReviews = createAsyncThunk(
  'reviews/fetchByCafeId',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5001/api/cafes/${_id}/reviews`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched Reviews:', data);  // Log to see what data is returned
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
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
        state.reviews.push(action.payload); // Add new review to the list
      })
      .addCase(postReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'An unknown error occurred';
      });
  },
});

export default reviewsSlice.reducer;