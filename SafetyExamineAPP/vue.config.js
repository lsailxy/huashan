// 是否是 hybridApp 项目
const IS_APP = true
const APP_NAME = 'nyhc'
module.exports = {
  productionSourceMap: false,
  publicPath: IS_APP ? './' : '/',
  outputDir: IS_APP ? `dist/${APP_NAME}` : 'dist'
}
