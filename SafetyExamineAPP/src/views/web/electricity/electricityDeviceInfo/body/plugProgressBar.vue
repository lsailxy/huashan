<template>
  <!-- 再犯罪情况分析页面 再犯案人数/预警人数 -->
  <div class="plug01_progressMain" :style="{ width: width}">
    <div class="plug01P_content plug01P_contentT" :style="{ width: percent}">
      <div class="current" :style="{ color: overMax?'red':'#000000'}">{{data.value}}{{data.unit}}</div>
    </div>
    <div class="plug01P_content1 P106_min" :style="{width: data.minValue==='0'?0:'10%'}">
      <div class="range range1">{{data.minValue}}{{data.unit}}</div>
    </div>
    <div class="plug01P_content1 P106_max">
      <div class="range range2">{{data.maxValue}}{{data.unit}}</div>
    </div>
    <!--<div class="plug01P_font" :id="id"  >{{ data != undefined ? data.currentData : 0 }}</div>-->
  </div>
</template>

<script>
export default {
  name: 'plugProgressBar',
  data() {
    return {
      percent: '0%',
      overMax: false
      /*     refreshEvent:null, */
    }
  },
  props: ['width', 'height', 'bgColor', 'data', 'index'], // id是一个页面两个相同组件的区分
  computed: {},
  mounted: function() {
    this.setPlug01PCotent()
  },
  methods: {
    /**
          * 当前
          * @param data 数据
          */
    setContentWidth(data) {
      let max = parseFloat(data.maxValue)
      let min = 0
      let val = parseFloat(data.value)
      if(val < min) {
        return '5%'
      } else if(val >= min && val <= max) {
        let percent = (val - min) / (max - min) * 100 + '%'
        return percent
      } else {
        return '95%'
      }
    },
    setPlug01PCotent() {
      let $this = this
      document.getElementsByClassName('plug01P_content')[$this.index].classList.add('plug01P_contentT')
      if($this.data) {
        $this.percent = $this.setContentWidth($this.data)
        let max = parseFloat($this.data.maxValue) || 0
        let val = parseFloat($this.data.value)
        if(val > max) {
          $this.overMax = true
        } else {
          $this.overMax = false
        }
      }
    },
    refresh() {
      this.refreshEvent = setInterval(() => {
        this.percent = '0%'
        let $this = this
        document.getElementsByClassName('plug01P_content')[$this.index].classList.remove('plug01P_contentT')
        setTimeout(() => {
          this.setPlug01PCotent()
        }, 400)
      }, 4000)
    },
  },
  watch: {
    data() {
      this.setPlug01PCotent()
    }
  },
  destroyed() {
    clearInterval(this.refreshEvent)
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .plug01_progressMain{ position: relative;float: left; height: 1.5rem; background:linear-gradient(to right ,green, green);z-index: 1;}
  .plug01P_content{ position: absolute;top: -0.5rem;width: 0; height: 2.5rem;z-index: 3; border-right: 2px solid #333333;}
  .plug01P_content1{position: absolute;height: 1.5rem; background:none;z-index: 2;}
  .plug01P_font{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; text-align: center; margin-left: auto; color: #FFF; cursor: pointer;}
  .plug01P_contentT{
    transition: all 1.5s;
  }
  .current {position: absolute; font-size: 1rem; bottom: -1.3rem; right: -0.5rem;}
  .range {position: absolute; font-size: 1rem; top: -1.3rem; right: 0; color: #409eff; z-index: 4;}
  .range1 {right: -1rem;}
  .range2 {right: 1rem;}
  .P106_min {left: 0; background-color: red; width: 10%;}
  .P106_max {right: 0; background-color: red; width: 10%;}
</style>
