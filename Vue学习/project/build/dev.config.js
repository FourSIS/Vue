const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports =  webpackMerge(baseConfig, {
  devServer: {                //开发时服务器
    contentBase: './dist',    //管理的文件夹
    inline: true,             //自动刷新
  }
})
  