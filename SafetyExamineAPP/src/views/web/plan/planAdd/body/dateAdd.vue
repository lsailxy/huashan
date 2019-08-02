<!--
 * Author: wsp
 * CreatDate: 2019-06-25
 *
 -->
<template>
  <div>
    <div class="H206_item" @click="showPicker()">
      <div class="H206_itemName" :class="data.isMust?'I106_must':''">{{data.name}}</div>
      <div class="H206_itemInput">
        <span>{{data.inputLabel || data.placeholder}}</span>
        <img src="@/assets/images/H206_icon1.png" alt="">
      </div>
    </div>
    <van-popup
      v-model="popupShow"
      position="right"
      :style="{width: '100%', height: '100%'}"
    >
      <div class="I106_page">
        <div class="I106_header">
          <div class="H106_return" @click="cancel">
            <img src="@/assets/images/arrowLeft.png" alt="">
          </div>
          <div class="I106_title">{{data.name}}</div>
          <div class="H106_add" @click="comfirmAdd">确定</div>
        </div>
        <div class="I106_content">
          <div class="I206_listTop">
            <div class="I206_listTitle">
              <img src="@/assets/images/I206_icon1.png" alt="">
              <span>计划时间段</span>
            </div>
            <div class="I206_listTopBtn" @click="newForm">添加</div>
          </div>
          <div class="D206_dateList" v-for="(item, index) in result" :key="'date_'+index">
            <div class="D206_dateTop">
              <div class="D206_dateName">时间段{{index+1}}</div>
              <van-button round type="danger" @click="delResult(index)">删除</van-button>
            </div>
            <div>
              <datePicker :data="item.startDate" @change="updateDatePicker" ref="startDate"></datePicker>
              <datePicker :data="item.endDate" @change="updateDatePicker" ref="endDate"></datePicker>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import datePicker from '@/components/public/form/datePicker'
import moment from 'moment'
export default {
  // 组件名
  name: 'dateAdd',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  // 组件数据
  data() {
    return {
      popupShow: false,
      result: [],
      resultCount: 0
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {},
  // 组件挂载
  components: {
    datePicker
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
  },
  destroyed() {
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newData, oldData) {
        this.result = this.data.inputValue
      }
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    showPicker() {
      this.popupShow = true
    },
    cancel() {
      this.popupShow = false
    },
    /**
     * 新建时间段
     */
    newForm() {
      this.result.push({
        startDate: {
          name: '计划开始时间',
          keyName: 'startDate_' + this.result.length,
          type: 'datePicker',
          placeholder: '请选择',
          isMust: false,
          inputValue: '',
        },
        endDate: {
          name: '计划结束时间',
          keyName: 'endDate_' + this.result.length,
          type: 'datePicker',
          placeholder: '请选择',
          isMust: false,
          inputValue: '',
        }
      })
      this.resultCount++
    },
    /**
     * 删除时间段
     * @param index 下标
     */
    delResult(index) {
      this.result.splice(index, 1)
      this.result.forEach((item, index) => {
        item.startDate.keyName = 'startDate_' + index
        item.endDate.keyName = 'endDate_' + index
      })
    },
    /**
     * 更新时间
     * @param msg
     */
    updateDatePicker(msg) {
      this.result[msg.keyName.split('_')[1]][msg.keyName.split('_')[0]].inputValue = msg.data
      if(moment(this.result[msg.keyName.split('_')[1]].endDate.inputValue, 'YYYY-MM-DD').valueOf() < moment(this.result[msg.keyName.split('_')[1]].startDate.inputValue, 'YYYY-MM-DD').valueOf()) {
        this.$toast('结束时间不能小于开始时间')
        this.$refs[msg.keyName.split('_')[0]][msg.keyName.split('_')[1]].chooseError()
        this.result[msg.keyName.split('_')[1]][msg.keyName.split('_')[0]].inputValue = ''
      }
    },
    comfirmAdd() {
      const json = {
        keyName: this.data.keyName,
        data: this.result
      }
      if(this.result.length !== 0) {
        this.data.inputLabel = '已添加以下' + this.data.name
      } else {
        this.data.inputLabel = ''
      }
      this.$emit('change', json)
      this.popupShow = false
    }
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee; background-color: #ffffff;}
  .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
  .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
  .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .D106_btnOuter {display: flex; justify-content: space-between; padding: val(12);}
  .D106_btn {font-size: val(16);}
  .I106_must:after {content: '*'; color: red;}
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: 50%; margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(18);}
  .I106_content {overflow: auto; height: 100%; padding-top: val(80);}
  .van-checkbox {flex-flow: row-reverse;}
  .I206_listTop {display: flex; justify-content: space-between; padding: val(10); border-bottom: 1px solid #e6e6e6; background-color: #ffffff; position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
  .I206_listTitle {}
  .I206_listTitle>img {height: val(16); margin-right: val(5);}
  .I206_listTitle>span {font-size: val(16); color: #333333; line-height: 1em;}
  .I206_listTopBtn {color: #008cee; font-size: val(12); border-radius: val(5); width: val(45); text-align: center; height: val(23); line-height: val(23); border: 1px solid #008cee;}
  .D206_dateList {margin: val(9); box-shadow: 0 0 val(5) rgba(22,151,241,.29); background-color: #ffffff;}
  .D206_dateTop {display: flex; justify-content: space-between; padding: val(6); border-bottom: 1px solid #eeeeee;}
  .D206_dateName {height: val(30); line-height: val(30); font-size: val(14);}
  .van-button {height: val(30); line-height: val(30);}
</style>
