/*
 * @Author: Cphayim
 * @Date: 2019-05-24 10:22:40
 * @LastEditTime: 2019-06-24 09:49:47
 * @Description: 错误页面路由
 */

import Vue from 'vue'
import Router from 'vue-router'

import errorRoutes from './error'
import Login from '@/views/web/login/login.vue'
import Home from '@/views/web/home/home.vue'
import Person from '@/views/web/person/person.vue'
import task from '@/views/web/task/task.vue'
import taskAdd from '@/views/web/taskAdd/taskAdd.vue'
import TaskDetails from '@/views/web/taskDetails/taskDetails.vue'
import EnterpriseAdd from '@/views/web/taskDetails/enterpriseAdd/enterpriseAdd.vue'
import Statistics from '@/views/web/statistics/statistics.vue'
import Report from '@/views/web/report/report.vue'
import Inspect from '@/views/web/inspect/inspect.vue'
import InspectDetails from '@/views/web/inspectDetails/inspectDetails.vue'
import InspectDetailsOther from '@/views/web/inspectDetails/inspectDetailsOther.vue'
import Sign from '@/views/web/sign/sign.vue'
import SignView from '@/views/web/signView/signView.vue'
import EnterpriseList from '@/views/web/accompanying/enterpriseList/enterpriseList.vue'
import AccompanyingDetails from '@/views/web/accompanying/accompanyingDetails/accompanyingDetails.vue'
import AccompanyingInfo from '@/views/web/accompanying/accompanyingInfo/accompanyingInfo.vue'
import AccompanyingAutograph from '@/views/web/accompanying/accompanyingAutograph/accompanyingAutograph.vue'
import CheckListAdd from '@/views/web/accompanying/checkListAdd/checkListAdd.vue'
import AccompanyingInspectDetails from '@/views/web/accompanying/accompanyingInspectDetails/accompanyingInspectDetails.vue'
import AccompanyingInspectDetailsOther from '@/views/web/accompanying/accompanyingInspectDetails/accompanyingInspectDetailsOther.vue'

import ElectricityList from '@/views/web/electricity/electricityList/electricityList.vue'
import ElectricityPoint from '@/views/web/electricity/electricityPoint/electricityPoint.vue'
import ElectricityDevice from '@/views/web/electricity/electricityDevice/electricityDevice.vue'
import ElectricityDeviceInfo from '@/views/web/electricity/electricityDeviceInfo/electricityDeviceInfo.vue'
import ElectricityWarning from '@/views/web/electricity/electricityWarning/electricityWarning.vue'

import PlanList from '@/views/web/plan/planList/planList.vue'
import PlanAdd from '@/views/web/plan/planAdd/planAdd.vue'
import PlanDetails from '@/views/web/plan/planDetails/planDetails.vue'
import PlanTaskList from '@/views/web/plan/planTaskList/planTaskList.vue'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    // 错误页面路由规则
    ...errorRoutes,
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login', // 登录页
      name: 'login',
      component: Login,
      meta: {
        index: 0
      }
    },
    {
      path: '/home', // 首页
      name: 'home',
      component: Home,
      meta: {
        index: 0
      }
    },
    {
      path: '/person', // 我的
      name: 'person',
      component: Person,
      meta: {
        index: 0
      }
    },
    {
      path: '/task', // 隐患排查列表
      name: 'task',
      component: task,
      meta: {
        index: 1,
        toIndex: true
      }
    },
    {
      path: '/taskAdd', // 新增任务
      name: 'taskAdd',
      component: taskAdd,
      meta: {
        index: 2
      }
    },
    {
      path: '/taskDetails/:taskid', // 任务详情
      name: 'taskDetails',
      component: TaskDetails,
      meta: {
        index: 2
      }
    },
    {
      path: '/enterpriseAdd/:taskid', // 企业添加
      name: 'enterpriseAdd',
      component: EnterpriseAdd,
      meta: {
        index: 3
      }
    },
    {
      path: '/statistics/:taskid', // 统计
      name: 'statistics',
      component: Statistics,
      meta: {
        index: 3
      }
    },
    {
      path: '/report/:taskid', // 报告
      name: 'report',
      component: Report,
      meta: {
        index: 3
      }
    },
    {
      path: '/inspect/:taskdetailid/:taskid/:isCheck', // 巡查页面
      name: 'inspect',
      component: Inspect,
      meta: {
        index: 3
      }
    },
    {
      path: '/inspectDetails/:taskdetailid/:checklistid/:isCheck', // 巡查检查表详情
      name: 'inspectDetails',
      component: InspectDetails,
      meta: {
        index: 4
      }
    },
    {
      path: '/inspectDetailsOther/:taskdetailid/:taskid/:isCheck', // 巡查其他不符合项
      name: 'inspectDetailsOther',
      component: InspectDetailsOther,
      meta: {
        index: 4
      }
    },
    {
      path: '/sign/:taskdetailid', // 签到
      name: 'sign',
      component: Sign,
      meta: {
        index: 4
      }
    },
    {
      path: '/signView/:taskdetailid', // 签到查看
      name: 'signView',
      component: SignView,
      meta: {
        index: 4
      }
    },
    {
      path: '/enterpriseList', // 随行检查任务选择检查对象
      name: 'enterpriseList',
      component: EnterpriseList,
      meta: {
        index: 1
      }
    },
    {
      path: '/accompanyingDetails/:taskid/:taskdetailid/:isCheck', // 随行检查任务
      name: 'accompanyingDetails',
      component: AccompanyingDetails,
      meta: {
        index: 1
      }
    },
    {
      path: '/accompanyingInfo/:taskdetailid/:taskid', // 随行检查信息编辑
      name: 'accompanyingInfo',
      component: AccompanyingInfo,
      meta: {
        index: 2
      }
    },
    {
      path: '/accompanyingAutograph/:taskdetailid/:taskid/:eid', // 随行检查签字
      name: 'accompanyingAutograph',
      component: AccompanyingAutograph,
      meta: {
        index: 2
      }
    },
    {
      path: '/checkListAdd/:taskid/:taskdetailid', // 随行检查添加检查表
      name: 'checkListAdd',
      component: CheckListAdd,
      meta: {
        index: 2
      }
    },
    {
      path: '/accompanyingInspectDetails/:taskdetailid/:gpid/:taskid/:eid/:isCheck', // 随行检查表
      name: 'accompanyingInspectDetails',
      component: AccompanyingInspectDetails,
      meta: {
        index: 2
      }
    },
    {
      path: '/accompanyingInspectDetailsOther/:taskdetailid/:taskid/:eid/:isCheck/:submittype', // 随行检查其他隐患
      name: 'accompanyingInspectDetailsOther',
      component: AccompanyingInspectDetailsOther,
      meta: {
        index: 2
      }
    },
    {
      path: '/electricityList', // 智慧用电企业列表
      name: 'electricityList',
      component: ElectricityList,
      meta: {
        index: 1
      }
    },
    {
      path: '/electricityPoint/:eid', // 智慧用电点位列表
      name: 'electricityPoint',
      component: ElectricityPoint,
      meta: {
        index: 2
      }
    },
    {
      path: '/electricityDevice/:pointId', // 智慧用电设备列表
      name: 'electricityDevice',
      component: ElectricityDevice,
      meta: {
        index: 3
      }
    },
    {
      path: '/electricityDeviceInfo/:equipment_id', // 智慧用电设备信息
      name: 'electricityDeviceInfo',
      component: ElectricityDeviceInfo,
      meta: {
        index: 4
      }
    },
    {
      path: '/electricityWarning/:equipment_id', // 智慧用电设备告警
      name: 'electricityWarning',
      component: ElectricityWarning,
      meta: {
        index: 5
      }
    },
    {
      path: '/planList', // 计划列表
      name: 'planList',
      component: PlanList,
      meta: {
        index: 1
      }
    },
    {
      path: '/planAdd', // 计划列表
      name: 'planAdd',
      component: PlanAdd,
      meta: {
        index: 2
      }
    },
    {
      path: '/planDetails/:planId', // 计划详情
      name: 'planDetails',
      component: PlanDetails,
      meta: {
        index: 2
      }
    },
    {
      path: '/planTaskList/:planId/:planDateId/:planRelationId', // 计划任务列表
      name: 'planTaskList',
      component: PlanTaskList,
      meta: {
        index: 3
      }
    },
  ]
})

export default router
