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
      <div class="I106_title">统计</div>
      <div class="H106_add"></div>
    </div>
    <div class="H106_content">
      <div class="S306_item">
        <div class="S306_itemTopOuter">
          <div class="S306_itemTop">
            <div class="S306_itemName">
              <img src="@/assets/images/S306_icon1.png" alt="">
              <span>闭环完成率</span>
            </div>
            <div class="S306_itemProgress">
              <el-progress type="circle" :percentage="res.closedLoopRate | fixedNumber(1)" color="#ff7878"></el-progress>
            </div>
          </div>
        </div>
        <div class="S306_itemContent">
          <div class="S306_itemButton" @click="jumpPage(res.patrolQualifiedNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.patrolQualifiedEidId?res.patrolQualifiedEidId:0,existAssetIds:res.patrolQualifiedAssetId?res.patrolQualifiedAssetId:0,type: menu})">
            <span>无不符合</span>
            <span class="S306_blueWord">（{{res.patrolQualifiedNumber||0}}）</span>
          </div>
          <div class="S306_itemButton" @click="jumpPage(res.reviewUnqualifiedNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.reviewUnqualifiedEidId?res.reviewUnqualifiedEidId:0,existAssetIds:res.reviewUnqualifiedAssetId?res.reviewUnqualifiedAssetId:0,type: menu})">
            <span>闭环不合格</span>
            <span class="S306_redWord">（{{res.reviewUnqualifiedNumber||0}}）</span>
          </div>
        </div>
      </div>
      <div class="S306_item">
        <div class="S306_itemTopOuter">
          <div class="S306_itemTop">
            <div class="S306_itemName">
              <img src="@/assets/images/S306_icon2.png" alt="">
              <span>巡查完成率</span>
            </div>
            <div class="S306_itemProgress">
              <el-progress type="circle" :percentage="res.patrolFinishRate | fixedNumber(1)" color="#ff7878"></el-progress>
            </div>
          </div>
        </div>
        <div class="S306_itemContent">
          <div class="S306_itemButton" @click="jumpPage(res.hasPatrolNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.hasPatrolEidId?res.hasPatrolEidId:0,existAssetIds:res.hasPatrolAssetId?res.hasPatrolAssetId:0,type: menu})">
            <span>已巡查</span>
            <span class="S306_blueWord">（{{res.hasPatrolNumber||0}}）</span>
          </div>
          <div class="S306_itemButton" @click="jumpPage(res.notHasPatrolNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.notHasPatrolEidId?res.notHasPatrolEidId:0,existAssetIds:res.notHasPatrolAssetId?res.notHasPatrolAssetId:0,type: menu})">
            <span>待巡查</span>
            <span class="S306_redWord">（{{res.notHasPatrolNumber||0}}）</span>
          </div>
        </div>
      </div>
      <!--<div class="S306_item">-->
        <!--<div class="S306_itemTopOuter">-->
          <!--<div class="S306_itemTop">-->
            <!--<div class="S306_itemName">-->
              <!--<img src="@/assets/images/S306_icon3.png" alt="">-->
              <!--<span>整改完成率</span>-->
            <!--</div>-->
            <!--<div class="S306_itemProgress">-->
              <!--<el-progress type="circle" :percentage="res.rectifyFinishRate | fixedNumber(1)" color="#ff7878"></el-progress>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="S306_itemContent">-->
          <!--<div class="S306_itemButton" @click="jumpPage(res.hasRectifyNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.hasRectifyEidId?res.hasRectifyEidId:0,existAssetIds:res.hasRectifyAssetId?res.hasRectifyAssetId:0,type: menu})">-->
            <!--<span>已整改</span>-->
            <!--<span class="S306_blueWord">（{{res.hasRectifyNumber||0}}）</span>-->
          <!--</div>-->
          <!--<div class="S306_itemButton" @click="jumpPage(res.notHasRectifyNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.notHasRectifyEidId?res.notHasRectifyEidId:0,existAssetIds:res.notHasRectifyAssetId?res.notHasRectifyAssetId:0,type: menu})">-->
            <!--<span>待整改</span>-->
            <!--<span class="S306_redWord">（{{res.notHasRectifyNumber||0}}）</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="S306_item">-->
        <!--<div class="S306_itemTopOuter">-->
          <!--<div class="S306_itemTop">-->
            <!--<div class="S306_itemName">-->
              <!--<img src="@/assets/images/S306_icon4.png" alt="">-->
              <!--<span>复核完成率</span>-->
            <!--</div>-->
            <!--<div class="S306_itemProgress">-->
              <!--<el-progress type="circle" :percentage="res.reviewFinishRate | fixedNumber(1)" color="#ff7878"></el-progress>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="S306_itemContent">-->
          <!--<div class="S306_itemButton" @click="jumpPage(res.hasReviewNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.hasReviewEidId?res.hasReviewEidId:0,existAssetIds:res.hasReviewAssetId?res.hasReviewAssetId:0,type: menu})">-->
            <!--<span>已复核</span>-->
            <!--<span class="S306_blueWord">（{{res.hasReviewNumber||0}}）</span>-->
          <!--</div>-->
          <!--<div class="S306_itemButton" @click="jumpPage(res.notHasReviewNumber,'reportStatistics',{selfTaskId:taskId,forTaskReport:forTaskReport,existEnterpriseIds:res.notHasReviewEidId?res.notHasReviewEidId:0,existAssetIds:res.notHasReviewAssetId?res.notHasReviewAssetId:0,type: menu})">-->
            <!--<span>待复核</span>-->
            <!--<span class="S306_redWord">（{{res.notHasReviewNumber||0}}）</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="S306_analysis">
        <div class="S306_analysisTitle">隐患分析</div>
        <div class="S306_analysisItem">
          <div class="S306_analysisItemTop clear">
            <div class="S306_checkbox">
              <el-checkbox v-model="types.basicsmanage" label="基础管理"></el-checkbox>
              <el-checkbox v-model="types.scenemanage" label="现场管理"></el-checkbox>
            </div>
            <div class="S306_analysisButtonOuter">
              <div class="S306_analysisButton" :class="currentChart===0?'S306_analysisButtonActive':''" @click="changeChart(0)">柱状图</div>
              <div class="S306_analysisButton" :class="currentChart===0?'':'S306_analysisButtonActive'" @click="changeChart(1)">饼状图</div>
            </div>
          </div>
          <div class="S306_analysisItemContent">
            <div class="S306_chartOuter" v-if="chartsData.smalltype.series[0].data.length === 0 && chartsData.smalltype.series[1].data.length === 0">
              <div class="S306_noData">
                <img src="@/assets/images/noData.png" alt="">
                <div>暂无相关数据</div>
              </div>
            </div>
            <div class="S306_chartOuter" v-if="(chartsData.smalltype.series[0].data.length !== 0 || chartsData.smalltype.series[1].data.length !== 0) && currentChart===0">
              <bar001
                width="100"
                height="100"
                index=1
                :data="chartsData.smalltype">
              </bar001>
            </div>
            <div class="S306_chartOuter" v-if="chartsData.smalltypePie.series.data.length !== 0 && currentChart===1">
              <pie001
                width="100"
                height="100"
                index=1
                :data="chartsData.smalltypePie">
              </pie001>
            </div>
          </div>
        </div>
        <div class="S306_analysisItem S306_mt">
          <div class="S306_analysisItemTop clear">
            <div class="S306_select">
              <el-select class="S306_selectWidth1" v-model="typesPick.type" placeholder="请选择">
                <el-option
                  v-for="item in typesSelect.typelist"
                  :key="'typelist_'+item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select class="S306_selectWidth2" v-model="typesPick.smalltype" placeholder="请选择">
                <el-option
                  v-for="item in typesSelect.smalltypelist"
                  :key="'smalltypelist_'+item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="S306_analysisItemContent">
            <div class="S306_chartOuter" v-if="chartsData.questionName.series[0].data.length === 0&&chartsData.questionName.series[1].data.length === 0">
              <div class="S306_noData">
                <img src="@/assets/images/noData.png" alt="">
                <div>暂无相关数据</div>
              </div>
            </div>
            <div class="S306_chartOuter" v-else>
              <bar001
                width="100"
                height="100"
                index=2
                :data="chartsData.questionName">
              </bar001>
            </div>
          </div>
        </div>
        <div class="S306_analysisItem S306_mt">
          <div class="S306_analysisItemTop clear">
            <div class="S306_analysisItemTitle">前10大隐患{{menu==0?'企业':'区域'}}分布</div>
          </div>
          <div class="S306_analysisItemContent">
            <div class="S306_chartOuter" v-if="chartsData.enterpriseName.series[0].data.length === 0 && chartsData.enterpriseName.series[1].data.length === 0">
              <div class="S306_noData">
                <img src="@/assets/images/noData.png" alt="">
                <div>暂无相关数据</div>
              </div>
            </div>
            <div class="S306_chartOuter" v-else>
              <bar001
                width="100"
                height="100"
                index=3
                :data="chartsData.enterpriseName">
              </bar001>
            </div>
          </div>
        </div>
        <div class="S306_analysisItem S306_mt">
          <div class="S306_analysisItemTop clear">
            <div class="S306_enterpriseNameOuter clear">
              <div class="S306_enterpriseName">{{menu==0?'企业':'区域'}}名称</div>
              <div class="S306_search">
                <form action="/">
                  <van-search
                    v-model="enterpriseName"
                    placeholder="输入您要查询的内容..."
                    shape="square"
                    left-icon=""
                    right-icon="search"
                    background="#eeeeee"
                    @search="searchByEnter()"
                  >
                  </van-search>
                </form>
              </div>
            </div>
          </div>
          <div class="S306_analysisItemContent">
            <div class="S306_chartOuter" v-if="chartsData.questionNameByEnter.series[0].data.length === 0&&chartsData.questionNameByEnter.series[1].data.length === 0">
              <div class="S306_noData">
                <img src="@/assets/images/noData.png" alt="">
                <div>暂无相关数据</div>
              </div>
            </div>
            <div class="S306_chartOuter" v-else>
              <bar001
                width="100"
                height="100"
                index=4
                :data="chartsData.questionNameByEnter">
              </bar001>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { statistics } from '@/api'
import bar001 from './body/bar_001'
import pie001 from './body/pie_001'
export default {
  // 组件名
  name: 'statistics',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      depId: JSON.parse(localStorage.getItem('userInfo')).JGDM,
      menu: 0,
      currentChart: 0, // 当前图表，0为柱状图，1为饼状图
      enterpriseName: '', // 企业名称
      types: {
        basicsmanage: false,
        scenemanage: false,
      },
      typesPick: {
        type: 0,
        smalltype: 0
      },
      typesSelect: {
        typelist: [],
        smalltypelist: [],
      },
      chartsData: {
        smalltype: {
          dataName: [],
          series: [
            {
              name: '巡查数量',
              data: []
            },
            {
              name: '复核数量',
              data: []
            }
          ]
        },
        smalltypePie: {
          series: {
            name: '',
            data: []
          }
        },
        questionName: {
          dataName: [],
          series: [
            {
              name: '巡查数量',
              data: []
            },
            {
              name: '复核数量',
              data: []
            }
          ]
        },
        enterpriseName: {
          dataName: [],
          series: [
            {
              name: '巡查数量',
              data: []
            },
            {
              name: '复核数量',
              data: []
            }
          ]
        },
        questionNameByEnter: {
          dataName: [],
          series: [
            {
              name: '巡查数量',
              data: []
            },
            {
              name: '复核数量',
              data: []
            }
          ]
        },
      },
      res: {
        closedLoopRate: 0, // 闭环完成率
        patrolFinishRate: 0, // 巡查完成率
        rectifyFinishRate: 0, // 整改完成率
        reviewFinishRate: 0, // 复核完成率
        patrolQualifiedNumber: 0, // 无不符合的数量
        reviewUnqualifiedNumber: 0, // 闭环不合格数量（复核完成有不合格数量）
        hasPatrolNumber: 0, // 已巡查数量
        notHasPatrolNumber: 0, // 待巡查数量
        hasRectifyNumber: 0, // 已整改数量
        notHasRectifyNumber: 0, // 待整改数量
        hasReviewNumber: 0, // 已复核数量
        notHasReviewNumber: 0, // 待复核数量
      }
    }
  },
  // 组件过滤器
  filters: {
    fixedNumber(data, number) {
      if(data) {
        return parseFloat(parseFloat(data).toFixed(number))
      } else {
        return 0
      }
    }
  },
  // 组件计算属性
  computed: {
    taskid() {
      return this.$route.params.taskid
    },
  },
  // 组件挂载
  components: {
    bar001,
    pie001
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
    this.initData()
  },
  destroyed() {
  },
  watch: {
    types: {
      handler() {
        if(this.typesSelect.typelist.length !== 0) {
          this.chartsData.smalltype.dataName = []
          this.chartsData.smalltype.series[0].data = []
          this.chartsData.smalltype.series[1].data = []
          this.chartsData.smalltypePie.series.data = []
          this.getSmallType()
        }
      },
      deep: true
    },
    'typesPick.type': {
      handler() {
        if(this.typesPick.type !== 0) {
          this.typesSelect.typelist.forEach((item) => {
            if(item.id === this.typesPick.type) {
              this.typesSelect.smalltypelist = [{
                name: '全部',
                id: 0
              }]
              this.typesSelect.smalltypelist = this.typesSelect.smalltypelist.concat(item.children)
            }
          })
        } else {
          this.typesSelect.smalltypelist = [{
            name: '全部',
            id: 0
          }]
        }
        this.typesPick.smalltype = 0
        this.findAllEnterHiddenquestion()
      }
    },
    'typesPick.smalltype': {
      handler() {
        this.findAllEnterHiddenquestion()
      }
    },
    enterpriseName: {
      handler() {
        if(this.enterpriseName === '') {
          this.chartsData.questionNameByEnter.dataName = []
          this.chartsData.questionNameByEnter.series[0].data = []
          this.chartsData.questionNameByEnter.series[1].data = []
          this.findHiddenqueByEnter()
        }
      }
    }
  },
  methods: {
    /**
     * 图表切换
     * @param number 当前图表
     */
    changeChart(number) {
      this.currentChart = number
    },
    /**
     * 返回上一页
     */
    pageBack() {
      this.$router.go(-1)
    },
    /**
     * 初始化加载数据
     */
    async initData() {
      let json = {
        taskId: this.taskid,
        depId: this.depId
      }
      const res = await statistics.statistics(json)
      this.res = res.result
      let json2 = {
        taskId: this.taskid,
        depId: this.depId,
      }
      let res2 = await statistics.getTypeAndLevelByTaskidAndEid(json2)
      if(res2 && res2.status === 10001 && res2.result) {
        this.typesSelect.typelist = [{
          name: '全部',
          id: 0
        }]
        this.typesSelect.smalltypelist = [{
          name: '全部',
          id: 0
        }]
        this.typesSelect.typelist = this.typesSelect.typelist.concat(res2.result.typelist)
        this.typesSelect.typelist.forEach((item1, index1) => {
          if(item1.id !== 0) {
            item1.children = []
            res2.result.smalltypelist.forEach((item2, index2) => {
              if(item1.id === item2.pid) {
                item1.children.push(item2)
              }
            })
          }
        })
        this.getSmallType()
        this.findAllEnterHiddenquestion()
        this.findHiddenqueByEnter()
      }
      let json3 = {
        taskId: this.taskid,
        depId: this.depId
      }
      let res3 = await statistics.findTopTenHiddenquestion(json3)
      if(res3 && res3.status === 10001) {
        this.chartsData.enterpriseName.dataName = []
        this.chartsData.enterpriseName.series[0].data = []
        this.chartsData.enterpriseName.series[1].data = []
        res3.result.forEach((item) => {
          this.chartsData.enterpriseName.dataName.push(item.enterprisename)
          this.chartsData.enterpriseName.series[0].data.push(item.patrolcount)
          this.chartsData.enterpriseName.series[1].data.push(item.reviewcount
          )
        })
      }
    },
    // 查看隐患问题
    async getSmallType() {
      let json = {
        taskId: this.taskid,
        depId: this.depId,
        basicsmanage: this.types.basicsmanage ? this.typesSelect.typelist[1].id : 0,
        scenemanage: this.types.scenemanage ? this.typesSelect.typelist[2].id : 0
      }
      let res = await statistics.findSmalltypeByTaskid(json)
      if(res && res.status === 10001) {
        this.chartsData.smalltype.dataName = []
        this.chartsData.smalltype.series[0].data = []
        this.chartsData.smalltype.series[1].data = []
        res.result.forEach((item) => {
          this.chartsData.smalltype.dataName.push(item.smalltypename)
          this.chartsData.smalltype.series[0].data.push(item.patrolcount)
          this.chartsData.smalltype.series[1].data.push(item.reviewcount)
          this.chartsData.smalltypePie.series.data.push({
            name: item.smalltypename,
            value: item.patrolcount
          })
        })
      }
    },
    // 根据隐患类别查看隐患问题
    async findAllEnterHiddenquestion() {
      let json = {
        taskId: this.taskid,
        depId: this.depId,
        type: this.typesPick.type || 0,
        smalltype: this.typesPick.smalltype || 0,
      }
      let res = await statistics.findAllEnterHiddenquestion(json)
      if(res && res.status === 10001) {
        this.chartsData.questionName.dataName.splice(0, this.chartsData.questionName.dataName.length)
        this.chartsData.questionName.series[0].data.splice(0, this.chartsData.questionName.series[0].data.length)
        this.chartsData.questionName.series[1].data.splice(0, this.chartsData.questionName.series[1].data.length)
        res.result.forEach((item) => {
          this.chartsData.questionName.dataName.push(item.hiddenquestionname)
          this.chartsData.questionName.series[0].data.push(item.patrolcount)
          this.chartsData.questionName.series[1].data.push(item.reviewcount)
        })
      }
    },
    // 根据企业名称查看隐患问题
    async findHiddenqueByEnter() {
      let json = {
        taskId: this.taskid,
        depId: this.depId,
        enterprisename: this.enterpriseName
      }
      let res = await statistics.findHiddenqueByEnter(json)
      if(res && res.status === 10001) {
        this.chartsData.questionNameByEnter.dataName = []
        this.chartsData.questionNameByEnter.series[0].data = []
        this.chartsData.questionNameByEnter.series[1].data = []
        res.result.forEach((item) => {
          this.chartsData.questionNameByEnter.dataName.push(item.hiddenquestionname)
          this.chartsData.questionNameByEnter.series[0].data.push(item.patrolcount)
          this.chartsData.questionNameByEnter.series[1].data.push(item.reviewcount)
        })
      }
    },
    searchByEnter() {
      this.chartsData.questionNameByEnter.dataName = []
      this.chartsData.questionNameByEnter.series[0].data = []
      this.chartsData.questionNameByEnter.series[1].data = []
      this.findHiddenqueByEnter()
    },
    /**
     * 跳转页面
     * @param number 对应数量，数量为0不跳转
     * @param name router的name
     * @param params router的params
     */
    jumpPage(number, name, params) {
      if(number > 0) {
        if(params) {
          this.$router.push({
            name: name,
            params: params
          })
        } else {
          this.$router.push({
            name: name,
          })
        }
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
    .H106_content {overflow: auto; height: 100%; padding-top: val(39); background-color: #f2f2f2;}
    .E106_search {height: val(40); position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
    .E106_search>form {height: 100%;}
    .van-search {padding: val(5);}
    .S306_item {margin: 1em 1em 0; box-shadow: 0 0 0.45em rgba(22,151,241,.29); background-color: #ffffff; border-radius: 0.5em; position: relative;}
    .S306_itemSign {position: absolute; left: 0; top: 0; height: 2.5em; width: 0.25em; border-top-left-radius: 0.5em;}
    .S306_itemSign1 {background-color: #fdbc62;}
    .S306_itemSign2 {background-color: #4ccc94;}
    .S306_itemSign3 {background-color: #e96aa1;}
    .S306_itemSign4 {background-color: #9f90f1;}
    .S306_itemTopOuter {padding-left: 1em; padding-right: 1em;}
    .S306_itemTop {padding: 1em 0;}
    .S306_itemName {color: #000000; font-size: 1.25em; font-weight: bold; display: inline-block;}
    .S306_itemName>img {width: 2.2rem; height: 2.2rem; vertical-align: middle; margin-right: 0.5rem;}
    .S306_itemProgress {display: inline-block; width: 5em; position: absolute; right: 1rem; top: 1rem;}
    .S306_itemPercent {display: inline-block;color: #008cee; font-size: 2em; text-align: right;}
    .S306_itemContent {padding: 0.5em 1.5em; text-align: left;}
    .S306_itemButton {display: inline-block; padding: 0.5em 0; color: #666666; font-size: 1em; margin: 0 0.5em; border-radius: 0.4em;}
    .S306_blueWord {color: #008cee;}
    .S306_redWord {color: #ff2f46;}
    .S306_analysis {margin-top: 1rem;}
    .S306_analysisTitle {font-size: 1.25rem; padding: 0.5rem 1rem;}
    .S306_analysisItem {background-color: #ffffff;}
    .S306_analysisItemTop {padding: 0.5rem 1rem; border-bottom: 1px solid #f2f2f2;}
    .S306_analysisButtonOuter {float: right;}
    .S306_analysisButton {float: left; display: inline-block; background-color: #dddddd; font-size: 1.25rem; color: #999999; padding: 0.5rem; margin: 0 0.1rem; border-radius: 0.167rem;}
    .S306_analysisButtonActive {color: #ffffff; background-color: #00b7ee;}
    .S306_chartOuter {height: 30rem; width: 100%;}
    .S306_mt {margin-top: 1rem;}
    .S306_analysisItemTitle {font-size: 1.25rem; padding: 0.5rem 0;}
    .S306_enterpriseNameOuter {padding-left: 5.5rem;}
    .S306_enterpriseName {display: inline-block; height: 4rem; line-height: 4rem;float: left; margin-right: 0.5rem; font-size: 1.25rem; margin-left: -5.5rem;}
    .S306_noData {text-align: center; font-size: 1.4rem; color: #cccccc; padding: 4rem 0;}
    .S306_noData>img {width: 20rem; margin-bottom: 2rem;}
</style>
