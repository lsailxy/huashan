<!--
 * Author: wsp
 * CreatDate: 2019-07-08
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">签名</div>
      <div class="H106_add" @click="commitData">完成提交</div>
    </div>
    <div class="H106_content">
      <div class="N108_itemTitle">
        <div>
          <img src="@/assets/images/P306_icon1.png">
          <span>巡查人签字</span>
        </div>
        <div class="N108_addNoMatch" @click="showAutograph('inspectcheck')">
          <span>签字</span>
        </div>
      </div>
      <div v-show="formData.inspectcheck" class="A306_autograph">
        <img :src="formData.inspectcheck" alt="">
      </div>
      <div class="N108_itemTitle">
        <div>
          <img src="@/assets/images/P306_icon2.png">
          <span>被检查人签字</span>
        </div>
        <div class="N108_addNoMatch" @click="showAutograph('inspectleader')">
          <span>签字</span>
        </div>
      </div>
      <div v-show="formData.inspectleader" class="A306_autograph">
        <img :src="formData.inspectleader" alt="">
      </div>
      <autograph :data="autographData" @update="autographUpdate" ref="autograph"></autograph>
    </div>
  </div>
</template>

<script>
import autograph from '@/components/public/autograph/autograph'
import { inspect } from '@/api'
import { toastText } from '@/utils'

export default {
  // 组件名
  name: 'accompanyingAutograph',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      formData: {
        inspectcheck: '', // 巡检人签字
        inspectcheckremark: '', // 巡检人签字备注
        inspectleader: '', // 企业确认签字
        inspectleaderremark: '', // 企业确认签字备注
        rectifycheck: '', // 整改人签字
        rectifycheckremark: '', // 整改人签字备注
        reviewcheck: '', // 复核人签字
        reviewcheckremark: '', // 复核人签字备注
        reviewleader: '', // 复核企业确认签字
        reviewleaderremark: ''// 复核企业确认签字备注
      },
      autographData: {
        isPickerShow: false,
        keyName: '',
        imgData: ''
      },
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    selftaskid() {
      return this.$route.params.selftaskid
    },
    selftaskassetid() {
      return this.$route.params.selftaskassetid
    },
    eid() {
      return this.$route.params.eid
    }
  },
  // 组件挂载
  components: {
    autograph
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
  },
  destroyed() {
  },
  watch: {},
  methods: {
    pageBack() {
      this.$router.go(-1)
    },
    showAutograph(keyName) {
      // plus.key.hideSoftKeybord()
      setTimeout(() => {
        this.autographData.isPickerShow = true
        this.autographData.keyName = keyName
        this.autographData.imgData = this.formData[keyName]
        if(this.$refs.autograph.$refs.signature) {
          this.$refs.autograph.clear()
        }
      }, 300)
    },
    autographUpdate(msg) {
      this.formData[msg.keyName] = msg.imgData
      this.autographData.isPickerShow = false
    },
    async submitData() {
      let json = {
        sid: this.selftaskassetid,
        taskid: this.selftaskid,
        enterpriseid: this.eid,
        status: 1,
        pilist: [],
        inspectcheck: this.formData.inspectcheck,
        inspectcheckremark: this.formData.inspectcheckremark,
        inspectleader: this.formData.inspectleader,
        inspectleaderremark: this.formData.inspectleaderremark,
        submitdate: null,
        isapproval: 0,
        flowid: ''
      }
      const res = await inspect.saveselfpatrol(json)
      if(res && res.status === 10001) {
        this.$toast(toastText.success.submitSuccess)
        this.$router.push({
          name: 'accompanyingList'
        })
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
    .N108_itemTitle{display: flex;justify-content: space-between;align-items: center;padding: val(12);text-align: left; background-color: #ffffff; margin-top: val(24);}
    .N108_itemTitle img{height: 2.8rem; margin-right: 1rem; vertical-align: middle;}
    .N108_itemTitle span{display: inline-block;font-size: 1.6rem; color: #454545; font-weight: 700;vertical-align: middle;}
    .N108_addNoMatch{border: 1px solid #2291e2;padding: 0.5rem 1.5rem;border-radius: 1.5rem;font-size: 0.8rem;color: #2291e2;}
    .N108_addNoMatch span{font-weight: 400; color: #2291e2;}
    .A306_autograph {border: 1px solid #eeeeee;}
    .A306_autograph img {width: 100%;}
</style>
