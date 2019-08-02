<!--
 * Author: wsp
 * CreatDate: 2019-07-01
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">签到</div>
      <div class="H106_add"></div>
    </div>
    <div class="H106_content">
      <div class="H206_itemOuter">
        <div class="H206_item">
          <div class="H206_itemName">签到人员</div>
          <div class="H206_itemInput">{{res.signusername}}</div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">签到时间</div>
          <div class="H206_itemInput">{{res.signtime}}</div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">同行人员</div>
          <div class="H206_itemInput">{{res.otherpeople || '未录入'}}</div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">随行人员</div>
          <div class="H206_itemInput">{{res.accompanyingperson || '未录入'}}</div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">签到地址</div>
          <div class="H206_itemInput">{{res.signaddress}}</div>
        </div>
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name">现场照片</div>
            <showImg :imgData="urls" keyName="addImg" :isDel="false"></showImg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showImg from '@/components/public/upImg/showImg'
import moment from 'moment'
import { inspect } from '@/api'
export default {
  // 组件名
  name: 'signView',
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
        signusername: '',
        signuser: '',
        signtime: '',
        signaddress: '',
        signlon: '',
        signlat: '',
        photosId: [],
        otherpeople: '',
        accompanyingperson: ''
      },
      urls: []
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    taskdetailid() {
      return this.$route.params.taskdetailid
    },
  },
  // 组件挂载
  components: {
    showImg
  },
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
      const res = await inspect.toSignDetail(json)
      if(res && res.status === 10001) {
        this.res = res.result.sign
        this.urls = res.result.url || []
        const isDev = process.env.NODE_ENV === 'development'
        // 从暴露的全局配置中获取当前环境对应的配置对象
        const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
        this.urls.forEach((item) => {
          item.filePath = globalConfig.BASE_URL_MAP.DEFAULT + item.filePath
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
    /*签到*/
    .S106_mapOuter {padding: val(12) 0;}
    .S106_mapOuter>img {width: 100%;}
    .S106_photo {display: flex; flex-flow: row wrap; padding-bottom: 2rem;}
    .S106_photo>img {width: 7.75rem; height: 7.75rem;margin-right: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;}
    .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee;}
    .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
    .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
    .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
    .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .H206_itemInput>img {height: val(16); margin-left: val(10);}
    .H206_itemInput>img {height: val(16); margin-left: val(10);}
    .H206_item2Outer {background-color: #f5f5fa; padding-bottom: val(12);}
    .H206_item2 {padding: 0 val(12); background-color: #ffffff;}
    .H206_item2Name {font-size: val(16); padding: val(12) 0;}
</style>
