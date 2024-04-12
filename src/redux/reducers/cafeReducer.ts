// src/redux/reducers/cafeReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cafe } from '../../types/cafe';

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

const cafeSlice = createSlice({
  name: 'cafe',
  initialState,
  reducers: {
    setCafe(state, action: PayloadAction<Cafe>) {
      state.cafe = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setCafe, setLoading, setError } = cafeSlice.actions;
export default cafeSlice.reducer;
