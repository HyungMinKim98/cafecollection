// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import reviewsSlice from './reviewSlice'; // Update this path as necessary
import reviewsReducer from '../redux/reducers/reviewsReducer';
import { thunk } from 'redux-thunk';
import userReducer from './userSlice'; // Make sure this path is correct
import { Review, User } from '../types/types';
import cafeReducer from './reducers/cafeReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    reviews: reviewsReducer,
    cafe: cafeReducer,  // Add this line to include the cafe reducer in the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
