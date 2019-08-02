<!--
 * Author: wsp
 * CreatDate: 2019-07-23
 *
 -->
<template>
  <div class="aMap_all">
    <!--地图-->
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'pointMap',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: ['points', 'isOnlyCurrent'],
  // 组件数据
  data() {
    return {
      thisMap: '', // 创建的map实例
      // 获取传送过来的经纬度
      getPoint: {
        lng: '', // 经度
        lat: '', // 纬度
      },
      getPoints: [],
      markers: []
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
    this.initMap()
  },
  destroyed() {
  },
  watch: {
    points: {
      deep: true,
      immediate: true,
      handler() {
        this.getPoints = this.points
        this.addPoints()
      }
    }
  },
  methods: {
    /**
     * 创建高德地图
     */
    initMap() {
      // if(!this.isOnlyCurrent) {
      //   this.getPoint.lng = this.points.lng
      //   this.getPoint.lat = this.points.lat
      // }
      this.getPoints = this.points
      let map = new AMap.Map('container', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 11, // 初始化地图层级
        dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
        keyboardEnable: false, // 地图是否可通过键盘控制，默认为true
        doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
      })
      this.thisMap = map
      if(this.getPoint.lng === '' || this.getPoint.lng === 0) {
        this.getLocal(map)
      } else {
        let position = [this.getPoint.lng, this.getPoint.lat]
        // alert(position)
        map.setCenter(position)
      }
      this.mapMove(map)
      this.addPoints()
    },
    /**
     * 浏览器定位方法
     */
    getLocal(map) {
      let _this = this
      AMap.plugin('AMap.Geolocation', function() {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：5s
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'RT', // 定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(5, 5), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: false, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: false, // 定位成功后用圆圈表示定位精度范围，默认：true
          zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
          showZoomBar: false, // 缩放按钮
        })
        map.addControl(geolocation)
        AMap.event.addListener(geolocation, 'complete', onComplete)// 返回定位信息
        AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息
        geolocation.getCurrentPosition((status, result) => {})
      })
      // 解析定位结果
      function onComplete(data) {
        // console.log(data);
        // alert(data.formattedAddress);
        // console.log('定位结果：' + data.position);
        // alert('定位结果：' + data.position);
        // console.log('定位类别：' + data.location_type);
        if(data.accuracy) {
          // console.log('精度：' + data.accuracy + '米');
        }// 如为IP精确定位结果则没有精度信息
        // console.log('是否经过偏移：' + (data.isConverted ? '是' : '否'));
      }
      // 解析定位错误信息
      function onError(data) {
        let _this = this
        // console.log('失败原因排查信息:'+data.message);
        console.log(data)
        switch (data.info) {
          case 'PERMISSION_DENIED':
            _this.$toast('浏览器阻止了定位操作')
            break
          case 'POSITION_UNAVAILBLE':
            _this.$toast('无法获得当前位置')
            break
          case 'TIMEOUT':
            _this.$toast('定位超时')
            break
          default:
            // _this.$toast('未知错误,请注意周围遮挡情况和所处位置，重新尝试');
            if(plus) {
              plus.geolocation.getCurrentPosition((p) => {
                let position = [p.coords.longitude, p.coords.latitude]
                // console.log(position)
                let geocoder, marker
                function regeoCode() {
                  if(!geocoder) {
                    geocoder = new AMap.Geocoder({})
                  }
                  var lnglat = position
                  _this.thisMap.setCenter(position)
                }
                regeoCode()
              }, () => {
                this.$dialog.confirm({
                  closeOnClickOverlay: false,
                  message: '定位失败，请检查应用的定位权限是否已开启；如已开启，请稍后重试',
                  title: '提示',
                  confirmButtonText: '去开启',
                  cancelButtonText: '取消',
                }).then(() => {
                  var main = plus.android.runtimeMainActivity() // 获取activity
                  var Intent = plus.android.importClass('android.content.Intent')
                  var Settings = plus.android.importClass('android.provider.Settings')
                  var intent = new Intent(Settings.ACTION_SETTINGS)// 可设置表中所有Action字段
                  main.startActivity(intent)
                  _this.$router.go(-1)
                }).catch(() => {
                  _this.$router.go(-1)
                })
              })
            }
            break
        }
      }
    },
    /**
     * 移动地图获取当前坐标
     */
    mapMove(map) {
      let clickEventListener = map.on('dragend', function(e) {
        let center = map.getCenter() // 获取当前地图中心点
        // console.log(center)
        this.poiDetail = center
        // console.log(this.poiDetail)
      })
    },
    /**
     * 添加点位
     */
    addPoints() {
      if(this.thisMap) {
        this.thisMap.remove(this.markers)
      }
      if(this.getPoints.length !== 0) {
        this.markers = []
        for(let i = 0; i < this.getPoints.length; i++) {
          var lnglat = this.getPoints[i]
          // 创建点实例
          var marker = new AMap.Marker({
            position: new AMap.LngLat(lnglat[0], lnglat[1]),
            // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
            // extData: {
            //   id: i + 1
            // }
          })
          this.markers.push(marker)
        }
        // 创建覆盖物群组，并将 marker 传给 OverlayGroup
        var overlayGroups = new AMap.OverlayGroup(this.markers)
        this.thisMap.add(overlayGroups)
        let cluster = new AMap.MarkerClusterer(this.thisMap, this.markers, { gridSize: 80 })
      }
    }
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    .aMap_all {
      width: 100%;
      height: 15rem;
      position: relative;
    }
    .aMap_all .aMap_point {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      z-index: 200;
    }
    .aMap_all .aMap_point .aMap_point_button {
      font-size: 35*320rem/(750*12);
      background: #5daf34;
      text-align: center;
      width: 32%;
      padding: 10px 0;
    }
    #container {
      height: 100%;
      width: 100%;
    }
    .aMap_poiimg {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 200;
    }
</style>
