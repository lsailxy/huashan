<!--
 * Author: wsp
 * CreatDate: 2018-12-19
 *
 -->
<template>
  <div>
    <div class="H206_item" @click="showPick()">
      <div class="H206_itemName" :class="isMust?'I106_must':''">{{data.name}}</div>
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
        <div class="I106_content">
          <div class="S106_tree S106_tree2">
            <el-tree
              class="filter-tree"
              @check-change="checkChange"
              :data="data.values"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              :default-checked-keys="data.inputValue"
              highlight-current
              :filter-node-method="filterNode"
              :check-strictly="data.checkStrictly"
              ref="elTree">
              <span class="span-ellipsis" slot-scope="{ node, data }">
                <span :title="node.label" v-html="brightenKeyword(node.label,searchValue)"></span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'sonCompaniesTree',
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
    isMust: {
      type: Boolean, // String, Number, Object
      required: false,
      default: false,
    }
  },
  // 组件数据
  data() {
    return {
      isPickerShow: false,
      pickerValueComfirm: '',
      searchValue: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedId: null
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
  },
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
    searchValue(val) {
      if(val === '') {
        this.$refs.elTree.filter(val)
      }
    },
  },
  methods: {
    checkChange(data, checked, node) {
      if(this.data.single) {
        if(checked === true) {
          this.checkedId = data.id
          this.$refs.elTree.setCheckedNodes([data])
        }
      }
    },
    nodeClick(data, checked, node) {
      if(!data.disabled) {
        this.checkedId = data.id
        this.$refs.elTree.setCheckedNodes([data])
      }
    },
    search() {
      this.$refs.elTree.filter(this.searchValue)
    },
    filterNode(value, data) {
      if(!value) return true
      return data.name.indexOf(value) !== -1
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
      this.isPickerShow = true
    },
    pickerCancel() {
      this.isPickerShow = false
      this.searchValue = ''
    },
    pickerComfirm() {
      let json = {
        keyName: this.data.keyName,
        pickerTree: this.$refs.elTree.getCheckedNodes(false),
        pickerValue: this.$refs.elTree.getCheckedNodes(true)
      }
      this.$emit('update', json)
      if(json.pickerValue.length !== 0) {
        this.pickerValueComfirm = '已选择以下' + this.data.name
      } else {
        this.pickerValueComfirm = ''
      }
      this.isPickerShow = false
      this.searchValue = ''
    }
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
  .D106_btnOuter {display: flex; justify-content: space-between; padding: val(12);}
  .D106_btn {font-size: val(16);}
  .I106_must:after {content: '*'; color: red;}
  .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
  .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
  .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: 50%; margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
  .H106_return>img {height: val(18);}
  .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
  .H106_add>img {height: val(18); margin-left: val(18);}
  .I106_content {overflow: auto; height: 100%; padding-top: val(100);}
  .R306_checkbox {margin: 1rem 1rem 0;display: block;text-align: right;}
  .span-ellipsis {width: 100%;font-size: 1.4rem!important; border-bottom: 1px solid #e8e7ed; padding: val(12) val(36) val(12) 0;line-height: 2rem;}
  .R106_search {position: absolute; top: val(42); left: 0; width: 100%; z-index: 1000;}
  .I106_must:after {content: '*'; color: red;}
</style>
