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
    <div class="E106_search">
      <form action="/">
        <van-search
          v-model="searchValue"
          placeholder="输入您要查询的内容..."
          shape="square"
          left-icon=""
          right-icon="search"
          background="#eeeeee"
          @search="search()"
        >
        </van-search>
      </form>
    </div>
    <div class="H106_content">
      <div class="I206_listOuter">
        <div class="I206_listTop">
          <div class="I206_listTitle">
            <img src="@/assets/images/I206_icon1.png" alt="">
            <span>其他隐患</span>
          </div>
          <div class="I206_listTopBtn" v-if="isCheck==0" @click="newForm">添加</div>
        </div>
        <ul class="I206_list">
          <li v-for="(item, index) in searchResult" :key="'faillist_'+index">
            <div v-if="isCheck==1" class="I206_itemName" v-html="brightenKeyword(item.name, searchValue)"></div>
            <div v-else class="I206_itemRemark">
              <b class="I106_must">隐患名称</b>
              <div class="I206_textarea">
                <textarea v-model="item.name" name="" id="" rows="3"></textarea>
              </div>
            </div>
            <div v-if="isCheck==1" class="I206_itemRemark">
              <b>隐患场所</b>
              <span>{{item.place}}</span>
            </div>
            <div v-else class="I206_itemRemark">
              <b>隐患场所</b>
              <div class="I206_textarea">
                <textarea v-model="item.place" rows="3"></textarea>
              </div>
            </div>
            <div v-if="isCheck==1" class="I206_itemName">
              <b>隐患类型</b>
              <span>{{item.typename}}-{{item.smalltypename}}</span>
            </div>
            <cascade v-else :data="item.types"></cascade>
            <div v-if="isCheck==1" class="I206_itemName">
              <b>隐患等级</b>
              <span>{{item.levelname}}</span>
            </div>
            <onePicker2 v-else :data="item.levels"></onePicker2>
            <div v-if="isCheck==1" class="I206_itemRemark">
              <b>备注</b>
              <span>{{item.remark}}</span>
            </div>
            <div v-else class="I206_itemRemark">
              <b>备注</b>
              <div class="I206_textarea">
                <textarea v-model="item.remark" rows="3"></textarea>
              </div>
            </div>
            <div class="I206_itemImg" v-if="item.imagesList.length !== 0">
              <showImg :imgData="item.imagesList" :keyName="'imagesList_'+index" @delImg="delImg" :isDel="isCheck==0"></showImg>
            </div>
            <div class="I206_itemBtnOuter" v-if="isCheck==0">
              <div class="I206_itemBtn" @click="delFrom(index)">
                <img src="@/assets/images/I206_icon2.png" alt="">
              </div>
              <div class="I206_itemBtn">
                <upLoadImg :keyName="'imagesList_'+index" :uploadIcon="uploadIcon" :number="item.imagesList.length" @setPushImg="setPushImg"></upLoadImg>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { inspect, common } from '@/api'
import showImg from '@/components/public/upImg/showImg'
import upLoadImg from '@/components/public/upImg/upLoadImg'
import cascade from '@/components/public/form/cascade'
import onePicker2 from '@/components/public/form/onePicker2'
import { toastText } from '@/utils/toastText'
export default {
  // 组件名
  name: 'inspectDetailsOther',
  // 组件构造
  mixins: [],
  // 组件扩展
  extends: {},
  // 组件属性
  props: {},
  // 组件数据
  data() {
    return {
      formList: [],
      uploadIcon: require('@/assets/images/I206_icon4.png'),
      dicts: {}, // 字典项
      searchValue: '',
      searchResult: []
    }
  },
  // 组件过滤器
  filters: {},
  // 组件计算属性
  computed: {
    taskdetailid() {
      return this.$route.params.taskdetailid
    },
    taskid() {
      return this.$route.params.taskid
    },
    eid() {
      return this.$route.params.eid
    },
    isCheck() {
      return this.$route.params.isCheck
    }
  },
  // 组件挂载
  components: {
    showImg,
    upLoadImg,
    cascade,
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
  watch: {
    searchValue() {
      if(this.searchValue === '') {
        this.searchResult = this.formList
      }
    }
  },
  methods: {
    search() {
      this.searchResult = this.searchList(this.searchValue, this.formList)
    },
    async initData() {
      const res = await inspect.enterOthers()
      if(res && res.status === 10001) {
        this.dicts.levels = res.result.level || []
        this.dicts.types = res.result.BigType || []
        this.dicts.smalltypes = res.result.SmallType || []
        this.dicts.types.forEach((item, index) => {
          item.children = []
          this.dicts.smalltypes.forEach((item2, index2) => {
            if(item.id === item2.pid) {
              item.children.push(item2)
            }
          })
        })
        this.formList = JSON.parse(sessionStorage.getItem('faillist'))
        const isDev = process.env.NODE_ENV === 'development'
        // 从暴露的全局配置中获取当前环境对应的配置对象
        const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
        this.formList.forEach((item, index) => {
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
            values: this.dicts.levels || []
          }
          item.types = {
            name: '隐患类型',
            keyName: 'types_' + index,
            type: 'cascade',
            placeholder: '请选择',
            isMust: false,
            noDataToast: '无隐患类型，请创建相关类型',
            inputValue: item.type ? item.type + ',' + item.smalltype : '',
            inputLabel: item.typename ? item.typename + '-' + item.smalltypename : '',
            values: [
              {
                values: this.dicts.types,
                className: 'column1'
              },
              {
                values: this.dicts.types[0].children,
                className: 'column2'
              }
            ]
          }
          item.imagesList.forEach((item2) => {
            item2.filePath = globalConfig.BASE_URL_MAP.DEFAULT + item2.filePath
          })
        })
        this.searchResult = this.formList
      }
    },
    /**
     * 数组模糊搜索
     * @param [String] str 搜索的字符串
     * @param [Array] container 搜索的数组
     * @returns {Array}
     */
    searchList(str, container) {
      var newList = []
      // 新的列表
      var startChar = str.charAt(0)
      // 开始字符
      var strLen = str.length
      // 查找符串的长度
      for(var i = 0; i < container.length; i++) {
        var obj = container[i]
        var isMatch = false
        for(var p in obj) {
          if(typeof (obj[p]) === 'function') {
            obj[p]()
          } else {
            var curItem = ''
            if(obj[p] != null) {
              curItem = obj[p]
            }
            for(var j = 0; j < curItem.length; j++) {
              if(typeof (curItem) === 'string' && curItem.charAt(j) === startChar) {
                if(curItem.substring(j).substring(0, strLen) === str) {
                  isMatch = true
                  break
                }
              }
            }
          }
        }
        if(isMatch) {
          newList.push(obj)
        }
      }
      return newList
    },
    /**
     * 搜索关键词高亮
     * @param val 值
     * @param keyword 关键字
     * @returns {*}
     */
    brightenKeyword(val, keyword) {
      val = val + ''
      if(val.indexOf(keyword) !== -1 && keyword !== '') {
        return val.replace(keyword, '<font color="#409EFF">' + keyword + '</font>')
      } else {
        return val
      }
    },
    pageBack() {
      sessionStorage.removeItem('faillist')
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
     * 删除其他隐患接口
     * @returns {Promise.<void>}
     */
    async delFrom(index) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定删除?'
      }).then(() => {
        this.delFromAjax(index)
      }).catch(() => {
      })
    },
    /**
     * 删除其他隐患接口请求
     * @returns {Promise.<void>}
     */
    async delFromAjax(index) {
      if(this.formList[index].id) {
        let del = {
          id: this.formList[index].id
        }
        let delRes = await inspect.delOthers(del)
        if(delRes && delRes.status === 10001) {
          this.formList.splice(index, 1)
          this.$toast(toastText.success.delSuccess)
        }
      } else {
        this.formList.splice(index, 1)
        this.$toast(toastText.success.delSuccess)
      }
    },
    /**
     * 新增其他隐患接口
     * @returns {Promise.<void>}
     */
    async newForm() {
      let json = {
        taskid: this.taskid,
        taskdetailid: this.taskdetailid,
      }
      let res = await inspect.addOthers(json)
      if(res && res.status === 10001) {
        this.formList.unshift(this.createJson(null, res.result.patrolDetailId))
        this.formList[0].levels = {
          name: '隐患等级',
          keyName: 'levels_' + (this.formList.length - 1),
          type: 'onePicker',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '无隐患等级，请创建相关类型',
          choseItem: {},
          defaultIndex: 0,
          inputValue: '',
          inputLabel: '',
          values: this.dicts.levels || []
        }
        this.formList[0].types = {
          name: '隐患类型',
          keyName: 'types_' + (this.formList.length - 1),
          type: 'cascade',
          placeholder: '请选择',
          isMust: false,
          noDataToast: '无隐患类型，请创建相关类型',
          inputValue: '',
          inputLabel: '',
          values: [
            {
              values: this.dicts.types,
              className: 'column1'
            },
            {
              values: this.dicts.types[0].children,
              className: 'column2'
            }
          ]
        }
        this.$toast(toastText.success.addSuccess)
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
          id: this.formList[keyName.split('_')[1]][keyName.split('_')[0]][index].id
        }
        let delRes = await common.deleteFile(json)
        if(delRes && delRes.status === 10001) {
          this.$toast(toastText.success.delSuccess)
          this.formList[keyName.split('_')[1]][keyName.split('_')[0]].splice(index, 1)
        }
      } else {
        this.formList[keyName.split('_')[1]][keyName.split('_')[0]].splice(index, 1)
      }
    },
    /**
     * 上传巡查图片
     * @param keyName [string]图片相关变量名
     * @param imgData [string]图片数据
     */
    async setPushImg(keyName, imgData) {
      let json = {
        id: this.formList[keyName.split('_')[1]].id,
        files: {
          filebytestr: imgData,
          fileName: ''
        }
      }
      let res = await inspect.patrolUploadFile(json)
      if(res && res.status === 10001) {
        const isDev = process.env.NODE_ENV === 'development'
        // 从暴露的全局配置中获取当前环境对应的配置对象
        const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']
        this.$toast(toastText.success.uploadSuccess)
        this.formList[keyName.split('_')[1]][keyName.split('_')[0]].push({
          filePath: globalConfig.BASE_URL_MAP.DEFAULT + res.result.filePath,
          id: res.result.id
        })
      }
    },
    /**
     * 新增时创建格式
     * @param id [int] 新增接口的id
     * @returns {{id: *, name: string, inputcontent: string, checkbuttonvalue: number,imagesList:Array}}
     */
    createJson(id, patrolDetailId, name, inputval, taskhiddenoptionid, checkbuttonvalue, imagesList, type, level, place, typename, levelname, smalltype, smalltypename) {
      let json = {
        taskhiddenitemid: id || null,
        id: patrolDetailId || null,
        name: name === undefined ? '' : name,
        remark: inputval === undefined ? '' : inputval,
        taskhiddenoptionid: taskhiddenoptionid || null,
        checkbuttonvalue: checkbuttonvalue || 0,
        imagesList: imagesList || [],
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
      let isCommit = true
      let arr = []
      if(this.formList.length !== 0) {
        for(let i = 0; i < this.formList.length; i++) {
          arr.push(this.createJson(null, this.formList[i].id, this.formList[i].name, this.formList[i].remark, null, this.formList[i].checkbuttonvalue, this.formList[i].imagesList, this.formList[i].types.inputValue.split(',')[0], this.formList[i].levels.inputValue, this.formList[i].place, this.formList[i].types.inputLabel.split('-')[0], this.formList[i].levels.inputLabel, this.formList[i].types.inputValue.split(',')[1], this.formList[i].types.inputLabel.split('-')[1]))
          if(!arr[i].name) {
            this.$toast('第' + (i + 1) + '个隐患的' + toastText.fail.nameNull)
            isCommit = false
            break
          }
        }
      } else {
        isCommit = false
      }
      if(isCommit) {
        let json = {
          taskdetailid: this.taskdetailid,
          status: 0,
          pilist: arr,
        }
        const res = await inspect.savePatrolDetail(json)
        if(res && res.status === 10001) {
          this.$toast(toastText.success.saveSuccess)
          sessionStorage.removeItem('faillist')
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
  .H106_content {overflow: auto; height: 100%; padding-top: val(79); background-color: #f5f5fa;}
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
  .I206_answer {padding: val(6); border-top: 1px solid #eeeeee; font-size: val(14); line-height: 1em; display: flex;}
  .I206_answer:before {content: ''; width: val(10); height: val(10); border-radius: 50%; margin-right: val(12);}
  .I206_nullCorrect:before {background-color: red;}
  .I206_correct:before {background-color: #16a35f;}
  .I106_must:after {content: '*'; color: red;}
  .E106_search {height: val(40); position: absolute; top: val(39); left: 0; width: 100%; z-index: 1000;}
  .E106_search>form {height: 100%;}
  .van-search {padding: val(10) val(3); height: 100%;}
</style>
