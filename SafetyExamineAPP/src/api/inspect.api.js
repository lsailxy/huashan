/**
 *
 * Author: wsp
 * CreatDate: 2019-06-29
 *
 */
import Axios, { AxiosConfig } from '@/services/axios'
/**
 * 任务详情巡查明细
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function getTaskDetails(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/getTaskDetails',
      method: 'POST',
      data
    })
  )
}
/**
 * 签到图片上传
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function signUploadFile(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/SignUploadFile',
      method: 'POST',
      data
    })
  )
}
/**
 * 进入签到页面
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function toSign(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/toSign',
      method: 'POST',
      data
    })
  )
}
/**
 * 签到提交
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function sign(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/sign',
      method: 'POST',
      data
    })
  )
}
/**
 * 签到查看
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function toSignDetail(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/toSignDetail',
      method: 'POST',
      data
    })
  )
}
/**
 * 巡查详情
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function toPatrol(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/toPatrol',
      method: 'POST',
      data
    })
  )
}
/**
 * 巡查提交/保存
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function savePatrolDetail(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/savePatrolDetail',
      method: 'POST',
      data
    })
  )
}
/**
 * 巡查图片上传
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function patrolUploadFile(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/patrolUploadFile',
      method: 'POST',
      data
    })
  )
}
/**
 * 进入其他不合格项
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function enterOthers(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/enterOthers',
      method: 'POST',
      data
    })
  )
}
/**
 * 新增其他不合格项
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function addOthers(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/addOthers',
      method: 'POST',
      data
    })
  )
}
/**
 * 删除其他不合格项
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await getEnterprise({type:0})
 */
export function delOthers(data) {
  return Axios(
    new AxiosConfig({
      url: '/app/delOthers',
      method: 'POST',
      data
    })
  )
}
