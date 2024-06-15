// src/redux/userSlice.ts
import { createSlice,createAsyncThunk, AsyncThunkAction,PayloadAction } from '@reduxjs/toolkit';
import {  User } from '../types/types';
import axios from 'axios';
import { AppDispatch, RootState } from './store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

// Fetch user profile action
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const firebaseUid = state.user.userInfo?.firebaseUid;
    if (!firebaseUid) {
      return rejectWithValue('No user logged in');
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/users/${firebaseUid}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An unknown error occurred');
    }
  }
);

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
    setUser: (state, action: PayloadAction<User>) => {
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
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch profile';
      })
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

// Add a function to initialize user on app load
export const initializeUser = () => (dispatch: AppDispatch) => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User is logged in:", user); // 로그인된 사용자 정보 출력
      try {
        const response = await axios.get(`http://localhost:5001/api/users/${user.uid}`);
        console.log("User profile data fetched:", response.data); // 사용자 프로필 데이터 출력
        dispatch(setUser({
          firebaseUid: user.uid,
          name: user.displayName || 'Anonymous',
          email: user.email || 'No Email',
          photoUrl: user.photoURL || '',
          region: response.data.region || 'Unknown'
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    } else {
      console.log("No user is logged in"); // 로그인된 사용자가 없는 경우 출력
      dispatch(clearUser());
    }
  });
};