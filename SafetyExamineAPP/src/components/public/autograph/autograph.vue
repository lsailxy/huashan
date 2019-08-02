<!--
 * Author: wsp
 * CreatDate: 2019-07-08
 *
 -->
<template>
  <van-popup
    v-model="data.isPickerShow"
    position="right"
    :style="{width: '100%', height: '100%'}"
  >
    <div class="I106_page">
      <div class="I106_header">
        <div class="H106_return" @click="pickerCancel">
          <img src="@/assets/images/arrowLeft.png" alt="">
        </div>
        <div class="I106_title">请在签名区域签名</div>
        <div class="H106_add" @click="pickerComfirm">确定</div>
      </div>
      <div class="H106_content">
        <div class="A106_autographOuter">
          <vueSignature ref="signature" :sigOption="option" :disabled="disabled"></vueSignature>
        </div>
        <div class="A106_btnOuter">
          <div class="A106_btn" @click="clear">重签</div>
          <div class="A106_btn" @click="undo">上一笔画</div>
          <!--<button @click="addWaterMark">addWaterMark</button>-->
          <!--<button @click="handleDisabled">disabled</button>-->
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
    // 组件名
    name: "autograph",
    // 组件构造
    mixins: [],
    // 组件扩展
    extends: {},
    // 组件属性
    props: {
      data:{
        type: Object,
        required: false,
        default() {
          return {}
        }
      }
    },
    // 组件数据
    data() {
        return {
          option:{
            penColor:"rgb(0, 0, 0)",
            backgroundColor:"rgb(255,255,255)"
          },
          disabled:false
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
    },
    destroyed() {
    },
    watch: {},
    methods: {
      pickerCancel() {
        this.data.isPickerShow = false
      },
      pickerComfirm(){
        var _this = this;
        var png = _this.$refs.signature.save()
        var jpeg = _this.$refs.signature.save('image/jpeg')
        var svg = _this.$refs.signature.save('image/svg+xml');
        // console.log(png);
        // console.log(jpeg)
        // console.log(svg)
        if(!_this.$refs.signature.isEmpty()) {
          let json = {
            keyName: this.data.keyName,
            imgData: png
          }
          this.$emit('update', json)
        } else {
          this.$toast('请先完成签名')
        }
      },
      clear(){
        var _this = this;
        _this.$refs.signature.clear();
      },
      undo(){
        var _this = this;
        _this.$refs.signature.undo();
      },
      addWaterMark(){
        var _this = this;
        _this.$refs.signature.addWaterMark({
          text:"mark text",          // watermark text, > default ''
          font:"20px Arial",         // mark font, > default '20px sans-serif'
          style:'all',               // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
          fillStyle:"red",           // fillcolor, > default '#333'
          strokeStyle:"blue",	   // strokecolor, > default '#333'
          x:100,                     // fill positionX, > default 20
          y:200,                     // fill positionY, > default 20
          sx:100,                    // stroke positionX, > default 40
          sy:200                     // stroke positionY, > default 40
        });
      },
      fromDataURL(url){
        var _this = this;
        _this.$refs.signature.fromDataURL(url);
      },
      handleDisabled(){
        var _this = this;
        _this.disabled  = !_this.disabled
      }
    },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    .A106_autographOuter {width: 100%; height: val(300); border: val(5) dashed #eeeeee;}
    .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
    .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
    .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
    .H106_return>img {height: val(18);}
    .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
    .H106_add>img {height: val(18); margin-left: val(12);}
    .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #f5f5fa;}
    .A106_btnOuter {text-align: center;}
    .A106_btn {display: inline-block; padding: val(6) val(12); font-size: val(16); color: #4c60c4; border: 1px solid #4c60c4; margin: val(12);}
</style>
