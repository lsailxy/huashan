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
      <div class="I106_title">签到</div>
      <div class="H106_add" @click="submitSign">提交</div>
    </div>
    <div class="H106_content">
      <div class="H206_itemOuter">
        <div class="H206_item">
          <div class="H206_itemName">签到人员</div>
          <div class="H206_itemInput">{{formData.signusername}}</div>
        </div>
        <div class="H206_item">
          <div class="H206_itemName">签到时间</div>
          <div class="H206_itemInput">{{formData.time}}</div>
        </div>
        <peer :data="pickData.peer" @update="updatePeer($event)"></peer>
        <accompanying :data="pickData.accompanying" @update="updateAccompanying"></accompanying>
        <onePicker :data="pickData.location" @change="updateOnePicker"></onePicker>
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="S106_mapOuter">
              <aMap @updata="getAddress" isOnlyCurrent="true"></aMap>
            </div>
          </div>
        </div>
        <div class="H206_item2Outer">
          <div class="H206_item2">
            <div class="H206_item2Name">现场照片</div>
            <showImg :imgData="dataForm.addImg" keyName="addImg" @delImg="delImg" :isDel="true"></showImg>
            <div class="S106_photo">
              <upLoadImg keyName="addImg" :uploadIcon="uploadIcon" :number="formData.photosId.length" isOnlyCamera="isOnlyCamera" @setPushImg="setPushImg"></upLoadImg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import onePicker from '@/components/public/form/onePicker'
import aMap from '@/components/public/map/aMap.vue'
import moment from 'moment'
import showImg from '@/components/public/upImg/showImg'
import upLoadImg from '@/components/public/upImg/upLoadImg'
import peer from './body/peer'
import accompanying from './body/accompanying'
import { inspect, common } from '@/api'
import { toastText } from '@/utils'
export default {
  // 组件名
  name: 'sign',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      formData: {
        signusername: JSON.parse(localStorage.getItem('userInfo')).USERNAME,
        signuser: JSON.parse(localStorage.getItem('userInfo')).ID,
        time: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        location: '',
        longitude: '',
        latitude: '',
        photosId: [],
        peer: '',
        peerId: '',
        accompanyingperson: ''
      },
      dataForm: {
        keyName: [], //
        isServer: '',
        addImg: [],
        id: '',
      },
      isOnlyCamera: true,
      uploadIcon: require('@/assets/images/S106_icon1.png'),
      pickData: {
        peer: {
          name: '同行人员',
          keyName: 'peer',
          placeholder: '请选择',
          values: []
        },
        accompanying: {
          name: '随行人员',
          keyName: 'accompanying',
          placeholder: '请添加',
          values: []
        },
        location: {
          name: '签到地址',
          keyName: 'location',
          type: 'onePicker',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '暂无地址可选择，请先完成定位',
          choseItem: {},
          defaultIndex: 0,
          inputValue: '',
          inputLabel: '',
          values: []
        },
      }
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    taskdetailid() {
      return this.$route.params.taskdetailid
    }
  },
  // 组件挂载
  components: {
    onePicker,
    aMap,
    showImg,
    upLoadImg,
    peer,
    accompanying
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
      const res = await inspect.toSign()
      if(res && res.status === 10001) {
        if(res.result.user) {
          res.result.user.forEach((item) => {
            this.pickData.peer.values.push({
              id: item.id,
              name: item.username
            })
          })
        }
      }
    },
    pageBack() {
      this.$router.go(-1)
    },
    /**
     * 地图地址更新
     * @param msg [Object] 地址各项参数集合
     */
    getAddress(msg) {
      /** 高德地图**/
      this.formData.location = msg.data.formattedAddress
      this.formData.longitude = msg.data.position.lng
      this.formData.latitude = msg.data.position.lat
      this.pickData.location.values = [{
        id: '0',
        name: msg.data.formattedAddress
      }]
      if(msg.nearBy.poiList && msg.nearBy.poiList.pois) {
        for(let i = 0; i < msg.nearBy.poiList.pois.length; i++) {
          this.pickData.location.values.push({
            id: msg.nearBy.poiList.pois[i].id,
            name: msg.nearBy.poiList.pois[i].name
          })
        }
      }
      this.pickData.location.inputLabel = msg.data.formattedAddress
      this.pickData.location.inputValue = '0'
      // if(!window.netintech.Storage.get('popup')) {
      //   this.$refs.locationPick.showPick()
      // }
      /** 高德地图**/
    },
    updateOnePicker(msg) {
      this.pickData[msg.keyName].inputValue = msg.choseItem.id
      this.pickData[msg.keyName].inputLabel = msg.choseItem.name
    },
    updatePeer(msg) {
      let ids = []
      msg.pickerValue.forEach((item) => {
        ids.push(item.id)
      })
      this.formData[msg.pickerName + 'Id'] = ids.join(',')
    },
    updateAccompanying(msg) {
      this.formData.accompanyingperson = msg
    },
    /**
     * 添加图片（将图片传入对应变量中）
     * @param dataKeyName [string] data中的图片数组变量名称（向组件传递后获取）
     * @param imgData [string] 图片文件，b64格式文件
     */
    async setPushImg(dataKeyName, imgData, id) {
      let json = {
        id: this.id,
        files: {
          filebytestr: imgData,
          fileName: '',
        }
      }
      let res = await inspect.signUploadFile(json)
      if(res && res.status === 10001) {
        this.$toast(toastText.success.submitSuccess)
        this.formData.photosId.push(res.result.id)
        let json1 = {}
        json1.filePath = imgData // 图片
        json1.id = res.result.id // 图片id
        this.dataForm[dataKeyName].push(json1)
      }
    },
    /**
     * 删除图片
     * @param dataKeyName [string] data中的图片数组变量名称（向组件传递后获取）
     * @param index [Number] 图片下标
     * @param isServer [Boolean] 是否为服务器请求
     * @return {Promise<void>}
     */
    async delImg(dataKeyName, index, isServer) {
      let $this = this
      let json = {
        id: $this.dataForm[dataKeyName][index].id
      }
      let delRes = await common.deleteFile(json)
      if(delRes && delRes.status === 10001) {
        this.$toast(toastText.success.delSuccess)
        $this.dataForm[dataKeyName].splice(index, 1)
        this.formData.photosId.splice(index, 1)
      }
    },
    async submitSign() {
      let isCommit = true
      if(!this.pickData.location.inputLabel) {
        this.$toast(toastText.fail.locationUncomplete)
        isCommit = false
        return false
      }
      if(isCommit) {
        let json = {
          photoId: this.formData.photosId.join(','),
          taskdetailid: this.taskdetailid,
          signusername: this.formData.signusername,
          signuser: this.formData.signuser,
          signtime: this.formData.time,
          signaddress: this.pickData.location.inputLabel,
          signlat: this.formData.latitude,
          signlon: this.formData.longitude,
          otherpeople: this.formData.peerId,
          accompanyingperson: this.formData.accompanyingperson
        }
        const res = await inspect.sign(json)
        if(res && res.status === 10001) {
          this.$toast(toastText.success.submitSuccess)
          this.$router.go(-1)
        }
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
    .H106_content {overflow: auto; height: 100%; padding-top: val(42); background-color: #ffffff;}
    /*签到*/
    .S106_mapOuter {padding: val(12) 0;}
    .S106_mapOuter>img {width: 100%;}
    .S106_photo {display: flex; flex-flow: row wrap; padding-bottom: 2rem;}
    .S106_photo>img {width: 7.75rem; height: 7.75rem;margin-right: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;}
    .H206_item {display: flex; justify-content: space-between; padding: val(18) val(12); border-bottom: 1px solid #ededee;}
    .H206_itemName {font-size: val(16); color: #000000; width: 30%;}
    .H206_itemInput {font-size: val(16); width: 70%; text-align: right;line-height: 1.5rem;}
    .H206_itemInput>input {color: #a4a6a8; font-size: val(16); width: 100%; line-height: val(16);text-align: right; border: none;}
    .H206_itemInput>span {color: #a4a6a8; font-size: val(16);line-height: val(18); display: inline-block;max-width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .H206_itemInput>img {height: val(16); margin-left: val(10);}
    .H206_itemInput>img {height: val(16); margin-left: val(10);}
    .H206_item2Outer {background-color: #f5f5fa; padding-bottom: val(12);}
    .H206_item2 {padding: 0 val(12); background-color: #ffffff;}
    .H206_item2Name {font-size: val(16); padding: val(12) 0;}
</style>
