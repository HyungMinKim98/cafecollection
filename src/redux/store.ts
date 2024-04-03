import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import reviewsReducer from './reducers';

const store = createStore(
  reviewsReducer,
  applyMiddleware(thunk as unknown as Middleware)
);

export default store;
