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
    position="bottom"
  >
    <van-picker :columns="data.values" @change="onChange" :defaultIndex="data.defaultIndex" @confirm="comfirm" @cancel="cancel" :show-toolbar="true" :title="data.name" value-key="name" ref="picker" />
  </van-popup>
</div>
</template>

<script>
    export default {
        // 组件名
        name: "onePicker",
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
          showPicker() {
            if(this.data.values.length === 0 && this.data.noDataToast) {
              this.$toast(this.data.noDataToast)
              return
            }
            if (this.data.inputValue) {
              this.data.values.forEach((item, index)=>{
                if (item.id === this.data.inputValue) {
                  this.data.defaultIndex = index
                }
              })
            } else {
              this.data.choseItem = this.data.values[0]
              this.data.defaultIndex = 0
            }
            this.popupShow = true
          },
          onChange(picker, value, index) {
            this.data.choseItem = value
          },
          cancel() {
            this.popupShow = false
          },
          comfirm() {
            this.$emit('change',this.data)
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
</style>
