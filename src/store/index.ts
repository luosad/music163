import { configureStore } from '@reduxjs/toolkit'
import exp from 'constants'
import counterReducer from './modules/counter'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

type GetStateType = typeof store.getState
export type IRootState = ReturnType<GetStateType>
//自定义hook
export const useMySelector: TypedUseSelectorHook<IRootState> = useSelector

export default store
