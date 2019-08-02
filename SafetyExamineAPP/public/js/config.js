/**
 *  全局配置文件
 *  暴露在 global.config 中
 *  ! 本文件不经过 babel，请注意 ES6 语法与 API
 *  Author: aozhi
 *  CreatDate: 2019-04-30
 */
;(function() {
  var config = {
    DEV: {
      BASE_URL_MAP: {
        DEFAULT: 'http://222.92.153.214:8111',
        // DEFAULT: 'http://172.16.11.181:8111',
        // LOGIN: 'http://172.16.11.201:8089'
        LOGIN: 'http://58.211.162.61/'
      }
    },
    PROD: {
      BASE_URL_MAP: {
        // DEFAULT: 'http://172.16.11.181:8111',
        DEFAULT: 'http://222.92.153.214:8111',
        // LOGIN: 'http://172.16.11.201:8089'
        LOGIN: 'http://58.211.162.61/'
      }
    }
  }
  var g = typeof window ? window : global
  g.NT_CONFIG = config
})();
