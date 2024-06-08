// src/redux/actions.ts
import { Dispatch } from 'redux';
import { ADD_REVIEW } from './actionTypes';
import { Review } from '../types/types';

export const addReview = (review: Review) => ({
  type: ADD_REVIEW,
  payload: review,
});