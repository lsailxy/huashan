<!--
 * Author: wsp
 * CreatDate: 2019-06-28
 *
 -->
<template>
  <div>
    <div class="H206_item" @click="showPick()">
      <div class="H206_itemName" :class="data.isMust?'I106_must':''">{{data.name}}</div>
      <div class="H206_itemInput">
        <span>{{data.inputLabel || data.placeholder}}</span>
        <img src="@/assets/images/H206_icon1.png" alt="">
      </div>
    </div>
    <van-popup
      v-model="isPickerShow"
      position="right"
      :style="{width: '100%', height: '100%'}"
    >
      <div class="I106_page">
        <div class="I106_header">
          <div class="H106_return" @click="pickerCancel">
            <img src="@/assets/images/arrowLeft.png" alt="">
          </div>
          <div class="I106_title">{{data.name}}</div>
          <div class="H106_add"></div>
        </div>
        <div class="E106_search">
          <form action="/">
            <van-dropdown-menu>
              <van-dropdown-item @change="initData()" v-model="data.type" :options="data.types" />
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
            </van-dropdown-menu>
          </form>
        </div>
        <div class="I106_content">
          <van-pull-refresh v-model="loading" @refresh="initData()">
            <van-list
              v-model="loading"
              :finished="finished"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              finished-text="没有更多了"
              @load="changeList()"
            >
              <div @click="toggle(index)" v-for="(item, index) in data.values" :key="'checkbox_'+index">
                <van-checkbox
                  v-model="item.checked"
                  :name="item.id"
                  checked-color="#16a35f"
                  ref="checkboxes"><span v-html="brightenKeyword(item.name, searchValue)"></span></van-checkbox>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div class="E206_resultOuter">
          <div class="E206_resultNumber">已选择{{result.name}}</div>
          <div  class="E206_resultBtn" @click="pickerComfirm">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'addEnterprise',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {
    data: {
      type: Object, // String, Number, Object
      required: false,
      default() {
        return {}
      },
    },
  },
  // 组件数据
  data() {
    return {
      isPickerShow: false,
      searchValue: '',
      loading: false, // 加载状态，false表示加载完毕，true表示加载中
      finished: false, // 列表所有数据加载完毕时设为true
      error: false, // 加载错误时显示错误提示
      currentPage: 0,
      pageSize: 20, // 每页条数
      totalPage: '', // 总页数
      result: {},
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
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newData, oldData) {
      }
    },
    searchValue: {
      immediate: true,
      handler(newData, oldData) {
        if(this.searchValue === '') {
          this.initData()
        }
      }
    }
  },
  methods: {
    toggle(index) {
      this.data.values[index].checked = !this.data.values[index].checked
      if(this.data.values[index].checked) {
        this.result = this.data.values[index]
      } else {
        this.result = {}
      }
      this.data.values.forEach((item2, index2) => {
        if(item2.enterpriseid !== this.result.enterpriseid) {
          item2.checked = false
        }
      })
    },
    search() {
      this.initData()
    },
    /**
     * 搜索关键词高亮
     * @param val 值
     * @param keyword 关键字
     * @returns {*}
     */
    brightenKeyword(val, keyword) {
      val = val + ''
      if(val.indexOf(keyword) !== -1 && keyword !== '') {
        return val.replace(keyword, '<font color="#409EFF">' + keyword + '</font>')
      } else {
        return val
      }
    },
    showPick() {
      if(this.data.values.length === 0 && this.data.noDataToast) {
        this.$toast(this.data.noDataToast)
        return
      }
      if(this.data.inputValue) {
        this.data.values.forEach((item, index2) => {
          if(item.enterpriseid !== this.data.inputValue) {
            item.checked = false
          } else {
            item.checked = true
            this.result = item
          }
        })
      }
      this.isPickerShow = true
    },
    pickerCancel() {
      this.isPickerShow = false
      this.searchValue = ''
    },
    pickerComfirm() {
      this.data.inputLabel = this.result.name
      this.data.inputValue = this.result.enterpriseid
      this.data.inputType = this.result.type
      this.isPickerShow = false
      this.searchValue = ''
    },
    initData() {
      this.currentPage = 1
      let json = {
        currentPage: this.currentPage,
        searchValue: this.searchValue,
        type: this.data.type
      }
      this.$emit('updateList', json)
    },
    changeList() {
      this.currentPage++
      let json = {
        currentPage: this.currentPage,
        searchValue: this.searchValue,
        type: this.data.type
      }
      this.$emit('updateList', json)
    },
    errorHandle() {
      this.currentPage--
      this.loading = false
      this.error = true
    },
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
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee; background-color: #ffffff;}
  .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
  .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
  .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .H206_company {background-color: #f5f5fa; padding-bottom: val(12);}
  .H206_companyTop {padding: val(18) val(12) val(3.6); display: flex; justify-content: space-between;}
  .H206_companyTitle {color: #666666;font-size: val(14); line-height: val(21);}
  .H206_companyBtnOuter {}
  .H206_companyBtn {display: inline-block; height: val(21); line-height: val(21); padding: 0 val(6); border: 1px solid #16a35f; border-radius: 2px; margin-left: val(10)}
  .H206_companyBtn>span {color: #16a35f; font-size: val(12);}
  .H206_companyBtn>img {width: val(12); vertical-align: sub;}
  .H206_companyContent {background-color: #ffffff; padding: val(18) val(12) 0;}
  .H206_companyName {display: inline-block; font-size: val(14); height: val(36); line-height: val(36); border-radius: val(18); border: 1px solid #e8ecf1; color: #303030; padding: 0 val(12); margin-bottom: val(18); margin-right: val(5)}
  .H206_companyNameCur {border: none; background-color: #39b177; color: #ffffff;}
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: 50%; margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(18);}
  .I106_content {overflow: auto; height: 100%; padding-top: val(79);}
  .E106_search {height: val(40); position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
  .E106_search>form {height: 100%;}
  .van-dropdown-menu {height: val(40);}
  .van-search {padding: val(10) val(3); width: 70%;}
  .I106_must:after {content: '*'; color: red;}
  .van-checkbox {flex-flow: row; background-color: #ffffff; padding: val(12); border-bottom: 1px solid #eeeeee;font-size: val(14);}
  .E206_resultOuter {display: flex; justify-content: space-between; padding: val(5) val(10); background-color: #ffffff; position: absolute; left: 0; bottom: 0; width: 100%;}
  .E206_resultNumber {font-size: val(14); color: #008cf0; line-height: val(30); max-width: 80%;}
  .E206_resultBtn {background-color: #008cf0; color: #ffffff; font-size: val(14); width: 5rem; text-align: center; border-radius: val(5); height: val(30); line-height: val(30);}
  .H106_content2 {padding-bottom: 0; padding-top: val(39);}
  .E206_resultItem {display: flex; justify-content: space-between; border-bottom: 1px solid #eeeeee; background-color: #ffffff; padding: val(5);}
  .E206_resultItemName {font-size: val(14); line-height: val(30);}
  .van-button {height: val(30); line-height: val(30);}
  .A206_radioOuter {border-bottom: 1px solid #eeeeee; padding: val(10); background-color: #ffffff;}
</style>
