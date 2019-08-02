<!--
 * Author: wsp
 * CreatDate: 2019-06-24
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">创建任务</div>
      <div class="H106_add" @click="submitData()">提交</div>
    </div>
    <div class="H106_content">
      <div class="H206_itemOuter">
        <div class="H206_item">
          <div class="H206_itemName I106_must">任务名称</div>
          <div class="H206_itemInput">
            <input v-model="formData.taskName" type="text" placeholder="请输入任务名称">
          </div>
        </div>
        <multiPicker :data="pickData.checklist" @change="updateMultiPicker"></multiPicker>
        <div class="T106_checkListOuter" v-if="pickData.checklist.inputValue.length!==0">
          <div class="T106_checkList" v-for="(item, index) in pickData.checklist.inputValue" :key="'checkListChoose_'+index">{{item.name}}</div>
        </div>
        <onePicker :data="pickData.user" @change="updateOnePicker"></onePicker>
        <peer :data="pickData.peer" @update="updatePeer($event)"></peer>
        <accompanyingAdd :data="pickData.accompanying" @update="updateAccompanying"></accompanyingAdd>
        <onePicker :data="pickData.selfTaskNature" @change="updateOnePicker"></onePicker>
        <switchButton v-model="pickData.isleader"></switchButton>
        <div v-if="$route.query.planId">
          <div class="H206_item">
            <div class="H206_itemName I106_must">计划开始时间</div>
            <div class="H206_itemInput">{{$route.query.startDate}}</div>
          </div>
          <div class="H206_item">
            <div class="H206_itemName I106_must">计划结束时间</div>
            <div class="H206_itemInput">{{$route.query.endDate}}</div>
          </div>
        </div>
        <div v-else>
          <datePicker :data="pickData.startDate" @change="updateDatePicker" ref="startDate"></datePicker>
          <datePicker :data="pickData.endDate" @change="updateDatePicker" ref="endDate"></datePicker>
        </div>
        <!--<onePicker :data="pickData.enterpriseStatus" @change="updateOnePicker"></onePicker>-->
        <addEnterprise :data="pickData.enterprise" ref="enterpriseList" @update="updateEnterpriseValues"></addEnterprise>
        <div class="T106_checkListOuter" v-if="pickData.enterprise.inputValue.length!==0">
          <div class="T106_checkList" v-for="(item, index) in pickData.enterprise.inputValue" :key="'enterprise_'+item.enterpriseid">{{item.typename}}-{{item.name}}</div>
        </div>
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name">备注</div>
            <div class="H206_item2Input">
              <textarea v-model="formData.remark" placeholder="请输入文字" name="" id="" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { task } from '@/api'
import onePicker from '@/components/public/form/onePicker'
import datePicker from '@/components/public/form/datePicker'
import multiPicker from '@/components/public/form/multiPicker'
import switchButton from '@/components/public/form/switchButton'
import addEnterprise from './body/addEnterprise'
import peer from './body/peer'
import accompanyingAdd from './body/accompanying'
import moment from 'moment'
export default {
  // 组件名
  name: 'taskAdd',
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
        taskName: '', // 任务名称
        checklist: [],
        remark: '', // 任务备注
      },
      pickData: {
        enterpriseStatus: {
          name: '企业类型',
          keyName: 'enterpriseStatus',
          type: 'onePicker',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '无企业类型，请创建相关类型',
          choseItem: {},
          defaultIndex: 0,
          inputValue: '',
          inputLabel: '',
          values: []
        },
        selfTaskNature: {
          name: '任务性质',
          keyName: 'selfTaskNature',
          type: 'onePicker',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '无任务性质，请创建相关性质',
          choseItem: {},
          defaultIndex: 0,
          inputValue: '',
          inputLabel: '',
          values: []
        },
        isleader: {
          name: '领导带队',
          keyName: 'isleader',
          type: 'switchButton',
          isMust: false,
          inputValue: false,
        },
        user: {
          name: '巡查人',
          keyName: 'user',
          type: 'onePicker',
          placeholder: '默认为当前用户',
          isMust: false,
          noDataToast: '无巡查人，请创建相关人员',
          choseItem: {},
          defaultIndex: 0,
          inputValue: '',
          inputLabel: '',
          values: []
        },
        peer: {
          name: '同行人员',
          keyName: 'peer',
          placeholder: '请选择',
          values: [],
          inputValue: '',
          inputLabel: ''
        },
        accompanying: {
          name: '随行人员',
          keyName: 'accompanying',
          placeholder: '请添加',
          values: [],
          inputValue: ''
        },
        startDate: {
          name: '计划开始时间',
          keyName: 'startDate',
          type: 'datePicker',
          placeholder: '请选择',
          isMust: true,
          inputValue: '',
        },
        endDate: {
          name: '计划结束时间',
          keyName: 'endDate',
          type: 'datePicker',
          placeholder: '请选择',
          isMust: true,
          inputValue: '',
        },
        checklist: {
          name: '检查表',
          keyName: 'checklist',
          type: 'multiPicker',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '无检查表，请创建检查表',
          inputValue: [],
          values: []
        },
        enterprise: {
          name: '被巡查企业',
          keyName: 'enterprise',
          isMust: true,
          noDataToast: '无相关企业',
          inputValue: []
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
    onePicker,
    datePicker,
    multiPicker,
    switchButton,
    addEnterprise,
    peer,
    accompanyingAdd
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
    this.getDict()
  },
  destroyed() {
  },
  watch: {},
  methods: {
    pageBack() {
      this.$router.go(-1)
    },
    async getDict() {
      const res = await task.toadd()
      if(res && res.status === 10001) {
        this.pickData.enterpriseStatus.values = res.result.enterpriseStatus || []
        if(res.result.user) {
          res.result.user.forEach((item) => {
            this.pickData.user.values.push({
              id: item.iD,
              name: item.uSERNAME
            })
            this.pickData.peer.values.push({
              id: item.iD,
              name: item.uSERNAME
            })
          })
        }
        this.pickData.checklist.values = res.result.checklist || []
        this.pickData.selfTaskNature.values = res.result.selfTaskNature || []
      }
    },
    updateOnePicker(msg) {
      this.pickData[msg.keyName].inputValue = msg.choseItem.id
      this.pickData[msg.keyName].inputLabel = msg.choseItem.name
      if(msg.keyName === 'enterpriseStatus') {
        this.pickData.enterprise.values = []
        this.pickData.enterprise.inputValue = []
        this.$refs.enterpriseList.initData()
      }
    },
    async updateEnterpriseValues(msg) {
      this.pickData[msg.keyName].inputValue = msg.pickerValue
    },
    updateMultiPicker(msg) {
      this.formData[msg.keyName] = []
      this.pickData[msg.keyName].inputValue = msg.data
      msg.data.forEach((item) => {
        this.formData[msg.keyName].push(item.id)
      })
    },
    updateDatePicker(msg) {
      this.pickData[msg.keyName].inputValue = msg.data
      if(moment(this.pickData.endDate.inputValue, 'YYYY-MM-DD').valueOf() < moment(this.pickData.startDate.inputValue, 'YYYY-MM-DD').valueOf()) {
        this.$toast('截止时间不能小于开始时间')
        this.$refs[msg.keyName].chooseError()
        this.pickData[msg.keyName].inputValue = ''
      }
    },
    updatePeer(msg) {
      let ids = []
      let names = []
      msg.pickerValue.forEach((item) => {
        ids.push(item.id)
        names.push(item.name)
      })
      this.pickData[msg.pickerName].inputValue = ids.join(',')
      this.pickData[msg.pickerName].inputLabel = names.join(',')
    },
    updateAccompanying(msg) {
      this.pickData.accompanying.inputValue = msg
    },
    /**
     * 判空验证
     * @param data 输入和选择的数据
     * @param basicMessage 基础必填的项
     * @param message 相关联需要进行判断的项
     * @returns {boolean}
     */
    verification(data, basicMessage, message) {
      for(let key in basicMessage) {
        if(data[key] === '') {
          this.$toast(basicMessage[key])
          return false
        }
      }
      return true
    },
    async submitData() {
      let isCommit = true
      let enterpriseIds = []
      let enterprisenames = []
      if(this.pickData.enterprise.inputValue.length === 0) {
        this.$toast('至少选择一家企业')
        isCommit = false
        return
      }
      this.pickData.enterprise.inputValue.forEach((item) => {
        enterpriseIds.push(item.id)
        enterprisenames.push(item.name)
      })
      let json = {
        name: this.formData.taskName,
        checklistid: this.formData.checklist.join(','),
        patrolusername: this.pickData.user.inputLabel,
        patroluserid: this.pickData.user.inputValue,
        otherpeople: this.pickData.peer.inputValue,
        accompanyingperson: this.pickData.accompanying.inputValue,
        // enterprisestatus: this.pickData.enterpriseStatus.inputValue,
        remark: this.formData.remark,
        startdate: this.$route.query.planId ? this.$route.query.startDate : this.pickData.startDate.inputValue,
        enddate: this.$route.query.planId ? this.$route.query.endDate : this.pickData.endDate.inputValue,
        enterprisesList: this.pickData.enterprise.inputValue,
        tasknature: this.pickData.selfTaskNature.inputValue,
        isleader: this.pickData.isleader.inputValue ? 1 : 0,
        planid: this.$route.query.planId || '',
        plandateid: this.$route.query.planDateId || '',
        planrelationid: this.$route.query.planRelationId || ''
      }
      let basicMessage = {
        name: '请填写任务名称',
        startdate: '开始时间未选择',
        enddate: '结束时间未选择'
      }
      isCommit = this.verification(json, basicMessage, {})
      if(isCommit) {
        const res = await task.saveTask(json)
        if(res && res.status === 10001) {
          this.$toast('保存成功')
          this.$router.go(-1)
        }
      }
    }
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    /*新建任务*/
    .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
    .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 100;}
    .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
    .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12)}
    .H106_return>img {height: val(18);}
    .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
    .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #ffffff;}
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
    .C106_company {background-color: #f5f5fa; padding-bottom: val(12);}
    .C106_companyItems {display: flex; justify-content: space-between; color: #333333; font-size: val(15); background-color: #ffffff; padding: val(12);}
    .C106_companyName {width: 70%;}
    .C106_companyArea {width: 20%; text-align: right;}
    .C106_companyItem {width: 50%;}
    .C106_companyItem2 {flex: 2;}
    .C106_sign {background-color: #f5f5fa; padding-bottom: val(12);}
    .C106_signTop {display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid #e6e6e6; background-color: #ffffff;}
    .C106_signTitle {font-size: val(16); line-height: val(21); color: #000000; font-weight: bold;}
    .C106_signContent {background-color: #ffffff;}
    .C106_signItems {display: flex; justify-content: space-between; color: #333333; font-size: val(15); background-color: #ffffff; padding: val(12);}
    .C106_signItem1 {width: 35%;}
    .C106_signItem2 {width: 100%;}
    .C106_signItem3 {width: 55%;}
    .C106_checkList {padding: 0 val(12);}
    .C106_checkInfos {display: flex; justify-content: space-between; padding: val(12) 0; border-bottom: 1px solid #e6e6e6;}
    .C106_checkInfo {width: 80%;}
    .C106_checkName {font-size: val(15); color: #3a3939; padding: val(6) 0;}
    .C106_checkNumbers {font-size: val(13); display: flex; padding: val(6) 0 0;}
    .C106_checkNumberName {color: #9d9b9b;line-height: val(20);}
    .C106_checkNumber {display: inline-block;width: val(20); text-align: center; height: val(20); line-height: val(20); border-radius: 50%; margin-right: val(6); vertical-align: middle;}
    .C106_checkNumber1 {color: #16a35f; background-color: #e3fff2;}
    .C106_checkNumber2 {color: #ff1800; background-color: #ffe6e3;}
    .C106_checkNumber3 {color: #4e8ff8; background-color: #e3eeff;}
    .C106_checkBtn {font-size: val(14); display: inline-block; height: val(28); line-height: val(28); border-radius: val(3); width: val(50); text-align: center; box-shadow: 0 0 val(4) rgba(78,143,248,.3); color: #4e8ff8;}
    .T106_checkListOuter {padding-left: val(24); border-bottom: 1px solid #eeeeee;}
    .T106_checkListOuter .T106_checkList:first-child {border-top: none;}
    .T106_checkList {padding: val(12) 0; border-top: 1px solid #eeeeee; font-size: val(14);}
    .I106_must:after {content: '*'; color: red;}
</style>
