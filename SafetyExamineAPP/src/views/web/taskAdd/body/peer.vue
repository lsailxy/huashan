<!--
 * Author: wsp
 * CreatDate: 2018-11-13
 *
 -->
<template>
  <div style="width: 100%;">
    <div class="H206_item" @click="showPick(data.keyName)">
      <div class="H206_itemName">{{data.name}}</div>
      <div class="H206_itemInput">
        <span>{{pickerValueComfirm?pickerValueComfirm:data.placeholder}}</span>
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
          <div class="H106_add" @click="pickerComfirm">确定</div>
        </div>
        <div class="H106_content">
          <div class="R106_search">
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
          </div>
          <van-checkbox-group v-model="selectedData">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in searchResult"
                clickable
                :key="item.id"
                @click="toggle(index)"
              >
                <div class="P206_name" v-html="brightenKeyword(item.name, searchValue)"></div>
                <van-checkbox :name="item" checked-color="#16a35f" ref="checkboxes" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'peer',
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
    }
  },
  // 组件数据
  data() {
    return {
      isPickerShow: false,
      selectedData: [],
      pickerValueComfirm: '',
      searchValue: '',
      searchResult: []
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
    searchValue() {
      if(this.searchValue === '') {
        this.searchResult = this.data.values
      }
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    showPick(pickerName) {
      this.searchResult = this.data.values
      this.isPickerShow = true
    },
    search() {
      this.searchResult = this.searchList(this.searchValue, this.data.values)
    },
    /**
     * 数组模糊搜索
     * @param [String] str 搜索的字符串
     * @param [Array] container 搜索的数组
     * @returns {Array}
     */
    searchList(str, container) {
      var newList = []
      // 新的列表
      var startChar = str.charAt(0)
      // 开始字符
      var strLen = str.length
      // 查找符串的长度
      for(var i = 0; i < container.length; i++) {
        var obj = container[i]
        var isMatch = false
        for(var p in obj) {
          if(typeof (obj[p]) === 'function') {
            obj[p]()
          } else {
            var curItem = ''
            if(obj[p] != null) {
              curItem = obj[p]
            }
            for(var j = 0; j < curItem.length; j++) {
              if(curItem.charAt(j) === startChar) {
                if(curItem.substring(j).substring(0, strLen) === str) {
                  isMatch = true
                  break
                }
              }
            }
          }
        }
        if(isMatch) {
          newList.push(obj)
        }
      }
      return newList
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
    pickerComfirm() {
      let selectName = []
      this.selectedData.forEach((item) => {
        selectName.push(item.name)
      })
      let json = {
        pickerName: this.data.keyName,
        pickerValue: this.selectedData
      }
      this.$emit('update', json)
      if(this.selectedData.length !== 0) {
        this.pickerValueComfirm = selectName.join(',')
      } else {
        this.pickerValueComfirm = ''
      }
      this.isPickerShow = false
      // window.netintech.Storage.set('popup', false)
    },
    pickerCancel() {
      this.isPickerShow = false
      // window.netintech.Storage.set('popup', false)
    }
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee;}
  .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
  .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
  .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(12);}
  .H106_content {overflow: auto; height: 100%; padding-top: val(97); background-color: #f5f5fa;}
  .van-checkbox {flex-flow: row-reverse;}
  .R106_search {position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
  .P206_name {display: inline-block; font-size: val(14);}
  .van-cell__value {display: flex; justify-content: space-between;}
</style>
