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
      <van-picker :columns="data.values" @change="onChange" @confirm="comfirm" @cancel="cancel" :show-toolbar="true" :title="data.name" value-key="name" ref="picker" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    // 组件名
    name: "cascade",
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
          this.data.values[0].values.forEach((item, index) => {
            if(item.id.toString() === this.data.inputValue.split(',')[0]) {
              this.data.values[0].defaultIndex = index
              this.data.values[1].values = item.children
              this.data.values[1].values.forEach((item2, index2) => {
                if(item2.id.toString() === this.data.inputValue.split(',')[1]) {
                  this.data.values[1].defaultIndex = index2
                }
              })
            }
          })
        }
        this.popupShow = true
      },
      onChange(picker, values) {
        if(values[0]) {
          picker.setColumnValues(1, values[0].children)
        }
      },
      cancel() {
        this.popupShow = false
      },
      comfirm(valus) {
        let json = {
          keyName: this.data.keyName,
          pickerValue: valus
        }
        // this.$emit('change',json)
        this.data.inputValue = json.pickerValue[0].id + ',' + json.pickerValue[1].id
        this.data.inputLabel = json.pickerValue[0].name + '-' + json.pickerValue[1].name
        this.popupShow = false
      }
    },
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .H206_item {display: flex; justify-content: space-between; padding: val(8) val(10); border-bottom: 1px solid #ededee; background-color: #ffffff; border-top: 1px solid #eeeeee; border-bottom: 1px solid #eeeeee;}
  .H206_itemName {font-size: val(14); color: #000000; width: 30%;}
  .H206_itemInput {font-size: val(14); width: 70%; text-align: right;line-height: 1.5rem;}
  .H206_itemInput>input {color: #a4a6a8; font-size: val(14); width: 100%; line-height: val(16);text-align: right; border: none;}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(14);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(14); margin-left: val(10);}
  .D106_btnOuter {display: flex; justify-content: space-between; padding: val(12);}
  .D106_btn {font-size: val(14);}
  .I106_must:after {content: '*'; color: red;}
</style>
