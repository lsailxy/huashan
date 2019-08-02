<!--
 * Author: wsp
 * CreatDate: 2018-11-13
 *
 -->
<template>
  <div style="width: 100%;">
    <div class="H206_item" @click="showPick(data.keyName)">
      <div class="H206_itemName">{{data.name}}</div>
      <div class="H206_itemInput">
        <span>{{data.inputLabel || data.placeholder}}</span>
        <img src="@/assets/images/H206_icon1.png" alt="">
      </div>
    </div>
    <van-popup
      v-model="isPickerShow"
      position="right"
      :style="{width: '100%', height: '100%'}"
    >
      <div class="I106_page">
        <div class="I106_header">
          <div class="H106_return" @click="pickerCancel">
            <img src="@/assets/images/arrowLeft.png" alt="">
          </div>
          <div class="I106_title">{{data.name}}</div>
          <div class="H106_add" @click="pickerComfirm">确定</div>
        </div>
        <div class="H106_content">
          <div class="P106_checkOuter" v-for="(item, index) in data.values" @click="toggle(index)" :key="item.id">
            <van-checkbox v-model="item.checked" :name="item" ref="checkboxes">{{item.name}}</van-checkbox>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'peer',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {
    data: {
      type: Object, // String, Number, Object
      required: false,
      default() {
        return {}
      },
    }
  },
  // 组件数据
  data() {
    return {
      isPickerShow: false,
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
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    showPick(pickerName) {
      if(this.data.inputValue) {
        this.data.inputValue.split(',').forEach((item) => {
          this.data.values.forEach((item2, index2) => {
            if(parseInt(item) === item2.id) {
              item2.checked = true
            }
          })
        })
      }
      this.isPickerShow = true
    },
    pickerComfirm() {
      let selectedData = []
      this.data.values.forEach((item) => {
        if(item.checked) {
          selectedData.push({
            id: item.id,
            name: item.name
          })
        }
      })
      let json = {
        pickerName: this.data.keyName,
        pickerValue: selectedData
      }
      this.$emit('update', json)
      this.isPickerShow = false
      // window.netintech.Storage.set('popup', false)
    },
    pickerCancel() {
      this.isPickerShow = false
      // window.netintech.Storage.set('popup', false)
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
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .R106_itemArrow img { height: 1.071rem; vertical-align: text-bottom;}
  .R106_itemInput4>input {color: #000000; text-align: right;font-size: 1.6rem;}
  .P108S_box{height: 100%; width: 100%; position: relative;}
  .P108S_header{position: absolute;top: 0;left: 0;width: 100%;background: #008cee;width: 100%;line-height: 4rem;z-index: 1000; padding-top: 1rem;}
  .P108S_headerTitle{display: flex;justify-content: space-between;align-items: center;padding: 0 1rem;}
  .P108S_headerTitle img{height: 1.8rem;}
  .P108S_headerTitle span{display:inline-block;color: #fff;font-size: 1.8rem;}
  .P108S_headerTitle .P108S_titleName{display: inline-block;color: #fff;font-size: 2rem;width: 70%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; text-align: center;}
  .P108S_content{background: #f2f2f2;height: 100%;padding-top: 5rem; padding-bottom: 5rem; overflow: auto;text-align: left;}
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(12);}
  .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #f5f5fa;}
  .P106_checkOuter {padding: val(12); border-bottom: 1px solid #eeeeee; background-color: #ffffff;}
</style>
