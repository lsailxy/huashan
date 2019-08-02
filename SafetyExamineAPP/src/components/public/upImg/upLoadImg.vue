<!--
  * 获取手机端相册或摄像头的图片
  * author： Aozhi、wsp
  * versions： v1.0
  * depend: H5+ plus API
  * props参数：
  * @param keyName [string] 接受向外传递的数组变量名（用于在单页面中，重复使用此组件设置。） 此组件会将图片删除的角标值传递出去时，告知父组件需要更改【keyName】变量中的值
  * @param isOnlyCamera [boolean] 是否仅能拍摄获取
  * @param number [string] 已有图片张数
  * $emit方法：
  *     /**
         * 添加图片（将图片传入对应变量中）
         * @param dataKeyName [string] data中的图片数组变量名称（向组件传递后获取）
         * @param imgData [string] 图片文件，b64格式文件
         */
        setPushImg(dataKeyName,imgData,imgName){
          this[dataKeyName].push(imgData);
  *     }
-->

<template>
  <img @click="showActionSheet" :src="uploadIcon" alt="">
</template>
<script>
  import EXIF from 'exif-js'
  export default {
    name: "upLoadImg",
    props: ["keyName","isOnlyCamera","number",'uploadIcon'],
    methods: {
      /**
       * 选取图片的来源，拍照和相册
       */
      showActionSheet(conf) {
        if (this.number < 5) {
          var self = this;
          if (this.isOnlyCamera) {
            var actionbuttons = [{
              title: "拍照"
            }];
          } else {
            var actionbuttons = [{
              title: "拍照"
            }, {
              title: "相册选取"
            }];
          }
          var actionstyle = {
            title: "选择照片",
            cancel: "取消",
            buttons: actionbuttons
          };
          plus.nativeUI.actionSheet(actionstyle, function (e) {
            if (e.index == 1) {
              self.getFileByCamera();
            } else if (e.index == 2) {
              self.getFileByPhotos();
            }
          });
        } else {
          plus.nativeUI.toast("最多上传五张图片");
        }

      },
      /**
       * 点的是相机
       */
      getFileByCamera() {
        var self = this;
        var c = plus.camera.getCamera();
        c.captureImage(
          function(e) {
            plus.io.resolveLocalFileSystemURL(e, function(entry) {
              var s = entry.toLocalURL();
              self.compress(s).then((res) => {
                self.$emit("setPushImg", self.keyName, res);
              });
              /*上传图片*/
            }, function(e) {
              self.$dialog.alert('读取拍照文件错误：' + e.message);
            });
          }, function(s) {
            var pp = plus.navigator.checkPermission('CAMERA');
            if (pp === 'denied' || pp === 'undetermined') {
              self.$dialog.confirm({
                closeOnClickOverlay: true,
                title: '提示',
                message: '调用相机失败,请检查是否开启相机访问权限',
                confirmButtonText: '去设置',
                cancelButtonText: '取消',
              }).then(() => {
                if (plus.os.name === 'Android') {
                  var main = plus.android.runtimeMainActivity();
                  var Intent = plus.android.importClass('android.content.Intent');
                  var Build = plus.android.importClass('android.os.Build');
                  var Uri = plus.android.importClass('android.net.Uri');
                  var intent = new Intent();
                  intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                  if (Build.VERSION.SDK_INT >= 9) {//系统8.0以上的
                    intent.setAction('android.settings.APPLICATION_DETAILS_SETTINGS');
                    intent.setData(Uri.fromParts('package', main.getPackageName(), null));
                  } else if (Build.VERSION.SDK_INT <= 8) {//系统8.0以下的
                    intent.setAction(Intent.ACTION_VIEW);
                    intent.setClassName('com.android.settings', 'com.android.setting.InstalledAppDetails');
                    intent.putExtra('com.android.settings.ApplicationPkgName', main.getPackageName());
                  }
                  main.startActivity(intent);
                } else {
                  plus.runtime.openURL('app-settings:CAMERA');
                }
              }).catch(() => {
                if (err == 'cancel') {     //取消的回调
                  return;
                }
              });
            }
          }, {
            filename: '_doc/' + new Date().getTime() + 'head'
          });

      },
      /**
       * 点的是文件
       * 2018年4月24日 15:09:11
       * 先加水印 再上传
       */
      getFileByPhotos() {
        var self = this;
        // 从相册中选择图片
        plus.nativeUI.toast("从相册中选择不超过五张图片");
        plus.gallery.pick(function (e) {
          if (e.files.length > 5) {
            plus.nativeUI.toast('最多选取五张图片');
          }
          for (var i = 0; i < e.files.length; i++) {
            if (self.number*1+i+1 < 6) {
              self.compress(e.files[i]).then((res) => {
                self.$emit("setPushImg", self.keyName, res);
              });
            } else {
              plus.nativeUI.toast("最多上传五张图片");
              break
            }
          }
        }, function (e) {
          plus.nativeUI.toast("取消选择图片");
        }, {
          filter: "none",
          system: true,
          multiple: true,
          maximum: 5-self.number
        });
      },
      /**
       * 图片压缩
       * @param imgSrc [string]图片路径
       * @returns {Promise} base64图片文件
       */
      compress(imgSrc){
        let _this = this
        let img = new Image();
        let Orientation = null;
        img.src = imgSrc;
        return new Promise(function (resolve, reject) {
          img.onload = function () {
            let canvas = document.createElement('canvas'),
              ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            //利用canvas进行绘图
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            //将原来图片的质量压缩到原先的0.1倍。
            var data = canvas.toDataURL('image/jpeg', 0.1); //data url的形式
            EXIF.getData(img, function() {
              Orientation = EXIF.getTag(this, 'Orientation');
              if (Orientation != '' && Orientation != 1) {
                switch (parseInt(Orientation)) {
                  case 6://需要顺时针（向左）90度旋转
                    _this.rotateImg(img, 'left', canvas);
                    break;
                  case 8://需要逆时针（向右）90度旋转
                    _this.rotateImg(img, 'right', canvas);
                    break;
                  case 3://需要180度旋转
                    _this.rotateImg(img, 'right', canvas);//转两次
                    _this.rotateImg(img, 'right', canvas);
                    break;
                }
                data = canvas.toDataURL('image/jpeg', 0.1); //data url的形式
              }
              resolve(data);
            });
          }
        })
      },
      /**
       * 对图片旋转处理
       * @param img 图片元素
       * @param direction 旋转方向，'left'/'right'
       * @param canvas 画布
       */
      rotateImg(img, direction, canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        var min_step = 0;
        var max_step = 3;
        //var img = document.getElementById(pid);
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        var height = img.height;
        var width = img.width;
        //var step = img.getAttribute('step');
        var step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        var degree = step * 90 * Math.PI / 180;
        var ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
    }
  }
</script>

<style lang="scss" type="text/scss">
  .U106_photo {width: 2rem; vertical-align: middle;}
</style>
