<!--
 * Author: wsp
 * CreatDate: 2019-06-25
 *
 -->
<template>
  <div class="I106_footer">
    <div class="I106_btn" @click="jumpPage('home')" :class="currentPageName==='home'?'I106_btnCur':''">
      <van-icon name="extra" class-prefix="B106_iconDiy" info="" color="#4c60c4" size="2em">
        <svg t="1563782173168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1820" width="200" height="200"><path d="M998.870372 450.359652L552.428633 37.13113l-0.26713-0.200347-1.558261-1.246609-0.601044-0.467478-1.892174-1.380174-0.289391-0.222609-2.203826-1.446956-0.022261-0.022261a63.532522 63.532522 0 0 0-74.50713 5.097739L24.756981 450.359652a57.878261 57.878261 0 0 0-5.832348 83.812174c22.394435 24.665043 61.417739 27.225043 87.062261 5.632l42.295652-35.617391v348.560695c0 82.075826 24.887652 148.880696 110.146783 148.880696h92.16c34.05913 0 61.68487-26.601739 61.684869-59.392V661.837913c0-16.562087 14.024348-30.052174 31.209739-30.052174h136.592696c17.229913 0 31.276522 13.490087 31.276522 30.052174v273.430261c0 4.051478 0.422957 8.102957 1.29113 12.109913l1.491478 6.967652c5.965913 27.514435 31.187478 47.282087 60.416 47.282087h90.646261c85.25913 0 110.146783-66.80487 110.146783-148.880696V504.208696l42.295652 35.59513a62.998261 62.998261 0 0 0 40.603826 14.647652c17.14087 0 34.259478-6.856348 46.458435-20.279652a57.878261 57.878261 0 0 0-5.832348-83.812174z" p-id="1821" :fill="currentPageName==='home'?'#16a35f':'#747474'"></path></svg>
      </van-icon>
      <div>首页</div>
    </div>
    <div class="I106_btn I106_btn2" @click="jumpPage('enterpriseList')">
      <img src="@/assets/images/I106_btn2.png" alt="">
      <div>检查</div>
    </div>
    <div class="I106_btn" @click="jumpPage('person')" :class="currentPageName==='person'?'I106_btnCur':''">
      <van-icon name="extra" class-prefix="B106_iconDiy" info="" color="#4c60c4" size="2em">
        <svg t="1563782428238" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2661" width="200" height="200"><path d="M959.36 920.96c-15.36-181.76-139.52-332.16-307.84-386.56 70.4-45.44 117.12-124.16 117.12-214.4 0-141.44-115.2-256-256.64-256C369.92 64 255.36 178.56 255.36 320c0 90.24 46.72 168.96 117.12 214.4-168.32 54.4-292.48 204.8-307.84 386.56 0 3.2-0.64 5.76 0 10.24C65.92 947.2 80 960 96 960 113.92 960 128 945.28 128 928 144.64 730.24 310.4 576 512 576s366.72 154.24 384 352c0 17.28 14.08 32 32 32 16 0 30.08-12.8 31.36-28.8C960 926.72 959.36 924.16 959.36 920.96zM319.36 320c0-106.24 86.4-192 192.64-192 106.24 0 192.64 85.76 192.64 192 0 106.24-86.4 192-192.64 192C405.76 512 319.36 426.24 319.36 320z" p-id="2662" :fill="currentPageName==='person'?'#16a35f':'#747474'"></path></svg>
      </van-icon>
      <div>我的</div>
    </div>
  </div>
</template>

<script>
export default {
    // 组件名
    name: "bottom",
    // 组件构造
    mixins: [],
    // 组件扩展
    extends: {},
    // 组件属性
    props: {},
    // 组件数据
    data() {
        return {}
    },
    // 组件过滤器
    filters: {},
    // 组件计算属性
    computed: {
      currentPageName() {
        return this.$store.state.bottom.currentPageName
      }
    },
    // 组件挂载
    components: {},
    // 钩子函数
    beforeCreate() {
    },
    mounted() {
      this.$store.commit('jumpPage',this.$route.name)
    },
    destroyed() {
    },
    watch: {},
    methods: {
      jumpPage(name) {
        this.$router.push(name);
        this.$store.commit('jumpPage',name)
      }
    },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    .I106_footer {display: flex; flex-flow: row nowrap; position: absolute; bottom: 0; left: 0; width: 100%; background-color: #ffffff;}
    .I106_btn {width: 25%; text-align: center; padding: val(12) 0 val(6); color: #747474; font-size: val(12); color: #b2bcc7;}
    .I106_btn>img {height: val(17); margin-bottom: val(3.6);}
    .I106_btn2 {margin-top: val(-25.8);}
    .I106_btn2>img {height: val(43);}
    .I106_btnCur {color: #4c60c4;}
    .B106_iconDiy {height: 1em; width: 1em; display: inline-block;position: relative;}
    .B106_iconDiy svg {width: 100%; height: 100%;}
    .I106_footer {display: flex; flex-flow: row nowrap; position: absolute; bottom: 0; left: 0; width: 100%; background-color: #ffffff;}
    .I106_btn {width: 33.3%; text-align: center; padding: val(12) 0 val(6); color: #747474; font-size: val(12);}
    .I106_btn>img {height: val(17); margin-bottom: val(3.6);}
    .I106_btnCur {color: #16a35f;}
    .I106_btn2 {margin-top: val(-25.8);}
    .I106_btn2>img {height: val(43);}
</style>
