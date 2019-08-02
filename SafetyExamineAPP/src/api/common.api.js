/**
 *
 * Author: wsp
 * CreatDate: 2019-07-01
 *
 */
import Axios, { AxiosConfig } from '@/services/axios'
/**
 * 删除附件
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function deleteFile(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/deleteFile',
      method: 'POST',
      data
    })
  )
}
/**
 * app更新
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function appUpdate(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/checkVersion',
      method: 'POST',
      data
    })
  )
}
