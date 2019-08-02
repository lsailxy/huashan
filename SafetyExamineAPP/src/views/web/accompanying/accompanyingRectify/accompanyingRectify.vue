<!--
 * Author: wsp
 * CreatDate: 2019-06-26
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="jumpPage('application')">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">整改通知单</div>
      <div class="H106_add"></div>
    </div>
    <div class="I106_content">
      <div>
        <list :listData="listData" @update="updateList" ref="accompanyingRectifyList"></list>
      </div>
    </div>
  </div>
</template>

<script>
import list from './body/list'
import { accompanying } from '@/api'
export default {
  // 组件名
  name: 'accompanyingRectify',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      listData: [
        {
          serialnumber: 'AQXC-20192212312'
        }
      ],
      total: 0,
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
    taskType() {
      this.updateList(1)
    }
  },
  methods: {
    tabChange(index, title) {
      this.jumpPage('accompanyingList')
    },
    async updateList(currentPage) {
      let json = {
        currentpage: currentPage,
        keyword: '',
        tasktype: 3
      }
      const res = await accompanying.accompanyTaskList(json)
      if(res && res.status === 10001) {
        if(currentPage > 1) {
          this.listData = this.listData.concat(res.result.list)
        } else {
          this.listData = res.result.list
        }
        this.$refs.accompanyingRectifyList.isAllLoad(res.result.count)
      } else {
        this.$refs.accompanyingRectifyList.errorHandle()
      }
    },
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
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: 50%; margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: val(12);}
  .H106_add>img {height: val(18); margin-left: val(18);}
  .I106_content {overflow: auto; height: 100%; padding-top: val(42);}
</style>
