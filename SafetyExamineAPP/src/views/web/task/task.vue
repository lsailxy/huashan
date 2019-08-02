<!--
 * Author: wsp
 * CreatDate: 2019-06-24
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">隐患排查</div>
      <div class="H106_add">
        <img src="@/assets/images/H106_icon1.png" alt="">
        <img @click="jumpPage('taskAdd')" src="@/assets/images/H106_icon2.png" alt="">
      </div>
    </div>
    <div class="E106_search">
      <form action="/">
        <van-search
          v-model="searchValue"
          placeholder="输入您要查询的内容..."
          shape="square"
          left-icon=""
          right-icon="search"
          background="#eeeeee"
          @search="search()"
        >
        </van-search>
      </form>
    </div>
    <div class="H106_content">
      <list :listData="listData" @update="updateList" ref="taskList"></list>
    </div>
  </div>
</template>

<script>
import { task } from '@/api'
import list from './body/list'
export default {
  // 组件名
  name: 'task',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      searchValue: '',
      listData: [],
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {},
  // 组件挂载
  components: {
    list
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
  },
  destroyed() {
  },
  watch: {
    searchValue() {
      if(this.searchValue === '') {
        this.updateList(1)
      }
    }
  },
  methods: {
    /**
     * 返回前页
     */
    pageBack() {
      this.$router.push({
        name: 'home'
      })
    },
    /**
     * 搜索
     */
    search() {
      this.updateList(1)
    },
    /**
     * 加载列表
     * @param currentPage 当前页
     */
    async updateList(currentPage) {
      let json = {
        keyword: this.searchValue,
        currentPage: currentPage,
        plandateid: ''
      }
      const res = await task.getTaskList(json)
      if(res && res.status === 10001) {
        if(currentPage > 1) {
          this.listData = this.listData.concat(res.result.list)
        } else {
          this.listData = res.result.list
        }
        this.$refs.taskList.isAllLoad(res.result.count)
      } else {
        this.$refs.taskList.errorHandle()
      }
    },
    /**
     * 页面跳转
     * @param name 路由名称
     * @param params 路由参数
     */
    jumpPage(name, params) {
      if(params) {
        this.$router.push({
          name: name,
          params: params
        })
      } else {
        this.$router.push({
          name: name
        })
      }
    },
  },
}
</script>

<style lang="scss" type="text/scss"  scoped>
    @import '@/assets/scss/netintech.scss';
    /*隐患排查*/
    .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
    .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
    .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
    .H106_return>img {height: val(18);}
    .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
    .H106_add>img {height: val(18); margin-left: val(12);}
    .H106_content {overflow: auto; height: 100%; padding-top: val(79); background-color: #ffffff;}
    .H106_list {}
    .H106_list>li {padding-left: val(21); padding-right: val(12);}
    .H106_itemOuter {border-bottom: 1px solid #e9e9e9; padding: val(12) 0;}
    .H106_item {display: flex; justify-content: space-between; padding: val(6) 0 0; line-height: val(18);}
    .H106_itemName {width: 70%; color: #333333; font-size: val(17); font-weight: bold;}
    .H106_itemDate {color: #999999; font-size: val(13);}
    .H106_itemDatas {max-width: 60%;}
    .H106_itemData {color: #808080; font-size: val(14); padding: val(6) 0;}
    .H106_itemNumber {display: inline-block; color: #16a35f; font-size: val(12); background-color: #e3fff1; padding: 0 val(12); border-radius: 2px;}
    .H106_itemSign {font-size: val(14); display: inline-block; height: val(28); line-height: val(28); border-radius: val(3); width: val(70); text-align: center; margin-top: val(30);}
    .H106_itemSign1 {box-shadow: 0 0 0.33rem rgba(0,156,255,.3); color: #009cff;}
    .H106_itemSign2 {box-shadow: 0 0 0.33rem rgba(252,135,68,.3); color: #fc8744;}
    .E106_search {height: val(40); position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
    .E106_search>form {height: 100%;}
    .van-search {padding: val(10) val(3); height: 100%;}
</style>
