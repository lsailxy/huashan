<!--
 * Author: wsp
 * CreatDate: 2019-06-26
 *
 -->
<template>
  <div>
    <div class="H206_item" @click="showPicker()">
      <div class="H206_itemName" :class="data.isMust?'I106_must':''">{{data.name}}</div>
      <div class="H206_itemInput">
        <span>{{data.inputValue || data.placeholder}}</span>
        <img src="@/assets/images/H206_icon1.png" alt="">
      </div>
    </div>
    <van-popup
      v-model="popupShow"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentTime"
        :title="data.name"
        type="date"
        :formatter="formatter"
        @confirm="comfirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
  import moment from 'moment'
    export default {
        // 组件名
        name: "datePicker",
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
              currentTime: new Date()
            }
        },
        // 组件过滤器
        filters: {},
        // 组件计算属性
        computed: {},
        // 组件挂载
        components: {},
        // 钩子函数
        beforeCreate() {
        },
        mounted() {
        },
        destroyed() {
        },
        watch: {},
        methods: {
          formatter(type, value) {
            if (type === 'year') {
              return `${value}年`;
            } else if (type === 'month') {
              return `${value}月`
            } else if (type === 'day') {
              return `${value}日`
            }
            return value;
          },
          showPicker() {
            if(this.data.inputValue) {
              this.currentTime = new Date(moment(this.data.inputValue, 'YYYY-MM-DD').valueOf())
            }
            this.popupShow = true
          },
          cancel() {
            this.popupShow = false
          },
          comfirm() {
            let json = {
              keyName: this.data.keyName,
              data: moment(this.currentTime).format('YYYY-MM-DD')
            }
            this.$emit('change', json)
            this.popupShow = false
          },
          chooseError() {
            this.currentTime = new Date()
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
</style>
