<!--
 * Author: wsp
 * CreatDate: 2019-06-26
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">检查信息</div>
      <div class="H106_add" @click="submitData()">保存</div>
    </div>
    <div class="I106_content">
      <div class="H206_itemOuter">
        <!--<div class="H206_item">-->
          <!--<div class="H206_itemName">任务名称</div>-->
          <!--<div class="H206_itemInput">-->
            <!--<input type="text" placeholder="请输入任务名称" v-model="formData.taskName">-->
          <!--</div>-->
        <!--</div>-->
        <div class="H206_item">
          <div class="H206_itemName">检查机构</div>
          <div class="H206_itemInput">
            <span>{{res.taskShow.depname}}</span>
          </div>
        </div>
        <!--<div class="H206_item">-->
          <!--<div class="H206_itemName">检查时间</div>-->
          <!--<div class="H206_itemInput">-->
            <!--<span>{{res.taskShow.checkdate | dateFormat}}</span>-->
          <!--</div>-->
        <!--</div>-->
        <onePicker :data="pickData.selfTaskNature" @change="updateOnePicker"></onePicker>
        <switchButton v-model="pickData.isleader"></switchButton>
        <peer :data="pickData.peer" @update="updatePeer($event)"></peer>
        <accompanyingAdd :data="pickData.accompanying" @update="updateAccompanying"></accompanyingAdd>
        <addEnterprise :data="pickData.enterprise" @updateList="updateEnterpriseList" ref="enterpriseList"></addEnterprise>
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name">备注</div>
            <div class="H206_item2Input">
              <textarea v-model="res.taskShow.remark" placeholder="请输入文字" name="" id="" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import onePicker from '@/components/public/form/onePicker'
// import datePicker from '@/components/public/form/datePicker'
// import multiPicker from '@/components/public/form/multiPicker'
import switchButton from '@/components/public/form/switchButton'
import peer from './body/peer'
import addEnterprise from './body/addEnterprise'
import accompanyingAdd from './body/accompanying'
import { task, accompanying } from '@/api'
import { toastText } from '@/utils'
import moment from 'moment'
export default {
  // 组件名
  name: 'accompanyingInfo',
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
        taskShow: {}
      },
      sonCompaniesTree: [], // 选中检查对象的树节点id
      pickData: {
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
        selfTaskNature: {
          name: '检查性质',
          keyName: 'selfTaskNature',
          type: 'onePicker',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '无检查性质，请创建相关检查性质',
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
        inspectStandard: {
          name: '检查标准',
          keyName: 'inspectStandard',
          type: 'onePicker',
          placeholder: '请选择',
          isMust: false,
          choseItem: {},
          defaultIndex: 0,
          inputValue: '',
          inputLabel: '',
          values: []
        },
        enterprise: {
          name: '被检查对象',
          keyName: 'enterprise',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '无相关企业',
          chooseItem: {},
          inputValue: '',
          inputLabel: '',
          inputType: '',
          type: '',
          types: [],
          values: []
        },
      }
    }
  },
  // 组件过滤器
  filters: {
    dateFormat(data) {
      if(data) {
        return moment(data).format('YYYY-MM-DD')
      }
    }
  },
  // 组件计算属性
  computed: {
    taskdetailid() {
      return this.$route.params.taskdetailid
    },
    taskid() {
      return this.$route.params.taskid
    }
  },
  // 组件挂载
  components: {
    onePicker,
    // datePicker,
    // multiPicker,
    switchButton,
    peer,
    accompanyingAdd,
    addEnterprise
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
    this.initData()
  },
  destroyed() {
  },
  watch: {
    sonCompaniesTree(val) {
      this.$refs.elTreeShow.filter(val)
    }
  },
  methods: {
    filterNode(value, data, node) {
      let isShow = false
      for(let i = 0; i < value.length; i++) {
        if(data.id === value[i].id) {
          value[i].eid = data.eid
          isShow = true
          break
        }
      }
      return isShow
    },
    pageBack() {
      this.$router.go(-1)
    },
    async initData() {
      let json = {
        taskdetailid: this.taskdetailid
      }
      const res = await accompanying.toAccompanyTaskEdit(json)
      const res2 = await task.toadd()
      if(res && res.status === 10001) {
        this.res = res.result
        this.pickData.peer.inputValue = this.res.taskShow.otherpeople
        this.pickData.peer.inputLabel = this.res.taskShow.otherpeopleName
        this.pickData.accompanying.inputValue = this.res.taskShow.accompanyingperson
        this.pickData.selfTaskNature.values = res.result.selfTaskNature || []
        this.pickData.selfTaskNature.inputValue = res.result.taskShow.tasknature
        this.pickData.selfTaskNature.inputLabel = res.result.taskShow.tasknaturename
        this.pickData.enterprise.inputValue = res.result.taskShow.enterprise
        this.pickData.enterprise.inputLabel = res.result.taskShow.enterprisename
        this.pickData.enterprise.inputType = res.result.taskShow.enterprisestatus
        this.pickData.isleader.inputValue = res.result.taskShow.isleader === '0' ? 0 : true
      }
      if(res2 && res2.status === 10001) {
        if(res2.result.user) {
          res2.result.user.forEach((item) => {
            this.pickData.peer.values.push({
              id: item.iD,
              name: item.uSERNAME
            })
          })
        }
        if(res2.result.enterpriseStatus) {
          res2.result.enterpriseStatus.forEach((item) => {
            this.pickData.enterprise.types.push({
              text: item.name,
              value: item.id
            })
          })
          this.pickData.enterprise.type = this.pickData.enterprise.types[0].value
          this.updateEnterpriseList({
            currentPage: 1,
            searchValue: '',
            type: this.pickData.enterprise.type
          })
        }
      }
    },
    /**
     * 加载列表
     * @param msg 信息
     */
    async updateEnterpriseList(msg) {
      if(msg.type) {
        let json = {
          currentPage: msg.currentPage,
          keyword: msg.searchValue,
          type: msg.type
        }
        const res = await task.getEnterprise(json)
        if(res && res.status === 10001) {
          if(msg.currentPage > 1) {
            this.pickData.enterprise.values = this.pickData.enterprise.values.concat(res.result.list)
          } else {
            this.pickData.enterprise.values = res.result.list
          }
          this.$refs.enterpriseList.currentPage = msg.currentPage
          this.$refs.enterpriseList.isAllLoad(res.result.total)
          this.pickData.enterprise.values.forEach((item, index) => {
            if(item.enterpriseid === this.$refs.enterpriseList.result.enterpriseid) {
              item.checked = true
            }
          })
        } else {
          this.$refs.enterpriseList.errorHandle()
        }
      }
    },
    async updateOnePicker(msg) {
      this.pickData[msg.keyName].inputValue = msg.choseItem.id
      this.pickData[msg.keyName].inputLabel = msg.choseItem.name
    },
    updateMultiPicker(msg) {
      this.pickData[msg.keyName].inputValue = msg.data
      msg.data.forEach((item) => {
        this.formData[msg.keyName].push(item.id)
      })
    },
    updateDatePicker(msg) {
      this.pickData[msg.keyName].inputValue = msg.data
      if(moment(this.pickData.endDate.inputValue, 'YYYY-MM-DD').valueOf() < moment(this.pickData.startDate.inputValue, 'YYYY-MM-DD').valueOf()) {
        this.$toast('结束时间不能早于开始时间')
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
    // 更新选中的企业区域/部门
    updateSonCompaniesTree(msg) {
      this.pickData[msg.keyName].inputValue = [msg.pickerTree[0].id]
      this.sonCompaniesTree = [msg.pickerTree[0]]
    },
    /**
     *数组去重
     * @param array 传入数组
     * @return [] 返回去重后的数组
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
    async submitData() {
      let isCommit = true
      let json = {
        taskdetailid: this.taskdetailid,
        taskid: this.taskid,
        enterprise: this.pickData.enterprise.inputValue,
        enterprisename: this.pickData.enterprise.inputLabel,
        enterprisestatus: this.pickData.enterprise.inputType,
        otherpeople: this.pickData.peer.inputValue,
        accompanyingperson: this.pickData.accompanying.inputValue,
        isleader: this.pickData.isleader.inputValue ? 1 : 0,
        tasknature: this.pickData.selfTaskNature.inputValue,
        remark: this.res.taskShow.remark,
        signid: this.res.taskShow.signid,
      }
      if(isCommit) {
        const res = await accompanying.updateAccompanyTask(json)
        if(res && res.status === 10001) {
          this.$toast(toastText.success.saveSuccess)
          this.$router.go(-1)
        }
      }
    },
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: 50%; margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(18);}
  .I106_content {overflow: auto; height: 100%; padding-top: val(42);}
  .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee; background-color: #ffffff;}
  .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
  .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
  .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .H206_company {background-color: #f5f5fa; padding-bottom: val(12);}
  .H206_companyTop {padding: val(18) val(12) val(3.6); display: flex; justify-content: space-between;}
  .H206_companyTitle {color: #666666;font-size: val(14); line-height: val(21);}
  .H206_companyBtnOuter {}
  .H206_companyBtn {display: inline-block; height: val(21); line-height: val(21); padding: 0 val(6); border: 1px solid #16a35f; border-radius: 2px; margin-left: val(10)}
  .H206_companyBtn>span {color: #16a35f; font-size: val(12);}
  .H206_companyBtn>img {width: val(12); vertical-align: sub;}
  .H206_companyContent {background-color: #ffffff; padding: val(18) val(12) 0;}
  .H206_companyName {display: inline-block; font-size: val(14); height: val(36); line-height: val(36); border-radius: val(18); border: 1px solid #e8ecf1; color: #303030; padding: 0 val(12); margin-bottom: val(18); margin-right: val(5)}
  .H206_companyNameCur {border: none; background-color: #39b177; color: #ffffff;}
  .H206_item2Outer {background-color: #f5f5fa; padding-bottom: val(12);}
  .H206_item2 {padding: 0 val(12); background-color: #ffffff;}
  .H206_item2Name {font-size: val(16); padding: val(12) 0;}
  .H206_item2Input {}
  .H206_item2Input>textarea {border: none; resize: none; width: 100%; font-size: val(16); line-height: val(21);}
  .span-ellipsis {width: 100%;font-size: 1.4rem!important; border-bottom: 1px solid #e8e7ed; padding: val(12) val(36) val(12) 0;line-height: 2rem;}
  .T106_checkListOuter {padding-left: val(28); border-bottom: 1px solid #eeeeee; background-color: #ffffff;}
  .T106_checkListOuter .T106_checkList:first-child {border-top: none;}
  .T106_checkList {padding: val(12) 0; border-top: 1px solid #eeeeee; font-size: val(14); color: #606266;}
</style>
