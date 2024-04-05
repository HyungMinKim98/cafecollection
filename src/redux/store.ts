// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import reviewsSlice from './reviewSlice'; // Update this path as necessary
import reviewsReducer from '../redux/reducers/reviewsReducer';
import { thunk } from 'redux-thunk';

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
