<!--
 * Author: wsp
 * CreatDate: 2019-05-09
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">设备信息</div>
      <div class="H106_add" v-if="onlineStatus" @click="jumpPage('electricityWarning',{equipment_id: equipment_id})">告警</div>
    </div>
    <div class="H106_content">
      <div class="E306_deviceInfo">
        <div class="E306_device">
          <div class="E306_deviceItem">
            <span class="E306_deviceItemName">所属单位:</span>
            <span class="E306_deviceItemValue">{{enterpriseName}}</span>
          </div>
          <div class="E306_deviceItem">
            <span class="E306_deviceItemName">设备ID:</span>
            <span class="E306_deviceItemValue">{{equipment_id}}</span>
          </div>
          <!--<div class="E306_deviceItem">-->
          <!--<span class="E306_deviceItemName">安装日期:</span>-->
          <!--<span class="E306_deviceItemValue">2019-05-07</span>-->
          <!--</div>-->
        </div>
        <div class="E306_device">
          <!--<div class="E306_deviceStatus clear">-->
          <!--<span class="E306_deviceStatusName">无线通讯状态</span>-->
          <!--<span class="E306_deviceStatusValue">在线</span>-->
          <!--</div>-->
          <div class="E306_deviceStatus clear">
            <span class="E306_deviceStatusName">设备通讯状态</span>
            <span class="E306_deviceStatusValue" :style="{color: onlineStatus?'#3e3e3e':'red'}">{{onlineStatus?'设备在线':'设备离线'}}</span>
          </div>
          <div class="E306_deviceStatus clear">
            <span class="E306_deviceStatusName">报警状态</span>
            <span class="E306_deviceStatusValue">正常</span>
          </div>
        </div>
        <div class="E306_device" v-if="onlineStatus&&lastest.length!==0">
          <div class="E306_deviceItem" v-for="(item, index) in lastest" :key="'lastest_'+index">
            <div  class="E306_progressName">
              <span class="E306_deviceItemName">{{item.dataName}}</span>
              <span class="E306_deviceItemValue">{{item.value}}{{item.unit}}</span>
            </div>
            <div class="E306_progress">
              <!--<div class="E306_progressValue E306_progressValue1">0{{item.unit}}</div>-->
              <plugProgressBar
                :width="'100%'"
                :data="item"
                :index="index"
              ></plugProgressBar>
              <!--<div class="E306_progressValue">{{item.maxValue*2}}{{item.unit}}</div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="E306_deviceCharts">
        <div class="deviceChartOuter" v-for="(item,index) in chartsData" :key="'deviceChart_'+index">
          <deviceChart
            width="100"
            height="100"
            :index="index"
            :data="item"></deviceChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deviceChart from './body/deviceChart'
import plugProgressBar from './body/plugProgressBar'
import { electricity } from '@/api'
export default {
  // 组件名
  name: 'electricityDeviceInfo',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      timeInterval: null,
      typeArr: [],
      unitArr: [],
      lastest: [],
      chartsData: [],
      onlineStatus: false
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    enterpriseName() {
      return this.$route.query.enterpriseName
    },
    equipment_id() {
      return this.$route.params.equipment_id
    }
  },
  // 组件挂载
  components: {
    deviceChart,
    plugProgressBar
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
    this.initData()
    // this.timeInterval = setInterval(()=>{
    //   this.initData()
    // },10000)
  },
  destroyed() {
  },
  watch: {},
  methods: {
    calcPercent(data) {
      let max = parseFloat(data.maxValue) || 0
      let min = parseFloat(data.minValue) || 0
      let val = parseFloat(data.value)
      if(val <= min) {
        return 0
      } else if(val > min && val <= max) {
        let percent = (val - min) / (max - min) * 100
        return percent
      } else {
        return 100
      }
    },
    async initData() {
      let json = {
        deviceId: this.equipment_id
      }
      let res = await electricity.electricity_latest(json)
      if(res && res.status === 10001) {
        this.lastest = res.result.data || []
        this.onlineStatus = res.result.onlineStatus
        if(res.result.data) {
          res.result.data.forEach((item) => {
            this.unitArr.push(item.unit)
          })
        }
        this.unitArr = this.uniq(this.unitArr)
      }
      let json2 = {
        deviceId: this.equipment_id,
        beginTime: new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime(),
        endTime: new Date().getTime()
      }
      let res2 = await electricity.electricity_bytime(json2)
      if(res2 && res2.status === 10001) {
        if(res2.result) {
          this.chartsData = []
          res2.result.forEach((item, index) => {
            this.typeArr.push(item.type)
          })
          this.typeArr = this.uniq(this.typeArr)
          this.typeArr.forEach((item1, index1) => {
            let dataArr = []
            res2.result.forEach((item2, index2) => {
              if(item1 === item2.type) {
                dataArr.push(item2)
              }
            })
            this.chartsData.push({
              name: item1,
              unit: this.unitArr[index1],
              dataMax: 70,
              dataMin: 30,
              series: dataArr
            })
          })
        }
      }
    },
    /**
     *数组去重
     * @param array 传入数组
     * @return 返回去重后的数组
     */
    uniq(array) {
      var temp = []
      var index = []
      var l = array.length
      for(var i = 0; i < l; i++) {
        for(var j = i + 1; j < l; j++) {
          if(array[i] === array[j]) {
            i++
            j = i
          }
        }
        temp.push(array[i])
        index.push(i)
      }
      return temp
    },
    /**
     * 返回上一页
     */
    pageBack() {
      this.$router.go(-1)
    },
    /**
     * 页面跳转
     * @param name 路由名称
     * @param params 路由参数
     * @param query 路由参数
     */
    jumpPage(name, params, query) {
      this.$router.push({
        name: name,
        params: params || {},
        query: query || {}
      })
    },
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(12);}
  .H106_content {overflow: auto; height: 100%; padding-top: val(39); background-color: #f2f2f2;}
  .E306_deviceInfo {background-color: #ffffff; border-bottom: 1px solid #dcdcdc; padding-left: 1rem;}
  .E306_device {border-top: 1px solid #e3e3e3; padding: 1rem 0;}
  .E306_deviceInfo .E306_device:first-child {border-top: none;}
  .E306_deviceItem {font-size: 1.4rem; padding: 0.5rem 0; margin-right: 0.5rem; display: flex;}
  .E306_progressName {width: 35%;}
  .E306_progress {width: 65%; display: flex; font-size: val(14); padding-bottom: 2rem;}
  .E306_progressValue1 {text-align: right;}
  .E306_progressValue {width: 5rem; margin: 0 0.5rem;}
  .E306_deviceItem2 {font-size: 1.3rem;}
  .E306_deviceItemName {color: #8d9099;}
  .E306_deviceItemValue {color: #3e3e3e; margin-left: 0.5rem; margin-right: 1rem;}
  .E306_deviceParams {display: inline-block; padding: 0.5rem 0; font-size: 1.3rem;}
  .E306_deviceStatus {padding: 0.5rem 0; font-size: 1.3rem;}
  .E306_deviceStatusName {color: #8d9099;}
  .E306_deviceStatusValue {color: #3e3e3e; float: right; text-align: left; display: inline-block; margin-right: 2rem; min-width: 5rem;}
  .E306_deviceCharts {}
  .deviceChartOuter {height: 26rem;margin-top: 1rem; border-top: 1px solid #dcdcdc; background-color: #ffffff;}
</style>
