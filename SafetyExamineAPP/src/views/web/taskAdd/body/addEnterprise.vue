<!--
 * Author: wsp
 * CreatDate: 2019-07-09
 *
 -->
<template>
  <div>
    <div class="H206_item" @click="showPicker()">
      <div class="H206_itemName" :class="data.isMust?'I106_must':''">{{data.name}}</div>
      <div class="H206_itemInput">
        <span>{{data.inputLabel || data.placeholder}}</span>
        <img src="@/assets/images/H206_icon1.png" alt="">
      </div>
    </div>
    <van-popup
      v-model="popupShow"
      position="right"
      :style="{width: '100%', height: '100%'}"
    >
      <div class="I106_page">
        <div class="I106_header">
          <div class="H106_return" @click="cancelChoose()">
            <img src="@/assets/images/arrowLeft.png" alt="">
          </div>
          <div class="I106_title">企业添加</div>
          <div class="H106_add"></div>
        </div>
        <div class="E106_search">
          <form action="/">
            <van-dropdown-menu>
              <van-dropdown-item @change="updateList(1)" v-model="type" :options="types" />
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
        <div class="H106_content">
          <van-pull-refresh v-model="loading" @refresh="updateList(1)">
            <van-list
              v-model="loading"
              :finished="finished"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              finished-text="没有更多了"
              @load="changeList()"
            >
              <div @click="toggle(index)" v-for="(item, index) in listData" :key="'checkbox_'+type+index">
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
          <div class="E206_resultNumber" @click="resultShow">已选择{{result.length}}家企业(点击查看)</div>
          <div  class="E206_resultBtn" @click="comfirmAdd">确定</div>
        </div>
        <van-popup
          v-model="isResultShow"
          position="bottom"
          :style="{width: '100%', height: '100%'}"
        >
          <div class="I106_page">
            <div class="I106_header">
              <div class="H106_return"></div>
              <div class="I106_title">已选择数量{{result.length}}</div>
              <div class="H106_add" @click="closeResult()">确定</div>
            </div>
            <div class="H106_content H106_content2">
              <div class="E206_resultList">
                <div class="E206_resultItem" v-for="(item, index) in result" :key="'result_'+index">
                  <div class="E206_resultItemName">{{typename(item, index)}}-{{item.name}}</div>
                  <van-button round type="danger" @click="delResult(index)">删除</van-button>
                </div>
              </div>
            </div>
          </div>
        </van-popup>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { task } from '@/api'
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
      required: true,
      type: Object
    }
  },
  // 组件数据
  data() {
    return {
      loading: false, // 加载状态，false表示加载完毕，true表示加载中
      finished: false, // 列表所有数据加载完毕时设为true
      error: false, // 加载错误时显示错误提示
      currentPage: 0,
      pageSize: 20, // 每页条数
      totalPage: '', // 总页数
      type: '',
      types: [],
      searchValue: '',
      listData: [],
      result: [],
      isResultShow: false,
      popupShow: false,
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
    this.initData()
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
    typename(data, index) {
      for(let i = 0; i < this.types.length; i++) {
        if(this.types[i].value === parseInt(data.type)) {
          this.result[index].typename = this.types[i].text
          return this.types[i].text
        }
      }
    },
    showPicker() {
      if(this.listData.length === 0 && this.data.noDataToast) {
        this.$toast(this.data.noDataToast)
        return
      }
      this.popupShow = true
    },
    cancelChoose() {
      this.popupShow = false
    },
    search() {
      this.updateList(1)
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
    /**
     * 初始化，获取字典项
     */
    async initData() {
      const res = await task.toadd()
      if(res && res.status === 10001) {
        if(res.result.enterpriseStatus) {
          res.result.enterpriseStatus.forEach((item) => {
            this.types.push({
              text: item.name,
              value: item.id
            })
          })
          this.type = this.types[0].value
          this.updateList(1)
        }
      }
    },
    toggle(index) {
      if(!this.listData[index].disabled) {
        if(!this.listData[index].checked) {
          this.result.push(this.listData[index])
        } else {
          this.result.forEach((item2, index2) => {
            if(item2.id === this.listData[index].id) {
              this.result.splice(index2, 1)
            }
          })
        }
        this.listData[index].checked = !this.listData[index].checked
        // this.$refs.checkboxes[index].toggle()
      }
    },
    resultShow() {
      if(this.result.length !== 0) {
        this.isResultShow = true
      }
    },
    /**
     * 删除结果项
     * @param index 下标
     */
    delResult(index) {
      this.result.splice(index, 1)
    },
    /**
     * 隐藏选择结果
     */
    closeResult() {
      this.listData.forEach((item1, index1) => {
        item1.checked = false
        this.result.forEach((item2, index2) => {
          if(item1.id === item2.id) {
            item1.checked = true
          }
        })
      })
      this.isResultShow = false
    },
    /**
     * 加载列表
     * @param currentPage 当前页
     */
    async updateList(currentPage) {
      if(this.type) {
        let json = {
          currentPage: currentPage,
          keyword: this.searchValue,
          type: this.type
        }
        const res = await task.getEnterprise(json)
        if(res && res.status === 10001) {
          this.currentPage = currentPage
          if(currentPage > 1) {
            this.listData = this.listData.concat(res.result.list)
          } else {
            this.listData = res.result.list
          }
          this.isAllLoad(res.result.total)
          this.listData.forEach((item1, index1) => {
            this.result.forEach((item2, index2) => {
              if(item1.id === item2.id) {
                item1.checked = true
              }
            })
          })
        } else {
          this.errorHandle()
        }
      }
    },
    comfirmAdd() {
      let json = {
        keyName: this.data.keyName,
        pickerValue: this.result
      }
      if(this.result.length !== 0) {
        this.data.inputLabel = '已选择以下' + this.data.name
      } else {
        this.data.inputLabel = ''
      }
      this.$emit('update', json)
      this.popupShow = false
    },
    changeList() {
      this.currentPage++
      this.updateList(this.currentPage)
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
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(12);}
  .H106_content {overflow: auto; height: 100%; padding-top: val(79); padding-bottom: val(40); background-color: #f2f2f2;}
  .E106_search {height: val(40); position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
  .E106_search>form {height: 100%;}
  .van-dropdown-menu {height: val(40);}
  .van-search {padding: val(10) val(3); width: 70%;}
  .van-checkbox {flex-flow: row; background-color: #ffffff; padding: val(12); border-bottom: 1px solid #eeeeee;font-size: val(14);}
  .E206_resultOuter {display: flex; justify-content: space-between; padding: val(5) val(10); background-color: #ffffff; position: absolute; left: 0; bottom: 0; width: 100%;}
  .E206_resultNumber {font-size: val(14); color: #008cf0; line-height: val(30);}
  .E206_resultBtn {background-color: #008cf0; color: #ffffff; font-size: val(14); width: 5rem; text-align: center; border-radius: val(5); height: val(30); line-height: val(30);}
  .H106_content2 {padding-bottom: 0; padding-top: val(39);}
  .E206_resultItem {display: flex; justify-content: space-between; border-bottom: 1px solid #eeeeee; background-color: #ffffff; padding: val(5);}
  .E206_resultItemName {font-size: val(14); line-height: val(30); max-width: 70%;}
  .van-button {height: val(30); line-height: val(30);}
  .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee; background-color: #ffffff;}
  .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
  .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
  .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .D106_btnOuter {display: flex; justify-content: space-between; padding: val(12);}
  .D106_btn {font-size: val(16);}
  .I106_must:after {content: '*'; color: red;}
</style>
