<!--
 * Author: wsp
 * CreatDate: 2019-06-29
 *
 -->
<template>
  <div class="I106_page">
    <div class="I106_header">
      <div class="H106_return" @click="pageBack()">
        <img src="@/assets/images/arrowLeft.png" alt="">
      </div>
      <div class="I106_title">隐患排查</div>
      <div class="H106_add" v-show="isCheck==0" @click="saveData()">保存</div>
    </div>
    <div class="H106_content">
      <div class="I206_listOuter">
        <!--<div class="I206_listTop">-->
          <!--<div class="I206_listTitle">-->
            <!--<img src="@/assets/images/I206_icon1.png" alt="">-->
            <!--<span>其他不合格项</span>-->
          <!--</div>-->
          <!--<div class="I206_listTopBtn">添加</div>-->
        <!--</div>-->
        <ul class="I206_list">
          <li v-for="(item, index) in res.hdList" :key="'hdList_'+index">
            <div class="I206_itemName">{{item.name}}</div>
            <div v-if="isCheck==1" class="I206_itemRemark">
              <b>隐患场所</b>
              <span>{{item.place}}</span>
            </div>
            <div v-else class="I206_itemRemark">
              <b>隐患场所</b>
              <div class="I206_textarea">
                <textarea v-model="item.place" name="" id="" rows="3"></textarea>
              </div>
            </div>
            <div class="I206_itemName">
              <b>隐患类型：</b>
              <span>{{item.typename}}-{{item.smalltypename}}</span>
            </div>
            <div v-if="isCheck==1" class="I206_itemName">
              <b>隐患等级：</b>
              <span>{{item.levelname}}</span>
            </div>
            <onePicker2 v-else :data="item.levels"></onePicker2>
            <div v-if="isCheck==1" class="I206_itemRemark">
              <b>备注</b>
              <span>{{item.inputcontent}}</span>
            </div>
            <div v-else class="I206_itemRemark">
              <b>备注</b>
              <div class="I206_textarea">
                <textarea v-model="item.inputcontent" name="" id="" rows="3"></textarea>
              </div>
            </div>
            <div class="I206_itemImg" v-if="item.selfpatrolurls.length !== 0">
              <showImg :imgData="item.selfpatrolurls" :keyName="'selfpatrolurls_'+index" @delImg="delImg" :isDel="isCheck==0"></showImg>
            </div>
            <div class="I206_answer" v-if="item.answer" :class="item.isright === 1?'I206_correct':'I206_nullCorrect'">{{item.answer}}</div>
            <radioPicker v-if="isCheck==0" :data="item.answers" @change="updateAnswer" :ref="'answers_'+index"></radioPicker>
            <div class="I206_itemBtnOuter" v-if="isCheck==0">
              <!--<div class="I206_itemBtn">-->
                <!--<img src="@/assets/images/I206_icon2.png" alt="">-->
              <!--</div>-->
              <div class="I206_itemBtn" @click="checkAnswer(index)">
                <img src="@/assets/images/I206_icon5.png" alt="">
              </div>
              <div class="I206_itemBtn">
                <upLoadImg :keyName="'selfpatrolurls_'+index" :uploadIcon="uploadIcon" :number="item.selfpatrolurls.length" @setPushImg="setPushImg"></upLoadImg>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { inspect, common, accompanying } from '@/api'
import showImg from '@/components/public/upImg/showImg'
import upLoadImg from '@/components/public/upImg/upLoadImg'
import onePicker2 from '@/components/public/form/onePicker2'
import radioPicker from './body/radioPicker'
import { toastText } from '@/utils/toastText'
export default {
  // 组件名
  name: 'accompanyingInspectDetails',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      res: {},
      uploadIcon: require('@/assets/images/I206_icon4.png')
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    taskdetailid() {
      return this.$route.params.taskdetailid
    },
    gpid() {
      return this.$route.params.gpid
    },
    taskid() {
      return this.$route.params.taskid
    },
    eid() {
      return this.$route.params.eid
    },
    isCheck() {
      return this.$route.params.isCheck
    },
    submittype() {
      return this.$route.params.submittype
    }
  },
  // 组件挂载
  components: {
    showImg,
    upLoadImg,
    radioPicker,
    onePicker2
  },
  // 钩子函数
  beforeCreate() {
  },
  mounted() {
    this.initData()
  },
  destroyed() {
  },
  watch: {},
  methods: {
    async initData() {
      let json = {
        sid: this.taskdetailid,
        gpid: this.gpid,
        taskid: this.taskid
      }
      const res = await accompanying.toAccompanyYhwt(json)
      if(res && res.status === 10001) {
        this.res = res.result
        const isDev = process.env.NODE_ENV === 'development'
        // 从暴露的全局配置中获取当前环境对应的配置对象
        const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
        this.res.hdList.forEach((item, index) => {
          item.answers = {
            name: '选择答案',
            keyName: 'answers_' + index,
            type: 'radioPicker',
            noDataToast: '当前无答案选择，请增加相应答案',
            inputValue: item.checkbuttonvalue,
            values: item.shlist || []
          }
          item.levels = {
            name: '隐患等级',
            keyName: 'levels_' + index,
            type: 'onePicker',
            placeholder: '请选择',
            isMust: false,
            noDataToast: '无隐患等级，请创建相关类型',
            choseItem: {},
            defaultIndex: 0,
            inputValue: item.level,
            inputLabel: item.levelname,
            values: this.res.levellist || []
          }
          this.res.hdList[index].selfpatrolurls.forEach((item2) => {
            item2.filePath = globalConfig.BASE_URL_MAP.DEFAULT + item2.filePath
          })
        })
      }
    },
    pageBack() {
      this.$router.go(-1)
    },
    jumpPage(name, params) {
      if(params) {
        this.$router.push({
          name: name,
          params: params
        })
      } else {
        this.$router.push({
          name: name
        })
      }
    },
    /**
     * 删除图片
     * @param keyName [string]图片相关变量名
     * @param index [int]图片在该组小标
     * @param isServer [boolean]是否为服务器
     */
    async delImg(keyName, index, isServer) {
      if(isServer) {
        let json = {
          id: this.res.hdList[keyName.split('_')[1]][keyName.split('_')[0]][index].id
        }
        let delRes = await common.deleteFile(json)
        if(delRes && delRes.status === 10001) {
          this.$toast(toastText.success.delSuccess)
          this.res.hdList[keyName.split('_')[1]][keyName.split('_')[0]].splice(index, 1)
        }
      } else {
        this.res.hdList[keyName.split('_')[1]][keyName.split('_')[0]].splice(index, 1)
      }
    },
    /**
     * 上传巡查图片
     * @param keyName [string]图片相关变量名
     * @param imgData [string]图片数据
     */
    async setPushImg(keyName, imgData) {
      let json = {
        id: this.res.hdList[keyName.split('_')[1]].id,
        files: {
          filebytestr: imgData,
          fileName: ''
        }
      }
      let res = await inspect.selfPatrolUploadFile(json)
      if(res && res.status === 10001) {
        const isDev = process.env.NODE_ENV === 'development'
        // 从暴露的全局配置中获取当前环境对应的配置对象
        const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
        this.$toast(toastText.success.uploadSuccess)
        this.res.hdList[keyName.split('_')[1]][keyName.split('_')[0]].push({
          filePath: globalConfig.BASE_URL_MAP.DEFAULT + res.result.filePath,
          id: res.result.id
        })
      }
    },
    /**
     * 选择答案
     * @param index 隐患问题下标
     */
    checkAnswer(index) {
      this.$refs['answers_' + index][0].showPicker()
    },
    updateAnswer(msg) {
      this.res.hdList[msg.keyName.split('_')[1]].answers.inputValue = msg.data.id
      this.res.hdList[msg.keyName.split('_')[1]].answer = msg.data.answer
      this.res.hdList[msg.keyName.split('_')[1]].isright = msg.data.isright
      this.$forceUpdate()
    },
    /**
     * 新增时创建格式
     * @param id [int] 新增接口的id
     * @returns {{id: *, name: string, inputcontent: string, checkbuttonvalue: number,selfpatrolurls:Array}}
     */
    createJson(id, name, inputval, checkbutton, selfpatrolurls, type, level, place, typename, levelname, smalltype, smalltypename) {
      let json = {
        id: id || null,
        name: name === undefined ? '' : name,
        inputcontent: inputval === undefined ? '' : inputval,
        checkbuttonvalue: checkbutton || null,
        selfpatrolurls: selfpatrolurls || [],
        type: type || null,
        level: level || null,
        place: place || null,
        typename: typename || null,
        levelname: levelname || null,
        smalltype: smalltype || null,
        smalltypename: smalltypename || null,
      }
      return json
    },
    async saveData() {
      let arr = []
      this.res.hdList.forEach((item) => {
        arr.push(this.createJson(item.id, item.name, item.inputcontent, item.answers.inputValue || null, item.selfpatrolurls))
      })
      let json = {
        sid: this.taskdetailid,
        taskid: this.taskid,
        enterpriseid: this.eid,
        submittype: this.submittype,
        status: 0,
        pilist: arr,
        inspectcheck: '',
        inspectcheckremark: '',
        inspectleader: '',
        inspectleaderremark: '',
        submitdate: null,
        isapproval: 0,
        flowid: ''
      }
      const res = await accompanying.saveAccompanyInfo(json)
      if(res && res.status === 10001) {
        this.$toast(toastText.success.saveSuccess)
        this.$router.go(-1)
      }
    }
  },
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '@/assets/scss/netintech.scss';
    .I106_page {width: 100%; height: 100%; background-color: #f2f2f2; position: relative;}
    .I106_header {padding: val(12) 0; background-color: $primaryColor;position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;}
    .I106_title {color: #ffffff; font-size: val(18); line-height: 1em; text-align: center; max-width: val(180); margin: 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .H106_return {width: val(36); text-align: center; position: absolute; left: 0; top: val(12);}
    .H106_return>img {height: val(18);}
    .H106_add {position: absolute; right: val(12); top: val(12);color: #ffffff; font-size: val(18); line-height: 1em;}
    .H106_add>img {height: val(18); margin-left: val(12);}
    .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #f5f5fa;}
    .I206_listOuter {margin: val(9); box-shadow: 0 0 val(5) rgba(22,151,241,.29);}
    .I206_listTop {display: flex; justify-content: space-between; padding: val(10); border-bottom: 1px solid #e6e6e6; background-color: #ffffff;}
    .I206_listTitle {}
    .I206_listTitle>img {height: val(16); margin-right: val(5);}
    .I206_listTitle>span {font-size: val(16); color: #333333; line-height: 1em;}
    .I206_listTopBtn {color: #008cee; font-size: val(12); border-radius: val(5); width: val(45); text-align: center; height: val(23); line-height: val(23); border: 1px solid #008cee;}
    .I206_list {background-color: #f2f2f2;}
    .I206_list>li {padding-left: val(10); background-color: #ffffff; margin-top: val(10);}
    .I206_itemName {color: #666666; font-size: val(14); line-height: val(24); padding: val(10);}
    .I206_itemRemark {color: #666666; font-size: val(14); line-height: val(24); padding: val(10); border-top: 1px solid #e6e6e6; background-color: #fafafa; margin: val(10) 0;}
    .I206_itemRemark>b {margin-right: val(10);}
    .I206_itemImg {padding: val(10); border-top: 1px dashed #e6e6e6;}
    .I206_itemBtnOuter {display: flex; border-top: 1px dashed #e6e6e6;}
    .I206_itemBtnOuter .I206_itemBtn:first-child {border-left: none;}
    .I206_itemBtn {width: 33.3%; border-left: 1px dashed #e6e6e6; text-align: center; padding: val(10)}
    .I206_itemBtn>img {height: val(21);}
    .I206_textarea {padding: val(6) 0;}
    .I206_textarea>textarea {resize: none; padding: val(6); font-size: val(14); line-height: 1.8em; color: #333333; border: 1px solid #eeeeee; width: 100%;}
    .I206_answer {padding: val(6) val(12); border-top: 1px solid #eeeeee; font-size: val(14); line-height: val(20); display: flex;}
    .I206_answer:before {content: ''; width: val(10); height: val(10); margin-top: val(5); border-radius: 50%; margin-right: val(12);}
    .I206_nullCorrect:before {background-color: red;}
    .I206_correct:before {background-color: #16a35f;}
</style>
