/**
 *
 * Author: wsp
 * CreatDate: 2019-07-08
 *
 */
import Axios, { AxiosConfig } from '@/services/axios'

/**
 * 新增随行检查任务
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function addAccompanyTask(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/addAccompanyTask',
      method: 'POST',
      data
    })
  )
}
/**
 * 随行检查任务详情
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function showDetail(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/showDetail',
      method: 'POST',
      data
    })
  )
}
/**
 * 随行任务保存检查表
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function addCheckList(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/addCheckList',
      method: 'POST',
      data
    })
  )
}
/**
* 随行任务删除检查表
* 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
* @param {Object} data
* @return {Promise<any>}
* @example
* 使用范例
* const res = await getEnterprise({type:0})
*/
export function delCheckList(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/delCheckList',
      method: 'POST',
      data
    })
  )
}
/**
 * 随行任务进入编辑页面
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function toAccompanyTaskEdit(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/toAccompanyTaskEdit',
      method: 'POST',
      data
    })
  )
}
/**
 * 保存随行任务编辑数据
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function updateAccompanyTask(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/updateAccompanyTask',
      method: 'POST',
      data
    })
  )
}
/**
 * 进入检查页面（随行任务）
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function getAccompanyPatrolInfo(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getAccompanyPatrolInfo',
      method: 'POST',
      data
    })
  )
}
/**
 * 进入隐患问题（随行任务）
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function toAccompanyYhwt(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/toAccompanyYhwt',
      method: 'POST',
      data
    })
  )
}
/**
 * 数据保存（随行任务）
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function saveAccompanyInfo(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/saveAccompanyInfo',
      method: 'POST',
      data
    })
  )
}
