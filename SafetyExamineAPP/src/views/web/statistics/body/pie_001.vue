<style scoped>

</style>

<template>
  <!--  -->
  <div id="pie_001"
       :class="getItemStyleClass()"
       :style="{ width: width + '%', height: height + '%'}"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  // 组件名
  name: 'pie_001',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性 https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%B1%BB%E5%9E%8B
  props: {
    // 组件传入的数据
    index: {
      type: String, // String, Number, Object
      required: false,
      default: '0',
    },
    width: {
      type: String, // String, Number, Object
      required: false,
      default: '100',
    },
    height: {
      type: String, // String, Number, Object
      required: false,
      default: '100',
    },
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
      myChart: {},
      option: {
        color: ['#f9cd33', '#605ad8', '#8f55e7', '#5ed8a9', '#ffb11a', '#86d9e0', '#78c446', '#f86846', '#1fb545', '#6c6fbf', '#4fc5ea', '#33a5af', '#86d9e0'],
        grid: {
          top: '15%',
          left: '10%',
          right: '10%'
        },
        legend: {
          orient: 'horizontal',
          type: 'scroll',
          top: 'bottom',
          width: '90%',
          left: '5%',
          right: '5%',
          textStyle: {
            color: '#000000',
            fontSize: 20,
            rich: {
              'a': {
                width: 100
              }
            }
          },
          pageIconSize: 20,
          icon: 'circle',
          data: this.data.series.data,
        },
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 20
          },
          triggerOn: 'click',
          confine: true,
        },
        series: [
          // 主要展示层的
          {
            radius: ['30%', '40%'],
            center: ['50%', '50%'],
            type: 'pie',
            label: {
              normal: {
                show: true,
                formatter: '{c}',
                textStyle: {
                  fontSize: 24,

                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 15,
                length2: 0,
                smooth: true,
              },
              emphasis: {
                show: false
              }
            },
            name: '',
            data: this.data.series.data,

          },
        ]
      }
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
    this.eChartInit()
  },
  beforeDestroy() {
    this.myChart.clear()
    this.myChart = null
  },
  destroyed() {
  },
  watch: {
    data: {
      handler(newVal) {
        // this.option.xAxis.data = this.data.dataName;
        this.option.series[0].name = this.data.series.name
        this.option.legend.data = this.data.series.data
        this.option.series[0].data = this.data.series.data
        this.$nextTick(() => {
          this.eChartInit()
        })
      },
      deep: true,
    },
  },
  methods: {
    getItemStyleClass() {
      return this.$options.name + '_' + this.index
    },
    eChartInit() {
      let dom = document.getElementsByClassName(this.getItemStyleClass())[0]
      this.myChart = echarts.init(dom)
      this.myChart.setOption(this.option)
      window.onresize = this.myChart.resize
    },
  },
}
</script>
