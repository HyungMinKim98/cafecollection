// src/redux/userSlice.ts
import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  User, UserState } from '../types/types';
import axios from 'axios';

const initialState: UserState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      // Handle other cases for pending and rejected if needed
  },
});

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: { firebaseUid: string; name: string; email: string; region: string; }, thunkAPI) => {
    try {
      const response = await axios.post(`/users/${profileData.firebaseUid}/update`, profileData);
      return response.data;
    } catch (error: unknown) { // error의 타입을 unknown으로 지정
      // AxiosError 타입으로 error를 좁혀서 에러 핸들링
      if (axios.isAxiosError(error)) {
        // 이제 error 객체의 속성에 안전하게 접근할 수 있습니다.
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;