<!--
 * Author: wsp
 * CreatDate: 2019-06-26
 *
 -->
<template>
  <van-pull-refresh v-model="loading" @refresh="initData()">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="changeList()"
    >
      <ul class="H106_list">
        <li v-for="(item, index) in listData" :key="'plan_'+index" @click="jumpPage('planDetails', {planId: item.id}, {planName: item.name})">
          <van-swipe-cell :disabled="!(currentUser === item.createuser)">
            <div class="H106_itemOuter">
              <div class="H106_item">
                <div class="H106_itemName">{{item.name}}</div>
                <div class="H106_itemDate">{{item.createdepname}}</div>
              </div>
              <div class="H106_item">
                <div class="H106_itemDatas">
                  <span>备注：</span>
                  <span>{{item.remark}}</span>
                </div>
              </div>
            </div>
            <van-button
              square
              slot="right"
              type="danger"
              text="删除"
              @click="delPlan(item, index)"
            />
          </van-swipe-cell>
        </li>
      </ul>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { plan } from '@/api'
import { toastText } from '@/utils'
export default {
  // 组件名
  name: 'list',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  // 组件数据
  data() {
    return {
      loading: false, // 加载状态，false表示加载完毕，true表示加载中
      finished: false, // 列表所有数据加载完毕时设为true
      error: false, // 加载错误时显示错误提示
      currentPage: 0,
      pageSize: 10, // 每页条数
      totalPage: '', // 总页数
      currentUser: JSON.parse(localStorage.getItem('userInfo')).ID
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
    /**
     * 列表初始化
     */
    initData() {
      this.currentPage = 1
      this.$emit('update', this.currentPage)
    },
    /**
     * 更新列表
     */
    changeList() {
      this.currentPage++
      this.$emit('update', this.currentPage)
    },
    /**
     * 数据加载错误时显示提示
     */
    errorHandle() {
      this.currentPage--
      this.loading = false
      this.error = true
    },
    /**
     * 页面跳转
     * @param name 路由名称
     * @param params 路由参数
     * @param query 路由参数
     */
    jumpPage(name, params, query) {
      this.$router.push({
        name: name,
        params: params || {},
        query: query || {}
      })
    },
    /**
     * 检测是否加载完毕
     * @param total 总条数
     */
    isAllLoad(total) {
      if(total <= this.pageSize) {
        this.totalPage = 1
      } else if(total > this.pageSize && total % this.pageSize === 0) {
        this.totalPage = total / this.pageSize
      } else {
        this.totalPage = Math.floor(total / this.pageSize) + 1
      }
      if(this.currentPage < this.totalPage) {
        this.finished = false
      } else {
        this.finished = true
      }
      this.loading = false
    },
    /**
     * 删除计划请求
     * @param item 数据
     * @param index 下标
     */
    async delPlanAjax(item, index) {
      let json = {
        id: item.id
      }
      const res = await plan.deletePlan(json)
      if(res && res.status === 10001) {
        this.$toast(toastText.success.delSuccess)
        this.listData.splice(index, 1)
      }
    },
    /**
     * 删除计划
     * @param item 数据
     * @param index 下标
     */
    delPlan(item, index) {
      this.$dialog.confirm({
        message: '确认删除吗？'
      }).then(() => {
        this.delPlanAjax(item, index)
      }).catch(() => {})
    }
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    .H106_list {}
    .H106_list>li {background-color: #ffffff; border-bottom: 1px solid #eeeeee;}
    .H106_itemOuter {padding: val(12);}
    .H106_item {display: flex; justify-content: space-between; padding: val(6) 0 0; line-height: val(18);}
    .H106_itemName {width: 70%; color: #333333; font-size: val(17); font-weight: bold;}
    .H106_itemDate {color: #999999; font-size: val(13);}
    .H106_itemDatas {max-width: 60%;}
    .H106_itemData {color: #808080; font-size: val(14); padding: val(6) 0;}
    .H106_itemNumber {display: inline-block; color: #16a35f; font-size: val(12); background-color: #e3fff1; padding: 0 val(12); border-radius: 2px;}
    .H106_itemSign {font-size: val(14); display: inline-block; height: val(28); line-height: val(28); border-radius: val(3); width: val(70); text-align: center; margin-top: val(30);}
    .H106_itemSign1 {box-shadow: 0 0 0.33rem rgba(0,156,255,.3); color: #009cff;}
    .H106_itemSign2 {box-shadow: 0 0 0.33rem rgba(252,135,68,.3); color: #fc8744;}
    .I206_itemBtnOuter {display: flex; border-top: 1px dashed #e6e6e6;}
    .I206_itemBtnOuter .I206_itemBtn:first-child {border-left: none;}
    .I206_itemBtn {width: 33.3%; border-left: 1px dashed #e6e6e6; text-align: center; padding: val(10); line-height: val(35);}
    .I206_itemBtn>img {height: val(21);}
    .S106_more {}
    .S106_more>li {display: block; padding: 1.5rem 0; border-top: 1px solid #e6e6e6; width: 14rem; text-align: center; font-size: 1.4rem;}
    .S106_more>li:first-child {border-top: none;}
    .S106_buttonName {line-height: 2rem; font-size: 1.3rem; color: #454545; position: relative;}
    .S106_buttonName>span {position: relative;}
    .S106_sign {position: absolute; top: 0.5rem; right: 2.4rem; width: 4.55rem; height: 4.55rem;background-repeat: no-repeat; background-size: 100% 100%;}
    .I106_icon {width: val(21); vertical-align: middle;}
    .M106_iconDiy .van-info {min-height: 1rem; min-width: 1rem;}
    .E106_listItem {display: flex; justify-content: space-between; padding: val(20) 0;}
    .E106_listItemName {font-size: val(16);}
    .E106_listItem>img {height: val(16); margin-left: val(10);}
    .van-button {height: 100%;}
</style>
