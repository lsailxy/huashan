<!--
 * Author: wsp
 * CreatDate: 2019-07-22
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="I106_title">农业生产安全监管</div>
    </div>
    <div class="I106_content">
      <div class="I106_userName">登录用户：{{userName}}</div>
      <div class="P106_btnOuter">
        <van-button type="danger" size="small" @click="logout()">登出</van-button>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import { toastText, Auth } from '@/utils'
import bottom from '@/components/public/bottom/bottom.vue'
export default {
  // 组件名
  name: 'person',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      userName: JSON.parse(localStorage.getItem('userInfo')).USERNAME || '',
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {},
  // 组件挂载
  components: {
    bottom
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
    jumpPage(name, params) {
      this.$router.push({
        name: name,
        params: params || {}
      })
    },
    logout() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定登出?'
      }).then(() => {
        Auth.removeToken()
        localStorage.removeItem('userInfo')
        this.$toast(toastText.success.logoutSuccess)
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
      })
    }
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
    .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%;}
    .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .I106_content {overflow: auto; height: 100%; padding-top: val(42); padding-bottom: val(66);}
    .P106_btnOuter {text-align: center; padding: val(6) 0;}
    .I106_userName {font-size: val(16); padding: val(12); text-align: center;}
</style>
