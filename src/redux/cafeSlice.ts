// src/redux/cafeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cafe } from '../types/cafe';
import { fetchCafeDetails as fetchCafeDetailsAPI } from '../api/cafeApi';

interface CafeState {
  cafe: Cafe | null;
  loading: boolean;
  error: string | null;
}

const initialState: CafeState = {
  cafe: null,
  loading: false,
  error: null,
};

export const fetchCafe = createAsyncThunk('cafe/fetchCafe', async (id: string) => {
  const response = await fetchCafeDetailsAPI(id);
  return response;
});

const cafeSlice = createSlice({
  name: 'cafe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCafe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCafe.fulfilled, (state, action) => {
        state.loading = false;
        state.cafe = action.payload;
      })
      .addCase(fetchCafe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cafe';
      });
  },
});

export default cafeSlice.reducer;