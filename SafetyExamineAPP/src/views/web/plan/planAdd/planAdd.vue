<!--
 * Author: wsp
 * CreatDate: 2019-07-22
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">任务计划添加</div>
      <div class="H106_add" @click="savePlan">提交</div>
    </div>
    <div class="H106_content">
      <div class="H206_itemOuter">
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name I106_must">计划名称</div>
            <div class="H206_item2Input">
              <textarea v-model="formData.planName" placeholder="请输入文字" name="" id="" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="H206_itemOuter">
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name">备注</div>
            <div class="H206_item2Input">
              <textarea v-model="formData.remark" placeholder="请输入文字" name="" id="" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
      <dateAdd :data="pickData.dates" @update="updateDates"></dateAdd>
      <div class="T106_checkListOuter" v-if="pickData.dates.inputValue.length!==0">
        <div class="T106_checkList" v-for="(item, index) in pickData.dates.inputValue" :key="'dates_'+index">{{item.startDate.inputValue}}——{{item.endDate.inputValue}}</div>
      </div>
      <organizationAdd :data="pickData.organization" @update="updateOrganization"></organizationAdd>
      <div class="T106_checkListOuter" v-if="pickData.organization.inputValue.length!==0">
        <div class="T106_checkList" v-for="(item, index) in pickData.organization.inputValue" :key="'organization_'+index">{{item.jgxzname}}-{{item.jgmc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { plan } from '@/api'
import { toastText } from '@/utils'
import organizationAdd from './body/organizationAdd'
import dateAdd from './body/dateAdd'
export default {
  // 组件名
  name: 'planAdd',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      formData: {
        planName: '', // 计划名称
        remark: '', // 备注
      },
      res: [],
      pickData: {
        dates: {
          name: '计划时间',
          keyName: 'dates',
          placeholder: '请添加',
          isMust: false,
          inputValue: [],
          inputLabel: '',
        },
        organization: {
          name: '检查机构',
          keyName: 'organization',
          placeholder: '请选择',
          isMust: false,
          inputValue: [],
          inputLabel: '',
          values: []
        }
      }
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {},
  // 组件挂载
  components: {
    organizationAdd,
    dateAdd
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
  },
  destroyed() {
  },
  watch: {},
  methods: {
    async savePlanAjax() {
      let isCommit = true
      if(this.formData.planName === '') {
        this.$toast(toastText.fail.nameNull)
        isCommit = false
        return
      }
      let dateList = []
      this.pickData.dates.inputValue.forEach((item) => {
        dateList.push({
          startdate: item.startDate.inputValue,
          enddate: item.endDate.inputValue
        })
      })
      let json = {
        plan: {
          name: this.formData.planName,
          remark: this.formData.remark,
          planDateList: dateList,
          planRelationList: this.pickData.organization.inputValue
        }
      }
      if(isCommit) {
        const res = await plan.savePlan(json)
        if(res && res.status === 10001) {
          this.$toast(toastText.success.addSuccess)
          this.$router.go(-1)
        }
      }
    },
    savePlan() {
      if(this.formData.planName === '') {
        this.$toast(toastText.fail.nameNull)
      } else {
        this.$dialog.confirm({
          title: '提示',
          message: '确认新增"' + this.formData.planName + '"？'
        }).then(() => {
          this.savePlanAjax()
        }).catch(() => {
        })
      }
    },
    updateOrganization(msg) {
      this.pickData[msg.keyName].inputValue = msg.pickerValue
    },
    updateDates(msg) {
      this.pickData[msg.keyName].inputValue = msg.pickerValue
    },
    /**
     * 返回前页
     */
    pageBack() {
      this.$router.go(-1)
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
    .H106_content {overflow: auto; height: 100%; padding-top: val(39); background-color: #ffffff;}
    .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee;}
    .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
    .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
    .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
    .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .H206_itemInput>img {height: val(16); margin-left: val(10);}
    .H206_item2Outer {background-color: #f5f5fa; padding-bottom: val(12);}
    .H206_item2 {padding: 0 val(12); background-color: #ffffff;}
    .H206_item2Name {font-size: val(16); padding: val(12) 0;}
    .H206_item2Input {}
    .H206_item2Input>textarea {border: none; resize: none; width: 100%; font-size: val(16); line-height: val(21);}
    .T106_checkListOuter {padding-left: val(24); border-bottom: 1px solid #eeeeee;}
    .T106_checkListOuter .T106_checkList:first-child {border-top: none;}
    .T106_checkList {padding: val(12) 0; border-top: 1px solid #eeeeee; font-size: val(14);}
    .I106_must:after {content: '*'; color: red;}
</style>
