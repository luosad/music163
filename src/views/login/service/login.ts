import myRequest from '@/service/axios'

export interface LoginParams {
  phone: string
  password: string
}

export function getLogin(data: LoginParams) {
  return myRequest({
    url: '/login/cellphone',
    method: 'GET', // 网易云API登录接口为 GET
    params: data
  })
}

export const sendCaptcha = (phone: string) => {
  return myRequest({
    url: `/captcha/sent?phone=${phone}`,
    method: 'POST'
  })
}

export const getCaptchaLogin = (params: { phone: string; captcha: string }) => {
  return myRequest({
    url: '/captcha/verify',
    method: 'GET',
    params: {
      phone: params.phone.replace('+86', ''), // 确保不带 +86
      captcha: params.captcha
    }
  })
}
