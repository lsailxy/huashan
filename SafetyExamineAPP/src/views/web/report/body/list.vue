<!--
 * Author: wsp
 * CreatDate: 2019-06-26
 *
 -->
<template>
  <div>
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
          <li v-for="(item, index) in listData" :key="'enterprise_'+index" @click="changeCompany(item, index)">
            <div class="E106_listItem">
              <div class="E106_listItemName" :class="pdfIndex === index?'R306_current':''">{{item.enterprisename}}</div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
    <div class="R306_pdf" v-show="pdf.patrolPDF||pdf.rectifyPDF||pdf.reviewPDF">
      <a @click="openPDF('patrolPDFExport',1)" v-show="pdf.patrolPDF">巡查报告</a>
      <a @click="openPDF('rectifyPDFExport',2)" v-show="pdf.rectifyPDF">整改报告</a>
      <a @click="openPDF('reviewPDFExport',3)" v-show="pdf.reviewPDF">复核报告</a>
    </div>
  </div>
</template>

<script>
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
      pdf: {
        patrolPDF: false,
        rectifyPDF: false,
        reviewPDF: false,
        taskdetailid: null
      },
      pdfIndex: null,
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
     * 企业报告切换
     * @param data 报告数据
     * @param index 该企业所在数组下标
     */
    changeCompany(data, index) {
      this.pdf.patrolPDF = data.patrolPDF
      this.pdf.rectifyPDF = data.rectifyPDF
      this.pdf.reviewPDF = data.reviewPDF
      this.pdf.taskdetailid = data.taskdetailid
      this.pdfIndex = index
    },
    /**
     * 点击报告按钮
     * @param name 报告路径名称
     * @param type 报告类型
     */
    openPDF(name, type) {
      const isDev = process.env.NODE_ENV === 'development'
      // 从暴露的全局配置中获取当前环境对应的配置对象
      const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
      let url = globalConfig.BASE_URL_MAP.DEFAULT + name + '?taskdetailid=' + this.pdf.taskdetailid + '&type=' + type
      console.log(url)
      this.downloadPDF(url, type)
    },
    /**
     * 下载报告
     * @param url 报告路径
     * @param type 报告类型
     */
    downloadPDF(url, type) {
      let _this = this
      let pdfType = ''
      if(type === 1) {
        pdfType = '巡查报告'
      } else if(type === 2) {
        pdfType = '整改报告'
      } else if(type === 3) {
        pdfType = '复核报告'
      }
      let localUrl = '_downloads/' + _this.$route.query.taskName + _this.pdf.taskdetailid + pdfType + '.pdf'
      if(plus) {
        _this.$toast.loading({
          duration: 0, // 持续展示toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'circular',
        })
        plus.io.resolveLocalFileSystemURL(localUrl, function(entry) {
          entry.file(function(file) {
            // netintech.msg("之前已下载")
            _this.$toast.clear()
            // console.log(file);
            plus.runtime.openFile(localUrl)
          })
        }, (e) => {
          // 创建下载管理对象
          var dtask = plus.downloader.createDownload(url, {
            retryInterval: 10
          }, (d, status) => {
            // 下载完成
            if(status === 200) { // 下载成功后的回调函数
              _this.$toast.clear()
              plus.runtime.openFile(d.filename)
            } else {
              _this.$toast('下载失败！请稍后重试')
            }
          })
          dtask.start() // 开始下载任务
        })
      }
    },
    /**
     * 列表初始化
     */
    initData() {
      this.currentPage = 1
      this.$emit('update', this.currentPage)
    },
    initPDF() {
      this.pdf.patrolPDF = false
      this.pdf.rectifyPDF = false
      this.pdf.reviewPDF = false
      this.pdf.taskdetailid = null
      this.pdfIndex = null
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
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    .H106_list {}
    .H106_list>li {background-color: #ffffff; padding: 0 val(12); border-bottom: 1px solid #eeeeee;}
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
    .R306_pdf {position: absolute; bottom: 0; left: 0; width: 100%; display: flex; justify-content: space-around; padding: val(10) 0; border-top: 1px solid #bec2cd; background-color: #ffffff;}
    .R306_pdf>a {display: inline-block; border: 1px solid #008cee; border-radius: 0.2rem; color: #008cee; font-size: val(16); height: val(30); line-height: val(30); padding: 0 val(8);}
    .R306_current {color: #008cee!important;}
</style>
