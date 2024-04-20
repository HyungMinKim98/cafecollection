// src/redux/userSlice.ts
import { createSlice,createAsyncThunk, AsyncThunkAction,PayloadAction } from '@reduxjs/toolkit';
import {  User } from '../types/types';
import axios from 'axios';
import { AppDispatch, RootState } from './store';

interface UserProfileUpdateParams {
  firebaseUid: string;
  name: string;
  email: string;
  region: string;
}

interface UserState {
  userInfo: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null,
};

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData: UserProfileUpdateParams, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { userInfo } = state.user;
    if (!userInfo) {
      return rejectWithValue('User not logged in');
    }
    try {
      const response = await axios.post(`http://localhost:5001/api/users/${userInfo.firebaseUid}/update`, userData);
      if (response.data) {
        return response.data;
      } else {
        throw new Error('No response data');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An unknown error occurred');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update profile';
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;