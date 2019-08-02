/**
 *
 * Author: wsp
 * CreatDate: 2019-06-24
 *
 */
import Axios, { AxiosConfig } from '@/services/axios'

/**
 * 任务列表
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @param {number} data.depId
 * @return {Promise<any>}
 */
export function getTaskList(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getTaskList',
      method: 'POST',
      data
    })
  )
}
/**
 * 任务删除
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @param {number} data.depId
 * @return {Promise<any>}
 */
export function deleteTask(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/deleteTask',
      method: 'POST',
      data
    })
  )
}
/**
 * 任务新增字典项
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @param {number} data.depId
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await homeDataApi({depId:10})
 */
export function toadd(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/toadd',
      method: 'POST',
      data
    })
  )
}
/**
 * 获取企业
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @param {number} data.type
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function getEnterprise(data) {
  return Axios(
    new AxiosConfig({
      url: 'app/getEnterprise',
      method: 'POST',
      data
    })
  )
}
/**
 * 保存任务
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function saveTask(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/saveTask',
      method: 'POST',
      data
    })
  )
}
/**
 * 任务详情
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function getSelfTaskDetail(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getSelfTaskDetail',
      method: 'POST',
      data
    })
  )
}
/**
 * 编辑任务详情
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function saveTaskDetail(data) {
  return Axios(
    new AxiosConfig({
      url: '/taskApp/saveTaskDetail',
      method: 'POST',
      data
    })
  )
}
/**
 * 报告列表
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function reportlist(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/reportlist',
      method: 'POST',
      data
    })
  )
}
