<!--
 * Author: wsp
 * CreatDate: 2019-06-29
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">企业排查</div>
      <div class="H106_add" v-show="isCheck==0" @click="commitData">提交</div>
    </div>
    <div class="H106_content">
      <div class="C106_company" v-if="res.enterpriseDetail">
        <div class="C106_companyItems">
          <div class="C106_companyName">{{res.enterpriseDetail.name}}</div>
          <div class="C106_companyArea">{{res.enterpriseDetail.address}}</div>
        </div>
        <div class="C106_companyItems">
          <div class="C106_companyItem">企业负责人：{{res.enterpriseDetail.person}}</div>
          <div class="C106_companyItem">联系电话：{{res.enterpriseDetail.tel}}</div>
        </div>
        <div class="C106_companyItems">
          <div class="C106_companyItem C106_companyItem2">地址：{{res.enterpriseDetail.address}}</div>
        </div>
      </div>
      <div class="C106_sign">
        <div class="C106_signTop">
          <div class="C106_signTitle">签到信息</div>
          <div class="H206_companyBtnOuter">
            <div class="H206_companyBtn" v-if="(!res.sign) && (isCheck==0)" @click="jumpPage('sign', {taskdetailid: taskdetailid})">
              <img src="@/assets/images/C106_icon1.png" alt="">
              <span>签到</span>
            </div>
            <div class="H206_companyBtn"  v-if="res.sign" @click="jumpPage('signView', {taskdetailid: taskdetailid})">
              <img src="@/assets/images/C106_icon1.png" alt="">
              <span>点击查看</span>
            </div>
            <div class="H206_noSign" v-if="(!res.sign) && (isCheck==1)">未签到</div>
          </div>
        </div>
        <div class="C106_signContent" v-if="res.sign">
          <div class="C106_signItems">
            <div class="C106_signItem C106_signItem1">签到人员：{{res.sign.signusername}}</div>
            <div class="C106_signItem C106_signItem3">签到时间：{{res.sign.signtime}}</div>
          </div>
          <div class="C106_signItems">
            <div class="C106_signItem C106_signItem2">同行人员：{{res.sign.otherpeople || '未录入'}}</div>
          </div>
          <div class="C106_signItems">
            <div class="C106_signItem C106_signItem2">随行人员：{{res.sign.accompanyingperson || '未录入'}}</div>
          </div>
          <div class="C106_signItems">
            <div class="C106_signItem C106_signItem2">签到地点：{{res.sign.signaddress}}</div>
          </div>
        </div>
      </div>
      <div class="C106_check">
        <div class="C106_signTop">
          <div class="C106_signTitle">巡查信息</div>
        </div>
        <div class="C106_checkList">
          <div class="C106_checkInfos" v-for="(item, index) in res.patrols" :key="'patrols_'+index" @click="jumpPage('inspectDetails', {taskdetailid: taskdetailid, checklistid: item.taskhiddenid, isCheck: isCheck})">
            <div class="C106_checkInfo">
              <div class="C106_checkName">{{item.checklist}}</div>
              <div class="C106_checkNumbers">
                <span class="C106_checkNumberName">合格数：</span>
                <span class="C106_checkNumber C106_checkNumber1">{{item.correctCount}}</span>
                <span class="C106_checkNumberName">不合格数：</span>
                <span class="C106_checkNumber C106_checkNumber2">{{item.wrongCount}}</span>
                <span class="C106_checkNumberName">未检查数：</span>
                <span class="C106_checkNumber C106_checkNumber3">{{item.uncheckCount}}</span>
              </div>
            </div>
            <div class="C106_checkBtn">{{isCheck==1?'查看':'巡查'}}</div>
          </div>
          <div class="C106_checkInfos" @click="jumpPage('inspectDetailsOther', {taskdetailid: taskdetailid,taskid: taskid, isCheck: isCheck},true)">
            <div class="C106_checkInfo">
              <div class="C106_checkName">其他隐患</div>
              <div class="C106_checkNumbers">
                <span class="C106_checkNumberName">不合格数：</span>
                <span class="C106_checkNumber C106_checkNumber2" v-if="res.otherPatrols">{{res.otherPatrols.length}}</span>
              </div>
            </div>
            <div class="C106_checkBtn">{{isCheck==1?'查看':'巡查'}}</div>
          </div>
        </div>
      </div>
      <iframe id="pdfIframe" src="" frameborder="0" width="0" height="0"></iframe>
    </div>
  </div>
</template>

<script>
import { inspect } from '@/api'
import { toastText } from '@/utils'
export default {
  // 组件名
  name: 'inspect',
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
        enterpriseDetail: {}, // 企业信息
        patrols: [], // 检查内容
        otherPatrols: [], // 其他不合格项
        sign: {}, // 签到信息
      }
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    taskdetailid() {
      return this.$route.params.taskdetailid
    },
    taskid() {
      return this.$route.params.taskid
    },
    isCheck() {
      return this.$route.params.isCheck
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
        taskdetailid: this.taskdetailid
      }
      const res = await inspect.getTaskDetails(json)
      if(res && res.status === 10001) {
        this.res = res.result
      }
    },
    async submitData() {
      let json = {
        taskdetailid: this.taskdetailid,
        status: 1,
        pilist: [],
      }
      const res = await inspect.savePatrolDetail(json)
      if(res && res.status === 10001) {
        this.$toast(toastText.success.submitSuccess)
        const isDev = process.env.NODE_ENV === 'development'
        // 从暴露的全局配置中获取当前环境对应的配置对象
        const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
        let url = globalConfig.BASE_URL_MAP.DEFAULT + 'app/createPatrolPDF' + '?taskdetailid=' + this.taskdetailid + '&type=1'
        document.getElementById('pdfIframe').contentWindow.location.replace(url)
        this.$router.go(-1)
      }
    },
    commitData() {
      this.$dialog.confirm({
        title: '提示',
        message: '提交后将不能再次修改,确认提交吗？'
      }).then(() => {
        this.submitData()
      }).catch(() => {
      })
    },
    jumpPage(name, params, isCache) {
      if(isCache) {
        sessionStorage.setItem('faillist', JSON.stringify(this.res.otherPatrols))
      }
      if(params) {
        this.$router.push({
          name: name,
          params: params
        })
      } else {
        this.$router.push({
          name: name
        })
      }
    }
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
    .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #ffffff;}
    .C106_company {background-color: #f5f5fa; padding-bottom: val(12);}
    .C106_companyItems {display: flex; justify-content: space-between; color: #333333; font-size: val(14); background-color: #ffffff; padding: val(12);}
    .C106_companyName {width: 70%;}
    .C106_companyArea {width: 20%; text-align: right;}
    .C106_companyItem {width: 50%;}
    .C106_companyItem2 {flex: 2;}
    .C106_sign {background-color: #f5f5fa; padding-bottom: val(12);}
    .C106_signTop {display: flex; justify-content: space-between; padding: val(12); border-bottom: 1px solid #e6e6e6; background-color: #ffffff;}
    .C106_signTitle {font-size: val(16); line-height: val(21); color: #000000; font-weight: bold;}
    .C106_signContent {background-color: #ffffff;}
    .C106_signItems {display: flex; justify-content: space-between; color: #333333; font-size: val(14); background-color: #ffffff; padding: val(12);}
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
    .H206_companyBtnOuter {}
    .H206_companyBtn {display: inline-block; height: val(21); line-height: val(21); padding: 0 val(6); border: 1px solid #16a35f; border-radius: 2px;}
    .H206_companyBtn>span {color: #16a35f; font-size: val(12); line-height: 1em;}
    .H206_companyBtn>img {width: val(12); vertical-align: baseline; margin-right: val(3);}
</style>
