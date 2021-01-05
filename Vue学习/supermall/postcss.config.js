module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,                         // 视窗的宽度，对应设计稿的宽度
      viewportHeight: 667,                        // 视窗的高度，对应设计稿的高度
      unitPrecision: 5,                           // 指定转换成视窗单位之后保留的小数位数
      viewportUnit: 'vw',                         // 指定需要转换的视窗单位，建议用vw
      selectorBlackList: ['ignore','tab-bar'],    // 指定不需要转换的"类"，exclude是匹配文件的，两者不一样
      minPixelValue: 1,                           // 小于等于1px，则不转换为视窗单位
      mediaQuery: false,                          // 允许在媒体查询中转换'px'
      exclude: [/TabBar/]                         // 正则表达式：匹配文件
    }
  }
}