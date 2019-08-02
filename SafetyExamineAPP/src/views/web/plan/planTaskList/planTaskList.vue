<!--
 * Author: wsp
 * CreatDate: 2019-07-15
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">任务计划</div>
      <div class="H106_add" v-if="isNotHasSelfCount>0" @click="addTask">添加</div>
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
    <div class="P206_dateOuter">
      <div class="P206_date">{{startdate}}-{{enddate}}</div>
      <div></div>
    </div>
    <div class="H106_content">
      <list :listData="listData" @update="updateList" ref="planTaskList"></list>
    </div>
  </div>
</template>

<script>
import list from './body/list'
import { task, plan } from '@/api'
export default {
  // 组件名
  name: 'planTaskList',
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
  computed: {
    planId() {
      return parseInt(this.$route.params.planId)
    },
    planDateId() {
      return parseInt(this.$route.params.planDateId)
    },
    planRelationId() {
      return parseInt(this.$route.params.planRelationId)
    },
    startdate() {
      return this.$route.query.startdate
    },
    enddate() {
      return this.$route.query.enddate
    },
    isNotHasSelfCount() {
      return this.$route.query.isNotHasSelfCount
    }
  },
  // 组件挂载
  components: {
    list
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {},
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
     * 返回首页
     */
    pageBack() {
      this.$router.go(-1)
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
        currentPage: currentPage,
        keyword: this.searchValue,
        plandateid: this.planDateId
      }
      const res = await task.getTaskList(json)
      if(res && res.status === 10001) {
        if(currentPage > 1) {
          this.listData = this.listData.concat(res.result.list)
        } else {
          this.listData = res.result.list
        }
        this.$refs.planTaskList.isAllLoad(res.result.total)
      } else {
        this.$refs.planTaskList.errorHandle()
      }
    },
    addTask() {
      this.$router.push({
        name: 'taskAdd',
        query: {
          planId: this.planId,
          planDateId: this.planDateId,
          planRelationId: this.planRelationId,
          startDate: this.startdate,
          endDate: this.enddate
        }
      })
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

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(12);}
  .H106_content {overflow: auto; height: 100%; padding-top: val(109); background-color: #f2f2f2;}
  .E106_search {height: val(40); position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
  .E106_search>form {height: 100%;}
  .van-search {padding: val(10) val(3); height: 100%;}
  .P206_dateOuter {display: flex; justify-content: space-between; font-size: val(14); position: absolute; top: val(79); left: 0; width: 100%; height: val(30); line-height: val(30); padding: 0 val(10); border-bottom: 1px solid #666666; background-color: #ffffff; z-index: 1000;}
</style>
