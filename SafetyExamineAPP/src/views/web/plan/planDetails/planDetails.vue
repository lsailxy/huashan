<!--
 * Author: wsp
 * CreatDate: 2019-07-17
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">{{planName}}详情</div>
      <div class="H106_add"></div>
    </div>
    <div class="H106_content">
      <div class="P106_planInfo">
        <div>计划名称：{{planName}}</div>
        <div>备注：{{res.planRemark}}</div>
      </div>
      <div class="P106_planDate" v-for="(item, index) in res.planList" :key="'planDate_'+index">
        <div>{{item.startdate}}-{{item.enddate}}</div>
        <div class="P106_planBtn" @click="jumpPage('planTaskList', { planId: planId, planDateId: item.planDateId, planRelationId: item.planrelationid }, {startdate: item.startdate, enddate: item.enddate, isNotHasSelfCount: res.isNotHasSelfCount})">进入</div>
      </div>
      <div class="C106_sign">
        <div class="C106_signTop">
          <div class="C106_signTitle">检查机构</div>
        </div>
        <div class="P106_planDept" v-for="(item, index) in res.planRelationList" :key="'planDept_'+index">
          <div class="P106_planDeptName">{{item.depname}}</div>
          <div class="P106_planDeptInfo">计划检查企业：{{item.planInspectEidCount}}</div>
          <div class="P106_planDeptInfo">
            <span class="P106_planDeptInfo1">已检查：{{item.checkedCount}}</span>
            <span class="P106_planDeptInfo2">未检查：{{item.uncheckCount}}</span>
            <span class="P106_planDeptInfo3">不合格：{{item.unqualifiedCount}}</span>
          </div>
          <div class="P106_planDeptInfo">
            <span class="P106_planDeptInfo4">一般隐患：{{item.generalHiddendangerCount}}</span>
            <span class="P106_planDeptInfo5">重大隐患：{{item.majorHiddendangerCount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { plan } from '@/api'
import moment from 'moment'
export default {
  // 组件名
  name: 'planDetails',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      res: {
        planList: [],
        planRelationList: [],
        planRemark: ''
      }
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    planId() {
      return parseInt(this.$route.params.planId)
    },
    planName() {
      return this.$route.query.planName
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
    async initData() {
      let json = {
        planId: this.planId
      }
      const res = await plan.getDetailByPlanId(json)
      if(res && res.status === 10001) {
        this.res = res.result
      }
    },
    /**
     * 返回前一页
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
    .P106_planInfo {background-color: #ffffff; border-bottom: 1px solid #eeeeee; padding: val(10); font-size: val(16); line-height: val(24);}
    .P106_planDate {display: flex; justify-content: space-between; padding: val(5) val(10); background-color: #ffffff; font-size: val(14); line-height: val(24);}
    .P106_planBtn {display: inline-block; padding: val(5); line-height: 1em; border: 1px solid #16a35f; color: #16a35f; font-size: val(14); border-radius: val(5);}
    .C106_sign {background-color: #f5f5fa; padding-bottom: val(12);}
    .C106_signTop {display: flex; justify-content: space-between; padding: val(12); background-color: #ffffff;}
    .C106_signTitle {font-size: val(16); line-height: val(21); color: #000000; font-weight: bold;}
    .C106_signContent {background-color: #ffffff;}
    .P106_planDept {background-color: #ffffff; border-top: 1px solid #e6e6e6;}
    .P106_planDeptName {padding: val(5) val(10); border-bottom: 1px solid #eeeeee; font-size: val(14);}
    .P106_planDeptInfo {padding: val(5) val(10); font-size: val(14);}
    .P106_planDeptInfo>span {width: 8em; display: inline-block;}
    .P106_planDeptInfo1 {color: #16a35f;}
    .P106_planDeptInfo2 {color: orange;}
    .P106_planDeptInfo3 {color: red;}
    .P106_planDeptInfo4 {color: blue;}
    .P106_planDeptInfo5 {color: red;}

</style>
