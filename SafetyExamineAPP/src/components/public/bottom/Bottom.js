/**
 *
 * Author: wsp
 * CreatDate: 2018-11-12
 *
 */
const bottom = {
    state: {
      currentPageName:'home'
    },
    mutations: {
      /**
       * 页面跳转
       * @param name [string] router——index.js 的name
       */
      jumpPage(state,name){
        state.currentPageName = name
      },
    },
    actions: {}
};
export default bottom
