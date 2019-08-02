import Axios, { AxiosConfig } from '@/services/axios'
import base64 from 'base-64'
/**
 * 登录例子
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.password
 * @returns {Promise<any>}
 */
export function login(data) {
  const random = parseInt(Math.random() * Math.pow(10, 6)).toString()
  const authorization = data && data.password ? base64.encode(`${random}:${data.password}`) : null
  const isDev = process.env.NODE_ENV === 'development'
  // 从暴露的全局配置中获取当前环境对应的配置对象
  const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
  return Axios(
    new AxiosConfig({
      baseURL: globalConfig.BASE_URL_MAP.LOGIN,
      method: 'POST',
      url: '/login4app',
      data: data,
      headers: { authorization }
    })
  )
}

/**
 * 示例接口API（使用时请删除）
 * @param config
 * @returns {Promise<any>}
 */
export function logout(data) {
  return Axios(
    new AxiosConfig({
      method: 'POST',
      url: '/login/logOut',
      data
    })
  )
}
