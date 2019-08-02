/**
 *
 * Author: wsp
 * CreatDate: 2019-07-15
 *
 */
import Axios, { AxiosConfig } from '@/services/axios'
/**
 * 任务统计接口
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function statistics(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/statistics',
      method: 'POST',
      data
    })
  )
}
/**
 * 柱状统计图（1）
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function findSmalltypeByTaskid(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/findSmalltypeByTaskid',
      method: 'POST',
      data
    })
  )
}
/**
 * 柱状统计图（2）
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function findAllEnterHiddenquestion(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/findAllEnterHiddenquestion',
      method: 'POST',
      data
    })
  )
}
/**
 * 柱状统计图（3）
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function findTopTenHiddenquestion(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/findTopTenHiddenquestion',
      method: 'POST',
      data
    })
  )
}
/**
 * 根据任务id和企业id查找大类和小类
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function getTypeAndLevelByTaskidAndEid(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getTypeAndLevelByTaskidAndEid',
      method: 'POST',
      data
    })
  )
}
/**
 * 柱状统计图（4）
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function findHiddenqueByEnter(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/findHiddenqueByEnter',
      method: 'POST',
      data
    })
  )
}
