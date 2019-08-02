/**
 *
 * Author: wsp
 * CreatDate: 2019-07-15
 *
 */
import Axios, { AxiosConfig } from '@/services/axios'
/**
 * 点位列表
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function pointList(data) {
  return Axios(
    new AxiosConfig({
      url: '/point/jumpList',
      method: 'POST',
      data
    })
  )
}
/**
 * 设备列表
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function jumpEquipmentList(data) {
  return Axios(
    new AxiosConfig({
      url: '/point/jumpEquipmentList',
      method: 'POST',
      data
    })
  )
}
/**
 * 设备的最近一条记录详情
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function electricity_latest(data) {
  return Axios(
    new AxiosConfig({
      url: '/data/show/latest',
      method: 'POST',
      data
    })
  )
}
/**
 * 查询某设备一段时间的数据
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function electricity_bytime(data) {
  return Axios(
    new AxiosConfig({
      url: '/data/show/bytime',
      method: 'POST',
      data
    })
  )
}

/**
 * 查询某设备的异常数据
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @return {Promise<any>}
 */
export function electricity_abnormal(data) {
  return Axios(
    new AxiosConfig({
      url: '/data/show/abnormal',
      method: 'POST',
      data
    })
  )
}
