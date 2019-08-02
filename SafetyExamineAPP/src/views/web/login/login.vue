<!--
 * Author: wsp
 * CreatDate: 2019-03-25
 *
 -->
<template>
<div class="L106_page">
  <div class="L106_top">
    <div class="L106_title">农业生产安全监管</div>
  </div>
  <div class="L106_login">
    <div class="L106_loginTitle">登录</div>
    <div class="L106_loginInput">
      <img class="L106_loginIcon" src="@/assets/images/L106_icon1.png" alt="">
      <input type="text" placeholder="请输入用户名" v-model="userName">
      <img class="L106_loginIcon2" v-if="delInput" @click="delInputValue" src="@/assets/images/L106_icon3.png" alt="">
    </div>
    <div class="L106_loginInput">
      <img class="L106_loginIcon" src="@/assets/images/L106_icon2.png" alt="">
      <input type="password" placeholder="请输入密码" v-model="password" ref="passwordInput">
      <img class="L106_loginIcon2" v-show="!ispasswordShow" @click="checkpassword" src="@/assets/images/L106_icon4.png" alt="">
      <img class="L106_loginIcon2" v-show="ispasswordShow" @click="hidepassword" src="@/assets/images/L106_icon5.png" alt="">
    </div>
    <div class="L106_loginRemember">
      <div>
        <input name="rememberPassword" id="rememberPassword" type="checkbox" v-model="rememberPassword">
        <label for="rememberPassword">记住密码</label>
      </div>
      <div>忘记密码?</div>
    </div>
    <div class="L106_loginButton" @click="enterSystem">登&nbsp;录</div>
    <appUpdate></appUpdate>
  </div>
</div>
</template>

<script>
import base64 from 'base-64'
import md5 from 'md5'
import appUpdate from '@/components/public/appUpdate/appUpdate'
import { login } from '@/api'
import { toastText, Auth } from '@/utils'
export default {
  // 组件名
  name: 'login',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      userName: '',
      password: '',
      delInput: false,
      rememberPassword: false,
      ispasswordShow: false
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {},
  // 组件挂载
  components: {
    appUpdate
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
    if(localStorage.getItem('userPW')) {
      let json = JSON.parse(localStorage.getItem('userPW'))
      if(json.password) {
        this.rememberPassword = true
        this.userName = json.userName
        this.password = base64.decode(json.password)
      } else {
        this.userName = json.userName
      }
    }
  },
  destroyed() {
  },
  watch: {
    userName: {
      handler() {
        if(this.userName !== '') {
          this.delInput = true
        } else {
          this.delInput = false
        }
      }
    },
    rememberPassword: function() {
      if(this.rememberPassword) {
        if(this.userName !== '' && this.password !== '') {
          let param = {
            userName: this.userName,
            password: base64.encode(this.password)
          }
          localStorage.setItem('userPW', JSON.stringify(param))
        }
      } else {
        if(this.userName !== '') {
          let param = {
            userName: this.userName
          }
          localStorage.setItem('userPW', JSON.stringify(param))
        } else {
          localStorage.removeItem('userPW')
        }
      }
    },
  },
  methods: {
    /**
    * 删除input的值
    */
    delInputValue() {
      this.userName = ''
    },
    /**
     * 查看密码
     */
    checkpassword() {
      this.$refs.passwordInput.type = 'text'
      this.ispasswordShow = true
    },
    /**
     * 隐藏密码
     */
    hidepassword() {
      this.$refs.passwordInput.type = 'password'
      this.ispasswordShow = false
    },
    /**
     * 进入系统
     */
    async enterSystem() {
      let isCommit = true
      if(this.userName === '' || this.password === '') {
        this.$toast(toastText.fail.inputNull)
        isCommit = false
      }
      // this.$router.push({
      //   name: 'home'
      // })
      if(isCommit) {
        let json = {
          username: md5(base64.encode(unescape(encodeURIComponent(this.userName)))),
          pd: md5(base64.encode(unescape(encodeURIComponent(this.password))))
        }
        const res = await login.login(json)
        if(res && res.success) {
          this.$toast(toastText.success.loginSuccess)
          Auth.setToken(res.success.token)
          localStorage.setItem('userInfo', JSON.stringify(res.success))
          if(this.rememberPassword) {
            let param = {
              userName: this.userName,
              password: base64.encode(this.password)
            }
            localStorage.setItem('userPW', JSON.stringify(param))
          }
          this.$router.push({
            name: 'home'
          })
        } else {
          this.$toast(res.fail || '登录失败，请稍后重试')
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/netintech.scss';
  .L106_page {width: 100%; min-height: 100%; background: url('~@/assets/images/bg.png') no-repeat; background-size: 100% 100%; overflow: hidden;}
  .L106_top {text-align: center; margin-top: 20%;}
  .L106_logo {}
  .L106_logo>img {width: val(132);}
  .L106_title {font-size: val(34); color: #ffffff; letter-spacing: 0.1em; text-shadow: val(3) val(3) val(3) rgba(0,0,0,.35);}
  .L106_subtitle {font-size: val(28); color: #fa7541;}
  .L106_login {margin: val(50) auto 0; width: 90%; padding: 0 val(12) val(40); background-color: #ffffff; border-radius: val(5);}
  .L106_loginTitle {color: #3e4a59; font-size: val(24); padding: val(12);}
  .L106_loginInput {margin-bottom: val(24); position: relative; padding-left: val(42); padding-right: val(53); height: val(50); border-bottom: 1px solid #e9e9e9;}
  .L106_loginIcon {position: absolute; width: val(16); left: val(12); top: 0; bottom: 0; margin: auto;}
  .L106_loginIcon2 {position: absolute; width: val(20); right: val(16); top: 0; bottom: 0; margin: auto;}
  .L106_loginInput input {width: 100%; float: left; height: val(30); line-height: val(30); margin-top: val(10); font-size: val(16); border: none;outline:none; background: none;}
  .L106_loginRemember {color: #999999; padding: 0 val(10); margin-top: val(-10); display: flex; justify-content: space-between; font-size: val(12);}
  .L106_loginRemember input {width: val(14); height: val(14); float: left; font-size: val(14); margin: 0;}
  .L106_loginRemember label {float: left; font-size: val(12); line-height: val(14); margin-left: val(3)}
  .L106_loginButton {height: val(50); line-height: val(50); font-size: val(16); color: #ffffff; text-align: center; border-radius: val(25); text-align: center; background-color: $primaryColor;margin: val(30) auto 0; font-weight: bold; width: 80%;}
</style>
