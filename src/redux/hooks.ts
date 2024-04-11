// src/redux/hooks.ts
import { TypedUseSelectorHook, useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => reduxUseDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = reduxUseSelector
