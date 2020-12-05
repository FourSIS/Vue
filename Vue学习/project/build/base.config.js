//配置webpack打包的入口和出口，配置之后在console只需要输入webpack，就可以通过读取这个webpackconfig文件的配置对应上入口和出口
//如果不配置入口和出口，则需要在concole中加入两个参数   webpack 入口  出口  =>  webpack ./src/index.js ./dist/bundle.js

//配置文件书写的过程中，入口可以写相对路径，但是出口被要求一定要写成绝对路径，并且还得是路径文件名分开写
//为了能够适配各种情况（文件换个位置，路径不一致导致文件路径不对），这里需要使用Node里面的path模块中的resolve()方法进行路径的拼接
//__dirname是获取当前的目录（Node中的），也就是F://......//Vue学习//project ，后面在拼接上dist，再结合filename，就可以形成完整的路径了 

//一般在实际打包过程中并不是输入webpack,而是npm run build, npm run XXX 这里的XXX是通过npm init产生的package.json中的scripts中进行定义
//添加 "build: 'webpack'"即可
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //webpack入口和出口的配置
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'), //path会作为整个打包过程的目的文件夹
    filename: 'bundle.js', //filename会作为打包后的js文件的名字
    //publicPath: 'dist/' //publicPath会在所有url加载的时候加上前缀，如果不加这个，那么会在当前目录下面找，但实际上我们打包到了dist文件夹下，在讲index.html打包到dist文件夹后，这个配置就不需要了

  },

  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loader负责将css文件打包
        //style-loader负责将css的内容加载到dom中
        //如果只有css-loader那么打包的css不会生效(因为css没有加载进dom)，没用style-loader的bundle.js 215行，使用之后514行......
        //并且use loader的时候有先后顺序问题，而且webpack很怪，他是从右向左解析的，所以css放在右边np
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            //limit单位是字节，低于limit的图片会以Base64字符串的形式传输，高于limit的图片会打包到dist（output对应的文件夹）下  （利用file-loader）
            //打包到dist文件夹的同时会通过哈希算法重命名避免重复，引用url的时候注意配置pubilcPath，否则会在project文件夹下面找图片(找不到的)
            limit: 8192,

            //配置文件打包后的位置，名称，哈希后缀，拓展名
            name: 'img/[name].[hash:8].ext'
          }
        }, ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, //与include相对，exclude表示'排除'
        use: {
          loader: 'babel-loader',   //将ES6+的语法转换成ES5，使浏览器能看懂
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },

  resolve: {

    extensions: ['.js','.css','.vue'],    //在resolove中配置extensions，可以在引入模块的时候省略掉对应的扩展名

    alias: {    //在Import vue模块的时候，如果不指定vue的具体文件，那么默认会去调用一个runtime-only的js文件，运行时会产生错误
      'vue$': 'vue/dist/vue.esm.js'   //指定vue在导入的时候，导入的具体js文件，这个文件是runtime-complier的
    }
  },

  plugins: [
    new HtmlWebpackPlugin({                                 //打包index.html，自动导入bundle.js
      template: 'index.html'
    }),
  ],

};