// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import reviewsSlice from './reviewSlice'; // Update this path as necessary
import userSlice from './userSlice';
import cafeReducer from './reducers/cafeReducer';

export const store = configureStore({
  reducer: {
    user: userSlice,
    reviews: reviewsSlice,
    cafe: cafeReducer,  // Add this line to include the cafe reducer in the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
