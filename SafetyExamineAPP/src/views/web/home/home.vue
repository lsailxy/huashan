<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="I106_title">农业生产安全监管</div>
    </div>
    <div class="I106_content">
      <div class="I106_nav">
        <div class="I106_navItem" @click="jumpPage('task')">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon1.png" alt="">
          </div>
          <div class="I106_navName">隐患排查</div>
        </div>
        <div class="I106_navItem">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon2.png" alt="">
          </div>
          <div class="I106_navName">风险管控</div>
        </div>
        <div class="I106_navItem">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon3.png" alt="">
          </div>
          <div class="I106_navName">隐患清单</div>
        </div>
        <div class="I106_navItem">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon4.png" alt="">
          </div>
          <div class="I106_navName">风险点清单</div>
        </div>
        <div class="I106_navItem">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon5.png" alt="">
          </div>
          <div class="I106_navName">企业风险分析</div>
        </div>
        <div class="I106_navItem">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon6.png" alt="">
          </div>
          <div class="I106_navName">安全考核</div>
        </div>
        <div class="I106_navItem">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon7.png" alt="">
          </div>
          <div class="I106_navName">安全会议</div>
        </div>
        <div class="I106_navItem">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon8.png" alt="">
          </div>
          <div class="I106_navName">专家库</div>
        </div>
        <div class="I106_navItem" @click="jumpPage('electricityList')">
          <div class="I106_navImg">
            <img style="background-color: #008cf0; border-radius: 2rem;" src="@/assets/images/I106_icon9.png" alt="">
          </div>
          <div class="I106_navName">智慧用电</div>
        </div>
        <div class="I106_navItem" @click="jumpPage('planList')">
          <div class="I106_navImg">
            <img src="@/assets/images/I106_icon4.png" alt="">
          </div>
          <div class="I106_navName">计划任务</div>
        </div>
      </div>
      <div class="I106_banner">
        <img src="@/assets/images/I106_photo.png" alt="">
      </div>
      <div class="I106_message">
        <div class="I106_messageTitle">{{duty.depname}}</div>
        <div class="I106_messageText">{{duty.duty}}</div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import { home } from '@/api'
import bottom from '@/components/public/bottom/bottom.vue'
export default {
  name: 'home',
  data() {
    return {
      duty: {}
    }
  },
  components: {
    bottom
  },
  mounted() {
    this.saveToken()
  },
  methods: {
    async saveToken() {
      let json = {
        token: localStorage.getItem('token'),
        depId: JSON.parse(localStorage.getItem('userInfo')).JGDM || '',
        userid: JSON.parse(localStorage.getItem('userInfo')).ID || '',
        username: JSON.parse(localStorage.getItem('userInfo')).USERNAME || '',
        deptype: JSON.parse(localStorage.getItem('userInfo')).JGXZCODE || '',
        deptypename: JSON.parse(localStorage.getItem('userInfo')).JGXZNAME || '',
        phone: JSON.parse(localStorage.getItem('userInfo')).phone || '',
        usercode: JSON.parse(localStorage.getItem('userInfo')).USERCODE || '',
      }
      const res = await home.saveToken(json)
      const res2 = await home.viewDuty()
      if(res2 && res2.status === 10001) {
        this.duty = res2.result
      }
    },
    jumpPage(name, params) {
      this.$router.push({
        name: name,
        params: params || {}
      })
    },
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  /*首页*/
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .I106_content {overflow: auto; height: 100%; padding-top: val(42); padding-bottom: val(66);}
  .I106_nav {display: flex; flex-flow: row wrap; background-color: #ffffff;}
  .I106_navItem {width: 25%;padding: val(12) 0;}
  .I106_navImg {text-align: center;}
  .I106_navImg>img {width: val(46);}
  .I106_navName {color: #91867d; font-size: val(13); text-align: center; margin-top: val(3.6);}
  .I106_banner {padding: val(12) 0;}
  .I106_banner>img {width: 100%;}
  .I106_message {background-color: #ffffff; padding: val(18);}
  .I106_messageTitle {text-align: center; font-size: val(18); font-weight: bold; color: #000000; padding: val(12) 0;}
  .I106_messageText {color: #666666; font-size: val(14); line-height: val(21); word-break: break-all;}
  .I106_footer {display: flex; flex-flow: row nowrap; position: absolute; bottom: 0; left: 0; width: 100%; background-color: #ffffff;}
  .I106_btn {width: 33.3%; text-align: center; padding: val(12) 0 val(6); color: #747474; font-size: val(12);}
  .I106_btn>img {height: val(17); margin-bottom: val(3.6);}
  .I106_btn2 {margin-top: val(-25.8);}
  .I106_btn2>img {height: val(43);}
  .P106_btnOuter {text-align: center; padding: val(6) 0;}
  .I106_userName {font-size: val(16); padding: val(12); text-align: center;}
</style>
