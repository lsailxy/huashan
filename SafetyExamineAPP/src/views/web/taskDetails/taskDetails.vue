<!--
 * Author: wsp
 * CreatDate: 2019-06-28
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">任务详情</div>
      <div class="H106_add">
      </div>
    </div>
    <div class="H106_content">
      <div class="H206_itemOuter">
        <div class="H206_item">
          <div class="H206_itemName">任务名称</div>
          <div class="H206_itemInput">
            <span>{{res.taskDetail.name}}</span>
          </div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">检查表</div>
          <div class="H206_itemInput">
            <span v-for="(item, index) in res.checklist" :key="'checklist_'+index">{{index === 0?'':'、'}}{{item.name}}</span>
          </div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">巡查人</div>
          <div class="H206_itemInput">
            <span>{{res.taskDetail.patrolusername}}</span>
          </div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">同行人</div>
          <div class="H206_itemInput">
            <span>{{res.taskDetail.otherpeople || '未录入'}}</span>
          </div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">随行人</div>
          <div class="H206_itemInput">
            <span>{{res.taskDetail.accompanyingperson || '未录入'}}</span>
          </div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">计划开始时间</div>
          <div class="H206_itemInput">
            <span>{{res.taskDetail.startdate}}</span>
          </div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">计划结束时间</div>
          <div class="H206_itemInput">
            <span>{{res.taskDetail.enddate}}</span>
          </div>
        </div>
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name">备注</div>
            <div class="H206_item2Input">
              <div class="T106_remark">{{res.taskDetail.remark}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="C106_check">
        <div class="C106_signTop">
          <div class="C106_signTitle">检查对象</div>
          <!--<div class="H206_companyBtn" @click="jumpPage('enterpriseAdd', {taskid: taskid})">-->
            <!--<span>添加企业</span>-->
          <!--</div>-->
        </div>
        <ul class="H106_list">
          <li v-for="(item, index) in res.enterpriselist" :key="'task_'+index" @click="jumpPage('inspect',{taskdetailid: item.id, taskid: taskid, isCheck: (item.taskstatus === 1&&res.taskDetail.patroluserid === userId)?0:1})">
            <div class="H106_itemOuter">
              <div class="H106_item">
                <div class="H106_itemName">{{item.enterprisename}}</div>
              </div>
              <div class="H106_item">
                <div class="H106_itemDatas">
                  <div class="H106_itemData">
                    <span>企业负责人：</span>
                    <span>{{item.person}}</span>
                  </div>
                </div>
                <div class="H106_itemSign H106_itemSign1" v-if="item.taskstatus === 1">待巡查</div>
                <div class="H106_itemSign H106_itemSign1" v-if="item.taskstatus === 2">巡查合格</div>
                <div class="H106_itemSign H106_itemSign1" v-if="item.taskstatus === 3">待回头看</div>
                <div class="H106_itemSign H106_itemSign1" v-if="item.taskstatus === 4">完成</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="T206_taskButtonOuter">
        <div class="T206_taskButton" @click="jumpPage('report', {taskid: taskid},{taskName: res.taskDetail.name})">报告</div>
        <div class="T206_taskButton" @click="jumpPage('statistics', {taskid: taskid})">统计</div>
      </div>
    </div>
  </div>
</template>

<script>
import { task } from '@/api'
import moment from 'moment'
export default {
  // 组件名
  name: 'taskDetails',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      userId: JSON.parse(localStorage.getItem('userInfo')).ID,
      res: {
        checklist: [],
        enterpriselist: [],
        taskDetail: {},
      }
    }
  },
  // 组件过滤器
  filters: {
    dateFormat(data) {
      if(data) {
        return moment(data).format('YYYY.MM.DD')
      }
    }
  },
  // 组件计算属性
  computed: {
    taskid() {
      return this.$route.params.taskid
    }
  },
  // 组件挂载
  components: {},
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
    this.initData()
  },
  destroyed() {
  },
  watch: {},
  methods: {
    pageBack() {
      this.$router.go(-1)
    },
    async initData() {
      let json = {
        taskid: this.taskid
      }
      const res = await task.getSelfTaskDetail(json)
      if(res && res.status === 10001) {
        this.res = res.result
      }
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
    .H106_content {overflow: auto; height: 100%; padding-top: val(42); padding-bottom: val(45); background-color: #f5f5fa;}
    .H206_itemOuter {}
    .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee;background-color: #ffffff;}
    .H206_itemName {font-size: val(16); color: #808080; width: 30%;line-height: 1em;}
    .H206_itemInput {font-size: val(16); width: 70%; text-align: left;line-height: 1em;}
    .H206_itemInput>span {color: #000000; font-size: val(16);line-height: 1em; display: inline-block;max-width: 80%;}
    .H206_itemInput>img {height: val(16); margin-left: val(10);}
    .H206_item2Outer {background-color: #f5f5fa; padding-bottom: val(12); margin-top: val(12);}
    .H206_item2 {padding: 0 val(12); background-color: #ffffff;}
    .H206_item2Name {font-size: val(16); padding: val(12) 0;}
    .H206_item2Input {padding: val(5) val(5) val(10);}
    .T106_remark {background-color: #f4f4f4; color: #9c9fa1; font-size: val(14); padding: val(6); line-height: 1.8em;}
    .C106_company {background-color: #f5f5fa; padding-bottom: 1rem;}
    .C106_companyItems {display: flex; justify-content: space-between; color: #333333; font-size: 1.2rem; padding: 1rem;}
    .C106_companyName {width: 70%;}
    .C106_companyArea {width: 20%; text-align: right;}
    .C106_companyItem {width: 50%;}
    .C106_companyItem2 {flex: 2;}
    .C106_sign {background-color: #f5f5fa; padding-bottom: 1rem;}
    .C106_signTop {display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid #e6e6e6;}
    .C106_signTitle {font-size: 1.33rem; line-height: 1.8rem; color: #000000; font-weight: bold;}
    .C106_signContent {background-color: #ffffff;}
    .C106_signItems {display: flex; justify-content: space-between; color: #333333; font-size: 1.2rem; background-color: #ffffff; padding: 1rem;}
    .C106_signItem1 {width: 35%;}
    .C106_signItem2 {width: 100%;}
    .C106_signItem3 {width: 55%;}
    .H106_list {background-color: #ffffff;}
    .H106_list>li {padding-left: val(21); padding-right: val(12);}
    .H106_itemOuter {border-bottom: 1px solid #e9e9e9; padding: val(12) 0;}
    .H106_item {display: flex; justify-content: space-between; padding: val(6) 0 0; line-height: val(18);}
    .H106_itemName {width: 70%; color: #333333; font-size: val(17); font-weight: bold;}
    .H106_itemDate {color: #999999; font-size: val(13);}
    .H106_itemDatas {max-width: 60%;}
    .H106_itemData {color: #808080; font-size: val(14); padding: val(6) 0;}
    .H106_itemNumber {display: inline-block; color: #16a35f; font-size: val(12); background-color: #e3fff1; padding: 0 val(12); border-radius: 2px;}
    .H106_itemSign {font-size: val(14); display: inline-block; height: val(28); line-height: val(28); border-radius: val(3); width: val(70); text-align: center; margin-top: val(30);}
    .H106_itemSign1 {box-shadow: 0 0 0.33rem rgba(0,156,255,.3); color: #009cff;}
    .H106_itemSign2 {box-shadow: 0 0 0.33rem rgba(252,135,68,.3); color: #fc8744;}
    .T206_taskButtonOuter {display: flex; justify-content: space-around; background-color: #ffffff; position: absolute; left: 0; bottom: 0; width: 100%; border-top: 1px solid #cccccc;}
    .T206_taskButton {font-size: val(14); line-height: 1em; padding: val(12); width: 50%; text-align: center;border-left: 1px solid #eeeeee;}
    .T206_taskButtonOuter .T206_taskButton:first-child {border-left: none;}
    .H206_companyBtn {display: inline-block; height: val(21); line-height: val(21); padding: 0 val(6); border: 1px solid #16a35f; border-radius: 2px;}
    .H206_companyBtn>span {color: #16a35f; font-size: val(12); line-height: 1em;}
    .H206_companyBtn>img {width: val(12); vertical-align: baseline; margin-right: val(3);}
</style>
