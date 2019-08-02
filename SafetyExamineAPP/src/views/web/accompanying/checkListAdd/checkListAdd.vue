<!--
 * Author: wsp
 * CreatDate: 2019-07-09
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">添加检查表</div>
      <div class="H106_add" @click="comfirmAdd">确定</div>
    </div>
    <div class="I106_content">
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in res"
            clickable
            :key="item.id"
            :title="item.name"
            @click="toggle(index)"
          >
            <van-checkbox :name="item" :disabled="item.disabled" ref="checkboxes" slot="right-icon"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
import { task, accompanying } from '@/api'
export default {
  // 组件名
  name: 'checkListAdd',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      res: [],
      result: [],
      oldCheckList: JSON.parse(sessionStorage.getItem('ahList'))
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    taskid() {
      return this.$route.params.taskid
    },
    taskdetailid() {
      return this.$route.params.taskdetailid
    },
  },
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
  watch: {},
  methods: {
    async initData() {
      const res = await task.toadd()
      if(res && res.status === 10001) {
        this.res = res.result.checklist || []
        this.oldCheckList.forEach((item) => {
          this.res.forEach((item2, index2) => {
            if(item.taskhiddenid === item2.id) {
              item2.disabled = true
            }
          })
        })
      }
    },
    toggle(index) {
      if(!this.res[index].disabled) {
        this.$refs.checkboxes[index].toggle()
      }
    },
    pageBack() {
      sessionStorage.removeItem('ahList')
      this.$router.go(-1)
    },
    async comfirmAdd() {
      let allCheckList = []
      let newCheckList = []
      this.result.forEach((item) => {
        allCheckList.push(item.id)
        newCheckList.push(item.id)
      })
      this.oldCheckList.forEach((item) => {
        allCheckList.push(item.taskhiddenid)
      })
      let json = {
        taskdetailid: this.taskdetailid,
        taskid: this.taskid,
        checklist: allCheckList.join(','),
        checkid: newCheckList.join(',')
      }
      const res = await accompanying.addCheckList(json)
      if(res && res.status === 10001) {
        sessionStorage.removeItem('ahList')
        this.$router.go(-1)
      }
    }
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
    .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
    .H106_add>img {height: val(18); margin-left: val(18);}
    .I106_content {overflow: auto; height: 100%; padding-top: val(42);}
    .van-checkbox {flex-flow: row-reverse;}
</style>
