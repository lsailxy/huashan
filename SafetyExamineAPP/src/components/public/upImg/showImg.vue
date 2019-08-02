<!--
  * 图片显示以及删除组件
  * author： Aozhi
  * versions： v1.0
  * props参数：
  * @param keyName [string] 接受向外传递的数组变量名（用于在单页面中，重复使用此组件设置。） 此组件会将图片删除的角标值传递出去时，告知父组件需要更爱【keyName】变量中的值
  * @param imgData [array] 图片地址数组，用于【DIV】.S02_will_upload_img 的循环， 默认数组项为string类型的图片地址。如果是对象类型（含图片地址）数据，需要更改item1的显示形态。例如： item1.imgurl
  * @param isDel [boolean] 是否显示删除功能，如果是true，则显示删除按钮，false则不显示。显示删除按钮，需要传递delImg方法，向父组件传值，不显示删除时，无需传值
  * $emit方法：
  *     /**
         * 删除图片
         * @param dataKeyName [string] data中的图片数组变量名称（向组件传递后获取）
         * @param index [int] 删除的图片在数组中对应的角标
         * @param isServer [boolean] 是否是服务器的图片 true:  yes , false: no
         */
        delImg(dataKeyName, login, isServer){
          let $this = this;
          if(isServer){
            //ajax删除图片
          }else{
            $this[dataKeyName].splice(login,1);
          }
   *    }
-->

<template>
  <div class="S02_uploadImg">
    <!--图片显示-->
    <div
      style="display: inline-block;"
      v-for="(item1,index1) in imgData"
      ref="delPhotoOne"
      class="S02_will_upload_img">
      <img
        :src="item1.filePath" alt=""
        @click="previewImage(imgData,index1)"
        class="U12_will_upload_img_img">
      <!--图片删除-->
      <i v-if="isDel"
        class="U12_will_upload_img_del"
        @click="delFile(item1.filePath,index1)"></i>
    </div>
    <!--图片预览-->
    <van-image-preview
      v-model="show"
      :startPosition="index"
      :images="imgPreviewData.urls"
      @change="onChange"
    >
    </van-image-preview>
    <!--<div-->
      <!--class="S02_preview_img"-->
      <!--v-if="previewImgUrl"-->
      <!--@click="closePreviewImage">-->
      <!--<img :src="previewImgUrl" alt="">-->
    <!--</div>-->
  </div>
</template>

<script>
    export default {
      name: "showImg",
      data(){
        return {
          show: false,
          index: 0,
          imgPreviewData: {
            urls:[],
            current:''
          }
        }
      },
      props: ["keyName","imgData","isDel"],
      methods: {
        onChange(index) {
          this.index = index;
        },
        /**
         * 预览图片
         * @param group 当前点击图片所在数组
         * @param index 当前点击图片下标
         */
        previewImage(group,index) {
          this.imgPreviewData.urls = []
          group.forEach((item)=>{
            this.imgPreviewData.urls.push(item.filePath)
          })
          this.index = index
          this.show = true
        },
        /**
         *
         * @param file
         * @param index
         */
        delFile(file,index){
          let $this = this;
          this.$dialog.confirm({
            title: '提示',
            message: '确定删除?'
          }).then(() => {
            let head = file.substring(0,4).toLowerCase();
            let isServer = false;
            if(head === "http"){
              isServer = true;
            }
            $this.$emit("delImg", this.keyName, index, isServer);
          }).catch(() => {
          });
        }
      }
    }
</script>

<style lang="scss" type="text/scss">
  .S02_uploadImg {
    padding: 12*320rem/(640*12) 12*320rem/(640*12) 0;
    overflow: hidden;
    .S02_will_upload_img {
      float: left;
      display: inline-block;
      flex-basis: 160*320rem/(640*12);
      height: 100*320rem/(640*12);
      width: 18%;
      margin: 0 1% 12*320rem/(640*12);
      /*background-color: rgba(0, 0, 0, .1);*/
      position: relative;
      text-align: center;
      /*&:nth-child(4n) {*/
        /*margin-right: 0;*/
      /*}*/
      .U12_will_upload_img_img {
        max-width: 100%;
        max-height: 100%;
      }
      .U12_will_upload_img_del {
        display: inline-block;
        width: 28*320rem/(640*12);
        height: 28*320rem/(640*12);
        position: absolute;
        top: 0;
        right: 0;
        background: url('~@/assets/images/Z108_icon_close.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
    .S02_will_upload_img_slogan1 {
      height: 19*320rem/(640*12);
      font-size: 24*320rem/(640*12);
      color: #c7c7c7;
      margin: 19*320rem/(640*12) 0;
    }
  }

  .S02_file_input {
    [type=file] {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      display: inline-block;
      opacity: 0;
    }
  }

  .S02_preview_img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    /*background-color: rgba(0, 0, 0, .9);*/
    z-index: 1000;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .S02_imageAddWatermarkUrl {
    position: fixed;
    z-index: -1;
    /*width: 100%;*/
    /*height: 100%;*/
    /*top: 0;*/
  }

  .S02_imageAddWatermarkUrl_marker {
    position: absolute;
    width: 100%;
    white-space: normal;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(0, 0, 255, .3);
    text-align: center;
    .S02_imageAddWatermarkUrl_time {
      font-size: 50*320rem/(640*12);
      font-weight: 500;
    }
    .S02_imageAddWatermarkUrl_day01 {
      font-size: 30*320rem/(640*12);
    }
    .S02_imageAddWatermarkUrl_day02 {
      font-size: 30*320rem/(640*12);
      white-space: normal;
      display: block;
    }
  }

  .S02_imageAddWatermarkUrl02 {
    width: 100%;
  }

  /*#plusMap {*/
  /*width:1px;*/
  /*height: 1px;*/
  /*background:#000;*/
  /*!*display: none;*!*/
  /*}*/

  /*#allmap {*/
  /*width: 200px;*/
  /*height: 200px;*/
  /*display: none;*/
  /*}*/

</style>
