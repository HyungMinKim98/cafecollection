//store.ts
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
