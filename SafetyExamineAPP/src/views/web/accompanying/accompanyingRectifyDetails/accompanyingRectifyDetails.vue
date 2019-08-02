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
      <div class="I106_title">AQSCJC20190710</div>
      <div class="H106_add" v-if="isCheck==0" @click="jumpPage('accompanyingAutograph', {selftaskassetid: selftaskassetid, selftaskid: selftaskid,eid: res.taskShow.eid || 0})">提交</div>
    </div>
    <div class="H106_content">
      <div class="C106_signTop">
        <div class="C106_signTitle">检查信息</div>
      </div>
      <div class="C106_company">
        <div class="C106_companyItems">
          <div class="C106_companyItem C106_companyItem3">检查人员：{{res.taskShow.username}}</div>
          <div class="C106_companyItem C106_companyItem4">检查时间：{{res.taskShow.checkdate | dateFormat}}</div>
        </div>
        <div class="C106_companyItems">
          <div class="C106_companyItem C106_companyItem2">同行人员：{{res.taskShow.otherpeopleName || '未录入'}}</div>
        </div>
        <div class="C106_companyItems">
          <div class="C106_companyItem C106_companyItem2">随行人员：{{res.taskShow.accompanyingperson || '未录入'}}</div>
        </div>
        <div class="C106_companyItems">
          <div class="C106_companyItem C106_companyItem2">检查对象：{{res.taskShow.checkobject || '未选择'}}</div>
        </div>
        <div class="C106_companyItems">
          <div class="C106_companyItem C106_companyItem2">检查地址：{{res.taskShow.address || '未录入'}}</div>
        </div>
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name">检查内容</div>
            <div class="H206_item2Input">
              <div class="T106_remark">{{res.taskShow.content || '未录入'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="C106_check">
        <div class="C106_signTop">
          <div class="C106_signTitle">巡查信息</div>
        </div>
        <div class="C106_checkList">
          <div class="C106_checkInfos" v-for="(item, index) in res.ahList" :key="'patrols_'+index">
            <div class="C106_checkInfo">
              <div class="C106_checkName">{{item.gpname}}</div>
              <div class="C106_checkNumbers">
                <span class="C106_checkNumberName">合格数：</span>
                <span class="C106_checkNumber C106_checkNumber1">{{item.qualifiedcount||0}}</span>
                <span class="C106_checkNumberName">不合格数：</span>
                <span class="C106_checkNumber C106_checkNumber2">{{item.count||0}}</span>
                <span class="C106_checkNumberName">未检查数：</span>
                <span class="C106_checkNumber C106_checkNumber3">{{item.nullcount||0}}</span>
              </div>
            </div>
            <div class="C106_checkBtn" @click="jumpPage('accompanyingInspectDetails', {taskdetailid: selftaskassetid, gpid: item.gpid, taskid: selftaskid,eid: res.taskShow.eid || 0,isCheck: isCheck})">{{isCheck==1?'查看':'整改'}}</div>
          </div>
          <div class="C106_checkInfos">
            <div class="C106_checkInfo">
              <div class="C106_checkName">其他不合格项</div>
              <div class="C106_checkNumbers">
                <span class="C106_checkNumberName">不合格数：</span>
                <span class="C106_checkNumber C106_checkNumber2">{{res.failList.length}}</span>
              </div>
            </div>
            <div class="C106_checkBtn" @click="jumpPage('inspectDetailsOther', {taskdetailid: selftaskassetid, taskid: selftaskid,eid: res.taskShow.eid || 0,assetid: res.taskShow.checkobjecttype===1?0:res.taskShow.checkobjectid, deptid: res.taskShow.checkobjecttype===1?res.taskShow.checkobjectid:0,isCheck: isCheck}, true)">{{isCheck==1?'查看':'整改'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accompanying } from '@/api'
import moment from 'moment'
import { toastText } from '@/utils'

export default {
  // 组件名
  name: 'accompanyingRectifyDetails',
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
        taskShow: {},
        ahList: [],
        failList: []
      },
      checkListId: 0
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
    selftaskid() {
      return this.$route.params.selftaskid
    },
    selftaskassetid() {
      return this.$route.params.selftaskassetid
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
        selftaskassetid: this.selftaskassetid
      }
      const res = await accompanying.showDetail(json)
      if(res && res.status === 10001) {
        this.res = res.result
      }
    },
    /**
     * 删除检查表请求
     * @param newCheckList 新得检查表id集合
     * @param checkid 删除的检查表id
     * @param index 删除的检查表下标
     */
    async delCheckListAjax(newCheckList, checkid, index) {
      let json = {
        selftaskassetid: this.selftaskassetid,
        selftaskid: this.selftaskid,
        checklist: newCheckList.join(','),
        checkid: checkid,
      }
      const res = await accompanying.delCheckList(json)
      if(res && res.status === 10001) {
        this.$toast(toastText.success.delSuccess)
        this.res.ahList.splice(index, 1)
      }
    },
    /**
     * 删除检查表
     * @param data 检查表数据
     * @param index 下标
     */
    delCheckList(data, index) {
      this.$dialog.confirm({
        message: '确认删除吗？'
      }).then(() => {
        let newCheckList = []
        this.res.ahList.forEach((item) => {
          if(item.gpid !== data.gpid) {
            newCheckList.push(item.gpid)
          }
        })
        this.delCheckListAjax(newCheckList, data.gpid, index)
      }).catch(() => {})
    },
    jumpPage(name, params, isCache) {
      if(isCache) {
        sessionStorage.setItem('faillist', JSON.stringify(this.res.failList))
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
    },
    jumpPage2(name, params) {
      sessionStorage.setItem('ahList', JSON.stringify(this.res.ahList))
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
  .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #f5f5fa;}
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
  .C106_sign {background-color: #f5f5fa; padding-bottom: val(12);}
  .C106_signTop {display: flex; justify-content: space-between; padding: val(12); border-bottom: 1px solid #e6e6e6; background-color: #ffffff;}
  .C106_signTitle {font-size: val(16); line-height: val(21); color: #000000; font-weight: bold;}
  .C106_signContent {background-color: #ffffff;}
  .C106_signItems {display: flex; justify-content: space-between; color: #333333; font-size: val(14); background-color: #ffffff; padding: val(12);}
  .C106_signItem1 {width: 35%;}
  .C106_signItem2 {width: 100%;}
  .C106_signItem3 {width: 55%;}
  .C106_checkList {background-color: #ffffff;}
  .C106_checkInfos {display: flex; justify-content: space-between; padding: val(12); border-bottom: 1px solid #e6e6e6;}
  .C106_checkInfo {width: 80%;}
  .C106_checkName {font-size: val(15); color: #3a3939; padding: val(6) 0;}
  .C106_checkNumbers {font-size: val(13); display: flex; padding: val(6) 0 0;}
  .C106_checkNumberName {color: #9d9b9b;line-height: val(20);}
  .C106_checkNumber {display: inline-block;width: val(20); text-align: center; height: val(20); line-height: val(20); border-radius: 50%; margin-right: val(6); vertical-align: middle;}
  .C106_checkNumber1 {color: #16a35f; background-color: #e3fff2;}
  .C106_checkNumber2 {color: #ff1800; background-color: #ffe6e3;}
  .C106_checkNumber3 {color: #4e8ff8; background-color: #e3eeff;}
  .C106_checkBtn {font-size: val(14); display: inline-block; height: val(28); line-height: val(28); border-radius: val(3); width: val(50); text-align: center; box-shadow: 0 0 val(4) rgba(78,143,248,.3); color: #4e8ff8; margin-right: val(20);}
  .H206_companyBtnOuter {}
  .H206_companyBtn {display: inline-block; height: val(21); line-height: val(21); padding: 0 val(6); border: 1px solid #4c60c4; border-radius: 2px;}
  .H206_companyBtn>span {color: #4c60c4; font-size: val(12); line-height: 1em;}
  .H206_companyBtn>img {width: val(12); vertical-align: baseline; margin-right: val(3);}
  .H206_noSign {font-size: val(14); color: #333333;}
  .van-button {height: 100%;}
  .C106_company {background-color: #f5f5fa; padding-bottom: val(12);}
  .C106_companyItems {display: flex; justify-content: space-between; color: #333333; font-size: val(14); background-color: #ffffff; padding: val(12);}
  .C106_companyName {width: 60%;}
  .C106_companyArea {width: 30%; text-align: right;}
  .C106_companyItem {width: 50%;}
  .C106_companyItem2 {flex: 2;}
  .C106_companyItem3 {width: 35%;}
  .C106_companyItem4 {width: 65%;}
</style>
