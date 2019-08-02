<!--
 * Author: wsp
 * CreatDate: 2018-11-24
 *
 -->
<template>
  <div style="width: 100%;">
    <div class="H206_item" @click="showPick(data.keyName)">
      <div class="H206_itemName">{{data.name}}</div>
      <div class="H206_itemInput">
        <span>{{data.inputValue || data.placeholder}}</span>
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
          <div class="A106_personList">
            <van-cell :title="item" v-for="(item,index) in person" :key="'person_'+index">
              <van-button type="danger" size="small" @click.native="delPeople(index)">删除</van-button>
            </van-cell>
          </div>
          <van-dialog
            v-model="dialogShow"
            title="随行人名"
            show-cancel-button
            @confirm="comfirmDialog"
          >
            <div class="A106_dialog">
              <input v-model="dialogText" type="text">
            </div>
          </van-dialog>
          <div class="A106_add" @click="addPeople()">
            <img src="@/assets/images/Z108_add.png" alt="">
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'accompanying',
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
      person: [],
      isPickerShow: false,
      dialogShow: false,
      dialogText: ''
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
    showPick(pickerName) {
      if(this.data.inputValue) {
        this.person = this.data.inputValue.split(',')
      }
      this.isPickerShow = true
      // window.netintech.Storage.set('popup', true)
    },
    pickerCancel() {
      this.isPickerShow = false
      // window.netintech.Storage.set('popup', false)
    },
    addPeople() {
      this.dialogShow = true
    },
    comfirmDialog() {
      if(this.dialogText !== '') {
        this.person.push(this.dialogText)
        this.dialogText = ''
      }
    },
    delPeople(index) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定删除该随行人吗？'
      }).then(() => {
        this.person.splice(index, 1)
      }).catch(() => {
        // on cancel
      })
    },
    pickerComfirm() {
      this.$emit('update', this.person.join(','))
      this.isPickerShow = false
      // window.netintech.Storage.set('popup', false)
    },
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee;background-color: #ffffff;}
  .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
  .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
  .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(12);}
  .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #f5f5fa;}
  .A106_add {position: absolute; width: 5rem; margin: auto; left: 0; right: 0; bottom: 1rem;}
  .A106_add img{width: 100%;}
  .A106_dialog {padding: val(12);}
  .A106_dialog>input {width: 100%; font-size: val(14); border: 1px solid #eeeeee; padding: val(7);}
  .A106_personList .van-cell {font-size: val(16);}
</style>
