<!--
  * 设置高德地图，并从地图上获取点位信息组件（点击地图，获取位置，可以传入点位，如无点位，设置和返回当前定位）
  * author： yangxi
  * versions： v1.0
  * props参数：
  * @param points [json] 点位对象{"longitude", "latitude"}

-->
<style lang="scss" type="text/scss" scoped>
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

<template>
  <div class="aMap_all">
    <div v-if="!isOnlyCurrent" class="aMap_point">
        <div class="aMap_point_button" @click="saveMap">保存地图点位</div>
        <div class="aMap_point_button" @click="currentMap">当前点位</div>
        <div class="aMap_point_button" @click="leaveMap()">返回</div>
    </div>
    <!--地图-->
    <div id="container"></div>
    <!--位置图标-->
    <!--<div class="aMap_poiimg"><img src="../../../images/Z108_add.png"/></div>-->
  </div>
</template>

<script>
    export default {
        // 组件名
        name: "aMap",
        // 组件构造
        mixins: [],
        // 组件扩展
        extends: {},
        // 组件属性
        props: ["points","isOnlyCurrent"],
        // 组件数据
        data() {
            return {
              thisMap:'',//创建的map实例
              //获取传送过来的经纬度
              getPoint:{
                lng:'',//经度
                lat:'',//纬度
              },
              gpsOpen: true
            };
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
          if (window.plus) {
            this.plusReady();
            if (this.gpsOpen) {
              this.initMap();
            }
          } else {
            document.addEventListener('plusready', this.plusReady, false);
          }
        },
        destroyed() {
        },
        watch: {},
        methods: {
          plusReady(){
            if (plus.os.name === 'iOS') {
              var CLLocationManager = plus.ios.import("CLLocationManager");
              var authorizationStatus = CLLocationManager.authorizationStatus();
              switch(authorizationStatus) {
                case 0:
                  /// User has not yet made a choice with regards to this application
                  break;
                case 1:
                  // This application is not authorized to use location services.  Due
                  // to active restrictions on location services, the user cannot change
                  // this status, and may not have personally denied authorization
                  break;
                case 2:
                  // User has explicitly denied authorization for this application, or
                  // location services are disabled in Settings.
                  this.gpsOpen = false
                  window.netintech.MessageBox.confirm('', {
                    closeOnClickModal: false,
                    message: '定位权限未开启，无法定位',
                    title: '提示',
                    confirmButtonText: '去开启',
                    cancelButtonText: '取消',
                  }).then(action => {
                    if (action == 'confirm') {     //确认的回调
                      var UIApplication = plus.ios.import("UIApplication");
                      var NSURL = plus.ios.import("NSURL");
                      var setting = NSURL.URLWithString("app-settings:");
                      var application = UIApplication.sharedApplication();
                      application.openURL(setting);
                      plus.ios.deleteObject(setting);
                      plus.ios.deleteObject(application);
                      this.$router.go(-1)
                    }
                  }).catch(err => {
                    if (err == 'cancel') {     //取消的回调
                      this.$router.go(-1)
                    }
                  });
                  break;
                case 3:
                  // User has granted authorization to use their location at any time,
                  // including monitoring for regions, visits, or significant location changes.
                  break;
                case 4:
                  // User has granted authorization to use their location only when your app
                  // is visible to them (it will be made visible to them if you continue to
                  // receive location updates while in the background).  Authorization to use
                  // launch APIs has not been granted.
                  break;
                case 5:
                  // This value is deprecated, but was equivalent to the new -Always value.
                  break;
                defalut:
                    break;
              }
            } else {
              var context = plus.android.importClass("android.content.Context");
              var locationManager=plus.android.importClass("android.location.LocationManager");
              var main=plus.android.runtimeMainActivity();
              var mainSvr=main.getSystemService(context.LOCATION_SERVICE);
              // console.log(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER));
              if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
                this.gpsOpen = false
                window.netintech.MessageBox.confirm('', {
                  closeOnClickModal: false,
                  message: '定位权限未开启，无法定位',
                  title: '提示',
                  confirmButtonText: '去开启',
                  cancelButtonText: '取消',
                }).then(action => {
                  if (action == 'confirm') {     //确认的回调
                    var main = plus.android.runtimeMainActivity(); //获取activity
                    var Intent = plus.android.importClass('android.content.Intent');
                    var Settings = plus.android.importClass('android.provider.Settings');
                    var intent = new Intent(Settings.ACTION_SETTINGS);//可设置表中所有Action字段
                    main.startActivity(intent);
                    this.$router.go(-1)
                  }
                }).catch(err => {
                  if (err == 'cancel') {     //取消的回调
                    this.$router.go(-1)
                  }
                });
              }
            }
          },

          /**
           * 创建高德地图
           */
          initMap(){
            if (!this.isOnlyCurrent) {
              this.getPoint.lng = this.points.lng;
              this.getPoint.lat = this.points.lat;
            }
            let map = new AMap.Map('container', {
              resizeEnable: true, //是否监控地图容器尺寸变化
              zoom:16, //初始化地图层级
              dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
              keyboardEnable: false, //地图是否可通过键盘控制，默认为true
              doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
            });
            this.thisMap = map;
            if(this.getPoint.lng === "" || this.getPoint.lng === 0){
              this.getLocal(map);
            } else {
              let position = [this.getPoint.lng,this.getPoint.lat];
              alert(position);
              map.setCenter(position);
              // 坐标转换
              //let type = baidu;
              //   AMap.convertFrom(position, type, function (status, result) {
              //     if (result.info === 'ok') {
              //       let resLnglat = result.locations[0];
              //       console.log(result);
              //       console.log(resLnglat);
              //       map.setCenter(resLnglat);
              //     }else {
              //       layer.msg("坐标转换失败")
              //     }
              //   });
            }
            this.mapMove(map);
          },
          /**
           * 浏览器定位方法
           */
          getLocal(map){
            let _this = this
            AMap.plugin('AMap.Geolocation', function() {
              let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RT',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(5, 5),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
                showZoomBar: false,//缩放按钮
              });
              map.addControl(geolocation);
              AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
              AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
              geolocation.getCurrentPosition((status,result)=>{});
            });
            // 高德地图查询周边
            function aMapSearchNearBy(data) {
              AMap.service(["AMap.PlaceSearch"], function() {
                var placeSearch = new AMap.PlaceSearch({
                  pageSize: 10,    // 每页10条
                  pageIndex: 1,    // 获取第一页
                  citylimit: true,  //是否强制限制在设置的城市内搜索
                  autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                });

                // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
                // 第二个参数是经纬度，数组类型
                // 第三个参数是半径，周边的范围
                // 第四个参数为回调函数
                placeSearch.searchNearBy('', [data.position.lng, data.position.lat], 200, function(status, result) {
                  if(result) {
                    // 生成地址列表
                    let s = {
                      data: data,
                      nearBy: result
                    }
                    _this.$emit('updata',s)
                  } else {
                    console.log('获取位置信息失败!');
                  }
                });
              });
            }
            //解析定位结果
            function onComplete(data) {
              //console.log(data);
              aMapSearchNearBy(data)
              //alert(data.formattedAddress);
              //console.log('定位结果：' + data.position);
              //alert('定位结果：' + data.position);
              //console.log('定位类别：' + data.location_type);
              if(data.accuracy){
                //console.log('精度：' + data.accuracy + '米');
              }//如为IP精确定位结果则没有精度信息
              //console.log('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            }
            //解析定位错误信息
            function onError(data) {
              let _this = this
              //console.log('失败原因排查信息:'+data.message);
              console.log(data)
              switch(data.info) {
                case 'PERMISSION_DENIED':
                  layer.alert('浏览器阻止了定位操作');
                  break;
                case 'POSITION_UNAVAILBLE':
                  layer.alert('无法获得当前位置');
                  break;
                case 'TIMEOUT':
                  layer.alert('定位超时');
                  break;
                default:
                  //layer.alert('未知错误,请注意周围遮挡情况和所处位置，重新尝试');
                  if (plus) {
                    plus.geolocation.getCurrentPosition((p)=>{
                      let position = [p.coords.longitude,p.coords.latitude]
                      //console.log(position)
                      let geocoder,marker;
                      function regeoCode() {
                        if(!geocoder){
                          geocoder = new AMap.Geocoder({});
                        }
                        var lnglat  = position
                        _this.thisMap.setCenter(position);
                        if(!marker){
                          marker = new AMap.Marker({
                            icon: "./static/images/Y106_circle1.png",
                            position: position,
                            offset: new AMap.Pixel(-8, -8)
                          });
                          _this.thisMap.add(marker);
                        }
                        marker.setPosition(lnglat);
                        geocoder.getAddress(lnglat, function(status, result) {
                          if (status === 'complete'&&result.regeocode) {
                            var address = result.regeocode.formattedAddress;
                            let data= {
                              formattedAddress:result.regeocode.formattedAddress,
                              position: {
                                lng:position[0],
                                lat:position[1]
                              }
                            }
                            _this.$emit('updata',data)
                          }else{layer.alert(JSON.stringify(result))}
                        });
                      }
                      regeoCode()
                    },(error)=>{
                      window.netintech.MessageBox.confirm('', {
                        closeOnClickModal: false,
                        message: '定位失败，请检查应用的定位权限是否已开启；如已开启，请稍后重试',
                        title: '提示',
                        confirmButtonText: '去开启',
                        cancelButtonText: '取消',
                      }).then(action => {
                        if (action == 'confirm') {     //确认的回调
                          var main = plus.android.runtimeMainActivity(); //获取activity
                          var Intent = plus.android.importClass('android.content.Intent');
                          var Settings = plus.android.importClass('android.provider.Settings');
                          var intent = new Intent(Settings.ACTION_SETTINGS);//可设置表中所有Action字段
                          main.startActivity(intent);
                          _this.$router.go(-1)
                        }
                      }).catch(err => {
                        if (err == 'cancel') {     //取消的回调
                          _this.$router.go(-1)
                        }
                      });
                    })
                  }
                  break;
              }
            }
          },

          /**
           * 移动地图获取当前坐标
           */
          mapMove (map){
            let clickEventListener = map.on('dragend', function(e) {
              let center = map.getCenter(); //获取当前地图中心点
                console.log(center);
                this.poiDetail = center;
                console.log(this.poiDetail)
            });
          },

          /**
           * 保存地图点位
           * */
          saveMap(){
            let center = this.thisMap.getCenter(); //获取当前地图中心点
            console.log("经度：" + center.lng + "；维度：" + center.lat);
            this.$emit("savePoi", center);
            this.closeMap();
            layer.msg("点位保存成功");
          },
          /**
           * 清理地图缓存
           * @param map [object] 地图对象
           */
          closeMap(map) {
            this.$store.commit("cleanMap");
          },
          /**
           * 当前点位
           */
          currentMap(){
            this.getLocal(this.thisMap)
            let currentCenter = this.thisMap.getCenter();
            alert(currentCenter)
          },
          /**
           *离开地图
           * */
          leaveMap(){
            this.$emit("cleanMap");
            window.goBack();
          },
        },
    };
</script>
