// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reviewsSlice from './reviewSlice'; // Update this path as necessary
import userSlice from './userSlice';
import cafeReducer from './cafeSlice';

// persistConfig 정의
const persistConfig = {
  key: 'root',
  storage,
};

// rootReducer 정의
const rootReducer = combineReducers({
  user: userSlice,
  reviews: reviewsSlice,
  cafe: cafeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['register', 'rehydrate'],
        // Ignore these paths in the state
        ignoredPaths: ['_persist'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;