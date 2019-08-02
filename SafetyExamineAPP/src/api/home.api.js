import Axios, { AxiosConfig } from '@/services/axios'

/**
 * 保存用户token
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await homeDataApi({name:'Cphayim', age:18})
 */
export function saveToken(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/saveToken',
      method: 'POST',
      data
    })
  )
}
/**
 * 部门职责
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function viewDuty(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/viewDuty',
      method: 'POST',
      data
    })
  )
}
