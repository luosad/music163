import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLogin, LoginParams, getCaptchaLogin } from '../service/login'

export const fetchLoginDataAction = createAsyncThunk(
  'fetchLoginData',
  (params: LoginParams, { dispatch }) => {
    //发送请求，获取数据并存储到store中
    return getLogin(params).then((res) => {
      if (res.code === 200) {
        dispatch(setToken(res.token))
        dispatch(setUserInfo(res.profile))

        localStorage.setItem('token', res.token) // 将token存储到localStorage中
        return res
      } else {
        return Promise.reject(res.message || '密码登录失败') // 手动抛出错误
      }
    })
  }
)

interface CaptchaLoginParams {
  phone: string
  captcha: string
}

export const fetchCaptchaLoginAction = createAsyncThunk(
  'fetchCaptchaLogin',
  (params: CaptchaLoginParams, { dispatch }) => {
    return getCaptchaLogin(params).then((res) => {
      if (res.code === 200) {
        dispatch(setToken(res.token))
        dispatch(setUserInfo(res.profile))

        localStorage.setItem('token', res.token)
        return res
      } else {
        return Promise.reject(res.message || '验证码登录失败')
      }
    })
  }
)

interface LoginState {
  token: string
  userInfo: any
}

const initialState: LoginState = {
  token: '',
  userInfo: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    }
  }
})

export const { setToken, setUserInfo } = loginSlice.actions
export default loginSlice.reducer
