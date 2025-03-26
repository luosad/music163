import { createSlice } from '@reduxjs/toolkit'

interface IState {
  count: number
  message: string
  decoration: 'left' | 'right' | 'center'
}
//有些不好类型推导的情况下，可以使用接口定义初始状态
const initialState: IState = {
  count: 100,
  message: 'hello',
  decoration: 'left'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  /*   initialState: {
    count: 100,
    message: 'hello'
  }, */
  reducers: {
    changeMessage(state, { payload }) {
      state.message = payload
    }
  }
})

export const { changeMessage } = counterSlice.actions
export default counterSlice.reducer
