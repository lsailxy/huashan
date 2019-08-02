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
          <div class="H106_add" @click="comfirm">确定</div>
        </div>
        <div class="I106_content">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in data.values"
                clickable
                :key="item.id"
                :title="item.name"
                @click="toggle(index)"
              >
                <van-checkbox :name="item" checked-color="#16a35f" ref="checkboxes" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    // 组件名
    name: "multiPicker",
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
        result:[]
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
        this.$refs.checkboxes[index].toggle();
      },
      showPicker() {
        if(this.data.values.length === 0 && this.data.noDataToast) {
          this.$toast(this.data.noDataToast)
          return
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
        const json = {
          keyName: this.data.keyName,
          data: this.result
        }
        if(this.result.length!==0) {
          this.data.inputLabel = '已选择以下'+this.data.name
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
  .I106_content {overflow: auto; height: 100%; padding-top: val(42);}
  .van-checkbox {flex-flow: row-reverse;}
</style>
