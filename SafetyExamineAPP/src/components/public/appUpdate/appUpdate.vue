<!--
 * Author: wsp
 * CreatDate: 2019-02-18
 *
 -->
<template>
  <div>
    <div class="A106_mask" v-show="showPercent"></div>
    <div class="A106_progress" v-show="showPercent">
      <van-progress :percentage="percent" />
      <div class="A106_progressText">正在更新...</div>
    </div>
  </div>
</template>

<script>
  import { common } from '@/api'
  export default {
    data() {
      return {
        localVersion: '',//本地版本号
        serviceVersion:'',//服务器版本号
        appid: '',//当前应用的APPID
        appUrl:'',//新版本app下载地址
        percent: 0,//下载进度
        showPercent: false//显示下载进度
      }
    },
    components:{},
    computed: {},
    mounted: function () {
      if (window.plus && window.plus.android) {
        this.plusReady()
      } else {
        document.addEventListener('plusready', this.plusReady, false);
      }
    },
    methods: {
      plusReady() {
        //获取本地版本号
        plus.runtime.getProperty(plus.runtime.appid,(inf)=>{
          this.localVersion=inf.version;
          if (this.localVersion) {
            this.getServiceVersion(this.localVersion)
          }
           // console.log("当前应用版本："+inf.version);
        });
      },
      /**
       * 判断系统类型
       * @returns {number} 0为android,1为ios
       */
      check(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.indexOf("android")!=-1){
          // alert("android");//是android系统
          return 0
        }else {
          // alert("ios");//是ios系统
          return 1
        }
      },
      //获取服务器上的版本号
      async getServiceVersion(localVersion) {
        let json ={
          localVersion:localVersion||'',
          isApple: this.check()
        }
        let res = await common.appUpdate(json);
        if (res.result) {
          this.serviceVersion = res.result.version
          const isDev = process.env.NODE_ENV === 'development'
          // 从暴露的全局配置中获取当前环境对应的配置对象
          const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
          this.appUrl = globalConfig.BASE_URL_MAP.DEFAULT+res.result.downLoadURL
          this.isNeedUpdate()
        }
      },
      //判断是否需要更新
      isNeedUpdate() {
        let localVersions = parseFloat(this.localVersion)
        let serviceVersions = parseFloat(this.serviceVersion)
        if (this.serviceVersion!="" && localVersions < serviceVersions) {
          this.$dialog.confirm({
            closeOnClickModal: false,
            message: '应用有新版本，是否立即下载更新?',
            title: '提示',
            confirmButtonText: '更新',
            cancelButtonText: '取消'
          }).then(() => {
            this.updateApp(this.appUrl) //确认的回调
          }).catch(() => {
            plus.runtime.quit()
          });
        }
      },
      //下载更新
      updateApp(url){
        let _this = this
        // console.log(url);
        //创建下载管理对象
        var dtask = plus.downloader.createDownload(url,{filename: "_doc/update/"}, function ( d, status ) {
          // 下载完成
          if ( status == 200 ) { //下载成功后的回调函数
            // layer.alert( "下载成功，准备安装" + d.filename );
            // 安装程序，第一个参数是路径，默认的下载路径在_downloads里面
            _this.showPercent = false
            _this.installWgt(d.filename)
          } else {
            _this.showPercent = false
            this.$dialog.alert("应用升级失败！请稍后重试").then(action => {
              plus.runtime.quit()
            });
          }
        });
        dtask.addEventListener( "statechanged",  function (download, status) {
          switch (download.state) {
            case 2:
              setTimeout(() => {
                _this.showPercent = true
              }, 500);
              break;
            case 3:
              _this.percent = parseInt(download.downloadedSize / download.totalSize * 100)
              break;
            case 4:
              _this.showPercent = false
              break;
          }
        });
        dtask.start(); //开始下载任务
      },
      // 更新应用资源
      installWgt(path){
        plus.nativeUI.showWaiting("更新中...");
        plus.runtime.install(path,{},function(){
          plus.nativeUI.closeWaiting();
          // console.log("安装wgt文件成功！");
          plus.nativeUI.alert("更新完成！",function(){
            plus.runtime.restart();
          });
        },function(e){
          plus.nativeUI.closeWaiting();
          // console.log("安装wgt文件失败["+e.code+"]："+e.message);
          plus.nativeUI.alert("更新失败["+e.code+"]："+e.message);
        });
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .A106_mask {position: fixed; width: 100%; height: 100%; background-color: rgba(0,0,0,.8); left: 0; top: 0; z-index: 9998;}
  .A106_progress {position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 9999; width: 90%; margin: auto; color: #ffffff; height: 30px;}
  .A106_progressText {text-align: center; margin-top: 1em; font-size: val(16);}
</style>
