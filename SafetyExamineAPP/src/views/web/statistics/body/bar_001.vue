<style scoped>

</style>

<template>
  <!--  -->
  <div :id="'bar_001_'+index"
       :class="getItemStyleClass()"
       :style="{ width: width + '%', height: height + '%'}"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  // 组件名
  name: 'bar_001',
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
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'axis',
          triggerOn: 'click',
          confine: true,
          textStyle: {
            fontSize: 14,
          },
          extraCssText: 'width:15rem; white-space:pre-wrap',
        },
        // 图例
        legend: {
          show: false,
          top: '5%',
          textStyle: {
            color: '#d9efff'
          }
        },
        grid: {
          top: '15%',
          left: '15%',
          bottom: '40%',
        },
        toolbox: {
          right: 20,
          itemSize: 25,
          feature: {
            dataZoom: {
              yAxisIndex: false,
              icon: {
                zoom: 'path://M768 448a320 320 0 1 0-320 320 320 320 0 0 0 320-320z m64 0A384 384 0 1 1 448 64a384 384 0 0 1 384 384z M681.28 726.72a32 32 0 0 1 45.44-45.44l160 160a32 32 0 0 1-45.44 45.44zM320 480a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z M480 576a32 32 0 0 1-64 0v-256a32 32 0 0 1 64 0z',
                back: 'path://M946.9 897.7L744 695.2c24.4-29.2 44.2-61.7 59.1-97 20.2-47.7 30.4-98.3 30.4-150.5s-10.2-102.8-30.4-150.5c-19.5-46-47.3-87.4-82.8-122.9s-76.8-63.4-122.8-82.8c-47.7-20.2-98.3-30.4-150.4-30.4S344.4 71.3 296.8 91.5c-46 19.5-87.3 47.4-122.8 82.8-35.5 35.5-63.3 76.8-82.8 122.9-20.2 47.7-30.4 98.3-30.4 150.5S71 550.5 91.2 598.2c19.5 46 47.3 87.4 82.8 122.9s76.8 63.4 122.8 82.8c47.7 20.2 98.3 30.4 150.4 30.4s102.7-10.2 150.4-30.4c34.9-14.8 67.1-34.4 96.1-58.5l203 202.6c6.9 6.9 16 10.4 25.1 10.4 9.1 0 18.2-3.5 25.2-10.5 13.8-13.8 13.8-36.3-0.1-50.2zM447.2 763.2c-84.2 0-163.3-32.8-222.8-92.4C164.8 611.2 132 532 132 447.7c0-84.3 32.8-163.5 92.3-223.1 59.5-59.6 138.7-92.4 222.8-92.4s163.3 32.8 222.8 92.4c59.5 59.6 92.3 138.8 92.3 223.1 0 83.9-32.5 162.8-91.6 222.3-0.4 0.4-0.8 0.8-1.2 1.1-0.3 0.3-0.6 0.6-0.8 0.9-59.3 58.9-137.9 91.2-221.4 91.2z M574 416H303.7c-19.7 0-35.6 12.8-35.6 32.5S284 481 303.7 481H574c19.7 0 35.6-12.8 35.6-32.5S593.7 416 574 416z'
              },
              emphasis: {
                iconStyle: {
                  borderColor: 'red'
                }
              }
            },
            restore: {
              show: true
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            zoomLock: true,
            startValue: 0,
            zoomOnMouseWheel: false,
            moveOnMouseMove: false,
            preventDefaultMouseMove: false,
            endValue: this.data.dataName.length < 13 ? (this.data.dataName.length - 1) : 13
          },
          {
            type: 'slider',
            zoomLock: true,
            show: !(this.data.dataName.length < 13)
          }
        ],
        // x轴
        xAxis: {
          type: 'category',
          show: true,
          data: this.data.dataName,
          boundaryGap: true,
          // 坐标轴颜色
          nameTextStyle: {
            color: '#000000',
            fontSize: 14,
          },
          // 坐标轴线
          axisLine: {
            lineStyle: {
              color: '#c2c2c2',
              width: 2
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            // rotate: -90,
            fontFamily: 'MicrosoftYaHei',
            padding: [0, 10, 0, 0],
            color: '#000000',
            formatter: (val) => {
              let html = ''
              if(val) {
                for(let i = 0; i < val.length; i++) {
                  if(i < 7) {
                    html += val.substring(i, i + 1) + '\n'
                  } else if(i === 7) {
                    html += '...'
                    break
                  }
                }
              }
              return html
            },
            textStyle: {
              fontSize: 14, // 让字体变大
            }
          }
        },
        // y轴
        yAxis: [{
          type: 'value',
          name: '',
          show: true,
          inverse: false,
          minInterval: 1,
          nameTextStyle: {
            color: '#000000',
            fontSize: 14,
          },
          axisLine: {
            lineStyle: {
              color: '#c2c2c2',
              width: 2
            }
          },
          boundaryGap: true, // 坐标轴两边留白策略
          // 坐标标签
          axisLabel: {
            margin: 15,
            interval: 0,
            fontSize: 14,
            fontFamily: 'MicrosoftYaHei',
            color: '#000000',
            textStyle: {
              fontSize: 14 // 让字体变大
            }
          },
          axisTick: false,
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ededed',
              width: 1,
            },
          },
          // 网格线段数
          splitNumber: 8,
          splitArea: {},
          areaStyle: {
            color: [['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']]
          }
        }],
        series: [
          {
            name: this.data.series[0].name,
            type: 'bar',
            yAxisIndex: 0,
            data: this.data.series[0].data,
            itemStyle: {
              // 定义一个list，然后根据所以取得不同的值，，
              barBorderRadius: [15, 15, 0, 0],
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#00b7ee' // 0% 处的颜色
                }, {
                  offset: 1, color: '#00b7ee'// 100% 处的颜色
                }],
              },
            },
            barMaxWidth: 10, // 最大宽度
          },
          {
            name: this.data.series[1].name,
            type: 'bar',
            yAxisIndex: 0,
            data: this.data.series[1].data,
            itemStyle: {
              // 定义一个list，然后根据所以取得不同的值，，
              barBorderRadius: [15, 15, 0, 0],
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#fe4551' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fe4551'// 100% 处的颜色
                }],
              },
            },
            barMaxWidth: 10, // 最大宽度
            barGap: '0',
            barCategoryGap: '30%'
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
        this.data.series.forEach((item, index) => {
          this.option.series[index].name = item.name
          this.option.series[index].data = item.data
        })
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
      this.myChart = echarts.init(dom, null, { renderer: 'svg' })
      this.myChart.setOption(this.option)
      window.onresize = this.myChart.resize
    },
  },
}
</script>
