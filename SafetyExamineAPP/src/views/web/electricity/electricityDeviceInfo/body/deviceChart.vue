<style scoped>
  .deviceChartOuter {width: 100%; height: 100%;}
  .E306_searchPicker2 {width: 100%; height: 100%;}
  .deviceChartFullScreen {width: 100%; height: 100%;}
</style>

<template>
  <!--  -->
  <div class="deviceChartOuter">
    <div :id="'deviceChart_'+index"
         :class="getItemStyleClass()"
         :style="{ width: width + '%', height: height + '%','background-color':'#ffffff'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
export default {
  // 组件名
  name: 'deviceChart',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性 https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%B1%BB%E5%9E%8B
  props: {
    // 组件传入的数据
    index: {
      type: Number, // String, Number, Object
      required: false,
      default: 0,
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
      }
    },
  },
  // 组件数据
  data() {
    return {
      myChart: null,
      myChartFull: null,
      isPickerShow: false,
      option: {
        color: ['#5bd1f6', '#83d838', '#f68b3d', '#6f07ed'],
        title: {
          text: this.data.name,
          left: 10,
          top: 5
        },
        grid: {
          top: '25%',
          left: '10%',
          right: '15%'
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
            },
            // myTool: {// 自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
            //   show: true, // 是否显示
            //   title: '全屏显示', // 鼠标移动上去显示的文字
            //   icon: 'path://M64 165.632 64 416C64 433.664 78.336 448 96 448S128 433.664 128 416L128 235.328l203.456 203.52c11.968 11.968 31.36 11.968 43.392 0 11.968-12.032 11.968-31.424 0-43.392L171.328 192 352 192C369.664 192 384 177.664 384 160S369.664 128 352 128L101.632 128C78.272 128 64 140.032 64 165.632z M860.352 128 609.984 128c-17.664 0-32 14.336-32 32S592.32 192 609.984 192l180.672 0-203.52 203.456c-11.968 11.968-11.968 31.36 0 43.392 12.032 11.968 31.424 11.968 43.392 0l203.456-203.52L833.984 416c0 17.664 14.336 32 32 32s32-14.336 32-32L897.984 165.632C897.984 140.032 883.776 128 860.352 128z M101.632 960 352 960C369.664 960 384 945.664 384 928S369.664 896 352 896L171.328 896l203.52-203.456c11.968-11.968 11.968-31.36 0-43.392-12.032-11.968-31.424-11.968-43.392 0L128 852.672 128 672C128 654.336 113.664 640 96 640S64 654.336 64 672l0 250.368C64 947.968 78.272 960 101.632 960z M897.984 922.368 897.984 672c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 180.672-203.456-203.52c-11.968-11.968-31.36-11.968-43.392 0-11.968 12.032-11.968 31.424 0 43.392L790.656 896 609.984 896c-17.664 0-32 14.336-32 32s14.336 32 32 32l250.368 0C883.776 960 897.984 947.968 897.984 922.368z', // 图标
            //   onclick: () => { // 点击事件,这里的option1是chart的option信息
            //     this.requestFullScreen(this.index)
            //   }
            // }
          }
        },
        legend: {
          orient: 'horizontal',
          type: 'scroll',
          top: '15%',
          width: '70%',
          left: '20%',
          right: '10%',
          textStyle: {
            color: '#000000',
            fontSize: 16,
            rich: {
              'a': {
                width: 100
              }
            }
          },
        },
        tooltip: {
          formatter: (value) => {
            var html = ''
            html = '时间：' + moment(value.data[0]).format('YYYY-MM-DD, hh:mm:ss') + '<br/>' + value.seriesName + '：' + value.data[1] + this.data.unit
            return html
          }
        },
        dataZoom: [
          {
            type: 'inside',
            zoomLock: true,
            zoomOnMouseWheel: false,
            moveOnMouseMove: false,
            preventDefaultMouseMove: false,
            startValue: new Date().getTime() - 7200000,
            endValue: new Date().getTime()
          },
          {
            type: 'slider',
            zoomLock: true,
            show: true,
            startValue: new Date().getTime() - 7200000,
            endValue: new Date().getTime()
          }
        ],
        xAxis: {
          splitLine: 'false',
          name: '时间',
          type: 'time',
          // maxInterval: 3600000,
          max: 'dataMax',
          data: []
        },
        yAxis: {
          type: 'value',
          name: this.data.name + '：' + this.data.unit
        },
        series: []
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
    this.myChartFull = null
  },
  destroyed() {
  },
  watch: {
    data: {
      handler(newVal) {
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
      this.seriesReset()
      this.$nextTick(() => {
        this.myChart.setOption(this.option)
        window.onresize = this.myChart.resize
      })
    },
    seriesReset() {
      this.data.series.forEach((item, index) => {
        let dataArr = []
        item.data.forEach((item2, index2) => {
          dataArr.push([item2.createTime, item2.value])
        })
        this.option.series.push({
          name: item.name,
          type: 'line',
          showSymbol: true,
          symbolSize: 2,
          smooth: true,
          itemStyle: {
            // color:color
          },
          areaStyle: {
            // color:color,
            opacity: 0.16
          },
          lineStyle: {
            width: 1
          },
          sampling: 'average',
          markLine: {
            silent: true,
            symbol: '',
            label: {
              formatter: '{b}'
            },
            lineStyle: {
              color: '#f29999',
              type: 'dashed'
            },
            data: [{
              name: '阈值',
              yAxis: item.maximum,
            }, {
              name: '阈值',
              yAxis: item.minimum
            }]
          },
          data: dataArr
        })
      })
    },
    /* 对指定元素操作全屏 */
    requestFullScreen(index) {
      // let FullScreen = document.getElementById('deviceChartFullScreen_' + index)
      const d = document
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
      let length = (h - 50 - w) / 2
      let html = '<div id="FullScreenChart_' + index + '" style="width:100%;height:100%;"></div>'
      layer.open({
        title: this.data.name,
        type: 1,
        skin: 'D306_layer_' + index,
        area: ['100%', '100%'],
        content: html
      })
      let fullChart = document.getElementById('FullScreenChart_' + index)
      // let layerElement = document.getElementsByClassName('D306_layer_' + index)[0]
      fullChart.style.transform = 'rotate(90deg) translate(' + length + 'px,' + length + 'px)'
      fullChart.style.width = (h - 50) + 'px'
      fullChart.style.height = w + 'px'
      fullChart.style.transformOrigin = 'center center'
      this.myChartFull = echarts.init(fullChart)
      this.seriesReset()
      this.$nextTick(() => {
        this.option.toolbox.feature.myTool.show = false
        this.myChartFull.setOption(this.option)
        window.onresize = this.myChartFull.resize
      })
    }
  },
}
</script>
