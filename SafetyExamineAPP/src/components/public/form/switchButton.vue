
<template>
  <div class="H206_item">
    <div class="H206_itemName" :class="switchData.isMust?'I106_must':''" v-html="switchData.name"></div>
    <div class="H206_itemInput">
      <input type="checkbox" class="uiswitch" :disabled="disabled"  v-model="switchData.inputValue">
    </div>
  </div>
</template>

<script>
  export default {
    // 组件名
    name: 'switchButton',
    // 组件构造
    mixins: [],
    // 组件扩展
    extends: {},
    // 组件属性
    props: {
      value:'',
      disabled:{
        type:Boolean,
        required: false,
        default: false
      }
    },
    // 组件数据
    data () {
      return {
        switchData:{
          name: "",
          keyName: "",   //向后台所提交的字段名称
          isMust: false,
          inputValue: true,
        },
      };
    },
    // 组件过滤器
    filters: {},
    // 组件计算属性
    computed: {},
    // 组件挂载
    components: {},
    // 钩子函数
    beforeCreate () {
    },
    mounted () {
      if (this.value) {
        this.switchData = this.value;
      }
    },
    destroyed () {
    },
    watch: {
      value: {
        handler(newName, oldName) {
          this.switchData = this.value;
        },
        immediate: true,
        deep: true
      },
      switchData: {
        handler(newName, oldName) {
          this.$emit('input',this.switchData);
        },
        immediate: true,
        deep: true
      }
    },
    methods: {},
  };
</script>
<style lang="scss" type="text/scss" scoped>
  @import '@/assets/scss/netintech.scss';
  .uiswitch {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: val(31);
    width: val(51);
    position: relative;
    border-radius: val(16);
    cursor: pointer;
    outline: 0;
    z-index: 0;
    margin: 0;
    padding: 0;
    border: none;
    background-color: #e5e5e5;
    -webkit-transition-duration: 600ms;
    -moz-transition-duration: 600ms;
    transition-duration: 600ms;
    -webkit-transition-timing-function: ease-in-out;
    -moz-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
  }
  .uiswitch::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: val(27);
    width: val(47);
    content: ' ';
    position: absolute;
    left: val(2);
    top: val(2);
    background-color: #ffffff;
    border-radius: val(16);
    z-index: 1;
    -webkit-transition-duration: 300ms;
    -moz-transition-duration: 300ms;
    transition-duration: 300ms;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  .uiswitch::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: val(27);
    width: val(27);
    content: ' ';
    position: absolute;
    border-radius: val(27);
    background: #ffffff;
    z-index: 2;
    top: val(2);
    left: val(2);
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px val(4) val(11) 0px rgba(0, 0, 0, 0.08), -1px val(3) val(3) 0px rgba(0, 0, 0, 0.14);
    -webkit-transition: -webkit-transform 300ms, width 280ms;
    -moz-transition: -moz-transform 300ms, width 280ms;
    transition: transform 300ms, width 280ms;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition-timing-function: cubic-bezier(0.42, 0.8, 0.58, 1.2);
    -moz-transition-timing-function: cubic-bezier(0.42, 0.8, 0.58, 1.2);
    transition-timing-function: cubic-bezier(0.42, 0.8, 0.58, 1.2);
  }
  .uiswitch:checked {
    background-color: #4CD964;
    background-image: -webkit-linear-gradient(-90deg, #4CD964 0%, #4dd865 100%);
    background-image: linear-gradient(-180deg,#4CD964 0%, #4dd865 100%);
  }
  .uiswitch:checked::after {
    -webkit-transform: translate3d(val(16), 0, 0);
    -moz-transform: translate3d(val(16), 0, 0);
    -ms-transform: translate3d(val(16), 0, 0);
    -o-transform: translate3d(val(16), 0, 0);
    transform: translate3d(val(16), 0, 0);
    right: val(18);
    left: inherit;
  }
  .uiswitch:active::after {
    width: val(35);
  }
  .uiswitch:checked::before, .uiswitch:active::before {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }
  .uiswitch:disabled {
    opacity: 0.5;
    cursor: default;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
  }
  .uiswitch:disabled:active::before, .uiswitch:disabled:active::after, .uiswitch:disabled:checked:active::before, .uiswitch:disabled:checked::before {
    width: val(27);
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
  }
  .uiswitch:disabled:active::before {
    height: val(27);
    width: val(41);
    -webkit-transform: translate3d(val(6), 0, 0);
    -moz-transform: translate3d(val(6), 0, 0);
    -ms-transform: translate3d(val(6), 0, 0);
    -o-transform: translate3d(val(6), 0, 0);
    transform: translate3d(val(6), 0, 0);
  }
  .uiswitch:disabled:checked:active::before {
    height: val(27);
    width: val(27);
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }
  .I105_rquired1 {position: absolute;top: 0.4rem;left: -1rem;color: #fd0000;font-size: 1.8rem;}
  .H206_item {display: flex; justify-content: space-between; padding: val(8) val(10); border-bottom: 1px solid #ededee; background-color: #ffffff; border-top: 1px solid #eeeeee; border-bottom: 1px solid #eeeeee;}
  .H206_itemName {font-size: val(16); color: #000000; width: 30%; line-height: val(27);}
  .H206_itemInput {font-size: val(14); width: 70%; text-align: right;line-height: 1.5rem; display: flex; flex-flow: row-reverse;}
  .H206_itemInput>input {}
  .H206_itemInput>span {color: #a4a6a8; font-size: val(14);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .H206_itemInput>img {height: val(16); margin-left: val(10);}
  .I106_must:after {content: '*'; color: red;}
</style>
