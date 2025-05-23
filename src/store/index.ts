import { configureStore } from '@reduxjs/toolkit'
import exp from 'constants'
import counterReducer from './modules/counter'
import recommendReducer from '../views/discover/c-views/recommend/store/recommend'
import playerReducer from '../views/player/store/player'
import searchReducer from '@/components/app-header/store/search'
import loginReducer from '@/views/login/sotre/login'
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer,
    search: searchReducer,
    login: loginReducer
  }
})

// 获取store的类型
//方法一
const state = store.getState()
export type IRootState = typeof state
//方法二
// type GetStateType = typeof store.getState
// export type IRootState = ReturnType<GetStateType>

type DispatchType = typeof store.dispatch
//自定义hook
export const useMySelector: TypedUseSelectorHook<IRootState> = useSelector
export const useMyDispatch: () => DispatchType = useDispatch
export const myShallowEqual = shallowEqual

export default store
