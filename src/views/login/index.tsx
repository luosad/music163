import { FC, memo, useState } from 'react'
import { useMyDispatch } from '@/store'
import { fetchLoginDataAction, fetchCaptchaLoginAction } from './sotre/login'
import type { ReactNode } from 'react'
import { Select, Input, Button, message } from 'antd'
import './index.less'
import { sendCaptcha } from './service/login'
import axios from 'axios'
import { json } from 'stream/consumers'

interface IProps {
  children?: ReactNode
  onClose?: () => void // 新增：登录成功后调用该方法
}

const countryCodes = [
  { label: '中国 +86', value: '+86' },
  { label: '美国 +1', value: '+1' },
  { label: '日本 +81', value: '+81' },
  { label: '韩国 +82', value: '+82' },
  { label: '英国 +44', value: '+44' }
]

const Login: FC<IProps> = ({ onClose }) => {
  const [countryCode, setCountryCode] = useState('+86')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loginType, setLoginType] = useState<'password' | 'captcha'>('password')
  const [captcha, setCaptcha] = useState('')
  const [countdown, setCountdown] = useState(0)
  const dispatch = useMyDispatch()

  /* 事件处理函数 */

  const handleLogin = () => {
    if (!phone || (loginType === 'password' ? !password : !captcha)) {
      setError('请完整填写信息')
      return
    }

    setError('')

    const phoneNumber = countryCode + phone
    if (loginType === 'password') {
      // dispatch(fetchLoginDataAction({ phone: phoneNumber, password }))
      //   .unwrap()
      //   .then((res) => {
      //     setError('登录成功！')
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     message.error(err || '登录失败')
      //     setError('登录失败，请检查账号密码')
      //   })
      axios
        .post('http://localhost:3001/mock/login', {
          phone: phoneNumber,
          password
        })
        .then((res) => {
          if (res.data.code === 0) {
            setError('登录成功！')
            // console.log(res.data.data.token)
            localStorage.setItem('token', JSON.stringify(res.data.data.token))
            console.log(res.data)
            onClose?.()
          } else {
            setError('登录失败，请检查账号密码')
          }
        })
        .catch(() => {
          setError('登录失败，请检查账号密码')
        })
    } else {
      dispatch(fetchCaptchaLoginAction({ phone: phoneNumber, captcha }))
        .unwrap()
        .then(
          () => {
            setError('登录成功！')
            onClose?.()
          } // 登录成功后关闭模态框
        )
        .catch((err) => {
          message.error(err || '登录失败')
          setError('登录失败，请检查账号密码')
        })
    }
  }

  // 发送验证码
  const handleGetCaptcha = () => {
    if (!phone) {
      setError('请输入手机号')
      return
    }

    setError('')

    sendCaptcha(phone)
      .then(() => {
        console.log(phone)
        message.success('验证码已发送')
        setCountdown(60)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      })
      .catch(() => {
        message.error('验证码发送失败')
      })
  }

  return (
    <div className="login-wrapper">
      <div className="login-phone-wrapper">
        <Select
          options={countryCodes}
          value={countryCode}
          onChange={(value) => setCountryCode(value)}
          className="country-select"
        />
        <Input
          placeholder="手机号"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="phone-input"
        />
      </div>

      {loginType === 'password' ? (
        <Input.Password
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
      ) : (
        <div className="captcha-wrapper">
          <Input
            placeholder="验证码"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            className="captcha-input"
          />
          <Button
            disabled={countdown > 0}
            onClick={handleGetCaptcha}
            className="captcha-button"
          >
            {countdown > 0 ? `${countdown}s` : '获取验证码'}
          </Button>
        </div>
      )}

      {error && <div className="error-text">{error}</div>}
      <Button type="primary" block onClick={handleLogin}>
        登录
      </Button>

      <div className="switch-login-type">
        <a
          onClick={() =>
            setLoginType(loginType === 'password' ? 'captcha' : 'password')
          }
        >
          使用{loginType === 'password' ? '验证码' : '密码'}登录
        </a>
      </div>
    </div>
  )
}

export default memo(Login)
