const baseConfig = require('./base.config')
const webpackMerge = require('webpack-merge')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new UglifyjsWebpackPlugin()                             //丑化，压缩bundle.js
  ]
})