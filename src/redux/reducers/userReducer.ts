// src/redux/reducers/userReducer.js

import { UserActionTypes, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL } from '../../types/types';

const initialState = {
  userInfo: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { ...state, status: 'loading' };
    case PROFILE_UPDATE_SUCCESS:
      return { ...state, status: 'succeeded', userInfo: action.payload };
    case PROFILE_UPDATE_FAIL:
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
};