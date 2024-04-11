// src/redux/userSlice.ts
import { createSlice,createAsyncThunk, AsyncThunkAction,PayloadAction } from '@reduxjs/toolkit';
import { UserState, User } from '../types/types';
import axios from 'axios';
import { AppDispatch, RootState } from './store';

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null,
};

// Typing for the parameters of the updateUserProfile thunk
interface UserProfileUpdateParams {
  firebaseUid: string;
  name: string;
  email: string;
  region: string;
}
// Define the type for ThunkAPI argument using generic types provided by Redux Toolkit
type MyThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string; // Customizing the rejection value type if needed
};

export const updateUserProfile = createAsyncThunk<User, UserProfileUpdateParams, MyThunkApiConfig>(
  'user/updateUserProfile',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/users/${userData.firebaseUid}/update`, userData);
      if (response.status === 200) {
        thunkAPI.dispatch(fetchUserProfile(userData.firebaseUid));
        return response.data;
      } else {
        throw new Error('Failed to update user profile');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Network error');
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchUserProfile = createAsyncThunk<User, string, MyThunkApiConfig>(
  'user/fetchUserProfile',
  async (firebaseUid, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/users/${firebaseUid}`);
      if (response.data) {
        return response.data;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user profile');
    }
  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;