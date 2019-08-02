<!--
 * @Author: Cphayim
 * @Date: 2019-05-23 09:14:55
 * @LastEditTime: 2019-06-03 13:25:55
 * @Description: 入口组件
 * 本组件只作为容器，不应当包含任何逻辑
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      transitionName: '', // 路由过渡动画名
      backButtonPress: 0, // 返回键按下次数
    }
  },
  mounted() {
    if(window.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
  },
  watch: { // 使用watch 监听$router的变化
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,小于为后退状态，同级则无动画
      if(to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-left'
      } else if(to.meta.index === from.meta.index) {
        this.transitionName = ''
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
  methods: {
    plusReady() {
      let _this = this
      plus.screen.lockOrientation('portrait-primary')
      // Android返回键监听事件
      plus.key.addEventListener('backbutton', function() {
        if(_this.$route.meta.index > 0) {
          if(_this.$route.meta.toIndex) {
            _this.$router.push({
              name: 'home'
            })
          } else {
            _this.$router.go(-1)
          }
        } else {
          _this.backButtonPress++
          if(_this.backButtonPress > 1) {
            plus.runtime.quit()
          } else {
            plus.nativeUI.toast('再按一次退出应用')
          }
          setTimeout(function() {
            _this.backButtonPress = 0
          }, 1000)
        }
      }, false)
    }
  },
}
</script>

<style lang="scss">
  #app {
    height: 100%;
    width: 100%;
  }
  .router-view {width: 100%; height: 100%;position: absolute!important;top: 0;bottom: 0;margin: 0 auto;overflow-x: hidden; z-index: 0;}
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    height: 100%;
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .slide-right-enter,.slide-right-enter-active{
    animation: bounce-left-in 500ms;
  }
  .slide-right-leave-active {
    animation: bounce-left-out 500ms;
  }
  .slide-left-enter, .slide-left-enter-active{
    animation: bounce-right-in 500ms;
  }
  .slide-left-leave-active {
    animation: bounce-right-out 500ms;
  }

  @keyframes bounce-right-in {
    0%{
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0px, 0, 0);
    }
  }
  @keyframes bounce-right-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes bounce-left-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0px, 0, 0);
    }
  }
  @keyframes bounce-left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
