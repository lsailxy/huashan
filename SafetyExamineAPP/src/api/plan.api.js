/**
 *
 * Author: wsp
 * CreatDate: 2019-07-17
 *
 */
import Axios, { AxiosConfig } from '@/services/axios'

/**
 * 计划列表
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function getPlanList(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getPlanList',
      method: 'POST',
      data
    })
  )
}
/**
 * 计划详情
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function getDetailByPlanId(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getDetailByPlanId',
      method: 'POST',
      data
    })
  )
}
/**
 * 进入计划新增页，获取字典项
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function toPlanAdd(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/toPlanAdd',
      method: 'POST',
      data
    })
  )
}
/**
 * 获取机构名称
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function getDepname(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getDepname',
      method: 'POST',
      data
    })
  )
}
/**
 * 新增计划
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function savePlan(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/savePlan',
      method: 'POST',
      data
    })
  )
}
/**
 * 删除计划
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function deletePlan(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/deletePlan',
      method: 'POST',
      data
    })
  )
}
