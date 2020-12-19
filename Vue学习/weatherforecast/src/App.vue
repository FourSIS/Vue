<template>
  <div id="app">
    <!-- 背景图片的if-else选取 -->
    <div id="bg">
      <img :src="bgPath" alt="" id="bg-img">
    </div>

    <!-- display-content用于给主要内容加上铺垫层 ———— 白色透明 -->
    <div class="display-content">
      
      <!-- 搜索框 -->
      <div id="select" :style="{visibility: showSelect ? 'visible' : 'hidden'}">
        <input type="text" :value="city" id="cityInput" @keyup.enter="updateCity" />
        <img src="~assets/img/search.svg" @click="updateCity" />
      </div>
      
      <!-- 天气预报内容：今日天气，未来天气以及折线图 -->
      <div id="weather">

        <!-- 今日天气内容：时间地点，温度信息，小贴士 -->
        <div id="weather-today">

          <!-- 时间地点 -->
          <div id="position-and-date">
            <span class="XXL">{{ city }}</span> 
            <span class="S hover-change" @click="showSelect = true" @mousedown="mousedown" @mouseup="mouseup">[切换城市]</span>
            <p>
              <span style="margin-right: 15px">{{ date[dayIndex] }}</span>
              <span>{{ week[dayIndex] }}</span>
            </p>
          </div>

          <!-- 温度信息内容：主要天气，其他参数 -->
          <div id="temperature">

            <!-- 主要天气 -->
            <div id="main-temperature" class="hover-change" @click="updateWeekTem()" @mousedown="mousedown" @mouseup="mouseup">
              <!-- 主要天气的图标 -->
              <img :src="iconTodayPath" alt="">
              <span id="temperature-number">{{ tem[dayIndex]+"℃" }}</span>
              <div>
                <p>{{ wea[dayIndex] }}</p>
                <p>{{ temMin[dayIndex]+"℃"+" ~ "+temMax[dayIndex]+"℃" }}</p>
              </div>
            </div>

            <!-- 其他参数 -->
            <div>
              <p>
                <span class=" hover-change" @mousedown="mousedown" @mouseup="mouseup">风向：{{ win[dayIndex] }} </span>
                <span class=" hover-change" @mousedown="mousedown" @mouseup="mouseup">风速：{{ winSpeed[dayIndex] }}</span>
              </p>
              <p>
                <span class=" hover-change" @click="updateSunriseChart()" @mousedown="mousedown" @mouseup="mouseup">日出时间：{{sunrise[dayIndex]}}</span>
                <span class="hover-change" @click="updateSunsetChart()" @mousedown="mousedown" @mouseup="mouseup">日落时间：{{sunset[dayIndex]}}</span>
              </p>
              <p>
                <span class="hover-change" @click="updateAirChart()" @mousedown="mousedown" @mouseup="mouseup">空气质量：{{air_level[dayIndex ]}}</span>
              </p>
            </div>

          </div>

          <!-- 小贴士 -->
          <div v-for="(items, index) in tips" :key="items.id" :style="{display: dayIndex === index ? 'flex' : 'none'}"  id="tips" >
            <div v-for="(item, index) in items" :key="item.id" class="tips-content" @mouseover="tipsHover(index)" @mouseout="tipsOut">
              <span v-if="index === tipsIndex">{{ item.desc}}</span>
              <div v-else>
                <p>{{ item.title }}</p>
                <p class="tips-level">{{ item.level}}</p>
              </div>
            </div>
          </div>

        </div>

        <!-- 未来天气标题 -->
        <p id="broadcast-title" class="XL">{{ city }}天气预报一周</p>

        <!-- 未来天气：图标和信息 -->
        <div id="weather-fature-week">
          <div v-for="(item, index) in date" :key="item.id" class="weather-fature-day hover-change" @click="changeDayAndUpdateChart(index)" @mousedown="mousedown" @mouseup="mouseup">
            <div>
              <p>{{ week[index] }}</p>
              <p>{{ date[index] }}</p>
              <img :src="getIconPath(index)" alt="">
              <p>{{ temMin[index]+"℃"+" ~ "+temMax[index]+"℃" }}</p>
              <p>{{ wea[index] }}</p>
              <p>{{ win[index] }}</p>
            </div>
          </div>
        </div>

        <!-- 折线图 -->
        <div id="chart-wrapper"><div id="chart"></div></div>
        
      </div>
    </div>
  </div>
</template>

<script>
import {request} from "./network/request";
let echarts = require("echarts");
let myChart;


export default {
  name: "App",
  components: {},
  data() {
    return {
      // 城市参数，默认为武汉
      city: "武汉",

      // 未来七日数据
      date: [],             // 日期
      week: [],             // 星期情况（星期一，星期二...）
      wea: [],              // 天气情况
      wea_img: [],          // 气象图标
      tem: [],              // 平均温度
      temMax: [],           // 最高气温
      temMin: [],           // 最低气温
      hoursTem: [],            // 未来七天时段天气
      sunrise: [],          // 日出时间
      sunset: [],           // 日落时间
      win: [],              // 风向 
      winSpeed: [],         // 风速
      air: [],              // 空气指数
      air_level:[],         // 空气质量
      tipsIndex: 10,        // 小贴士onmouseover配合使用，动态显示小贴士
      tips: [],             // 小贴士内容
      
      // 画图所需参数
      option: {},           // 画图所需参数

      // 流程控制辅助参数
      showSelect: true,    // 控制输入框的显示
      isDay: true,          // 控制背景图片采用白天还是黑夜主题
      dayIndex: 0,          // 控制主要显示哪一天的天气
      
    };
  },
  methods: {
    updateCity() {
      this.selectStateChange()    // 关闭搜索框
      this.cityChange()           // 改变城市参数
      this.getWeatherInfoAndDrawChart() // 获取数据并画图

      document.getElementById("bg-img").style.animationPlayState = "running";
    },

    getWeatherInfoAndDrawChart() {
      // 网络请求(基于axios，已实现封装，封装后为request函数)
      request({
        url: "",
        method: "get",
        params: {
          appid: "22266748",
          appsecret: "pTIzTk6N ",
          version: "v9",
          city: this.city,
          vue: "1",
        },
      }).then(res => {
        console.log(res);
        // 获取未来七天的数据
        for (let i = 0; i < res.data.length; i++) {
          this.$set(this.date,i,res.data[i].date)                               // 日期                  
          this.$set(this.week,i,res.data[i].week)                               // 星期                 
          this.$set(this.wea,i,res.data[i].wea)                                 // 天气  
          this.$set(this.wea_img,i,res.data[i].wea_img)                         // 天气图标                     
          this.$set(this.tem,i,res.data[i].tem)                                 // 平均气温                 
          this.$set(this.temMax,i,res.data[i].tem1)                             // 最高气温                  
          this.$set(this.temMin,i,res.data[i].tem2)                             // 最低气温                  
          this.$set(this.win,i,res.data[i].win[0])                              // 风向   
          this.$set(this.winSpeed,i,res.data[i].win_speed)                      // 风速
          this.$set(this.sunrise,i,res.data[i].sunrise)                         // 日出时间
          this.$set(this.sunset,i,res.data[i].sunset)                           // 日落时间
          this.$set(this.air,i,res.data[i].air)                                 // 空气污染指数
          this.$set(this.air_level,i,res.data[i].air_level)                     // 空气质量
          this.$set(this.tips,i,res.data[i].index)                              // 小贴士相关内容
          this.$set(this.hoursTem,i,res.data[i].hours)                          // 每小时气温  
        }
        this.isDay = res.update_time.slice(-8, -6) >= 18 ? false : true; // 判定是否为白天，决定背景图片
        this.updateWeekTem()    // 默认显示未来七天天气变化图
      })
    },

    selectStateChange() {     // 改变城市输入框的显示情况
      this.showSelect = !this.showSelect;
    },

    cityChange() {            // 改变城市参数
      this.city = document.getElementById("cityInput").value; // 不使用v-model绑定，否则会在修改搜索框的时候改掉界面，不同步，视觉效果不好
    },

    tipsHover(index) {        // 结合onmouseover动态改变tipsIndex，实现动态显示小贴士
      this.tipsIndex = index;
    },

    tipsOut() {               // 结合onmouseout动态改变tipsIndex，实现动态让小贴士消失
      this.tipsIndex = 10;
    },

    mousedown(event) {
      let newClassName = event.currentTarget.className.replace('hover-change','mousedown-change')   // 用mousedown的class替换掉hover的class带来的样式效果
      event.currentTarget.className = newClassName
    },

    mouseup(event) {
      let newClassName = event.currentTarget.className.replace('mousedown-change','hover-change')   // 效果和mousedown相反
      event.currentTarget.className = newClassName
    },

    changeDayAndUpdateChart(index) {
      this.changeDayIndex(index)

      let hours = this.hoursTem[this.dayIndex].map( currentValue => {         // 获取x轴 ———— 时间
        return currentValue.hours
      })

      let temperature = this.hoursTem[this.dayIndex].map( currentValue => {   // 获取y轴 ———— 温度
        return currentValue.tem
      })

      this.drawChart(hours,temperature,'{value}℃',"小时气温变化图 ———— "+this.week[this.dayIndex])

       document.getElementById("bg-img").style.animationPlayState = "running";

    },

    updateSunriseChart() {
      let hour = this.sunrise.map( data =>  data.substr(0,2) )
      let min = this.sunrise.map( data => data.substr(3,2) )
      this.drawChart(this.week,min,(value,index) => {
        if(value < 10) 
          return  hour[index]+":0"+value
        return hour[index]+":"+value
      },"未来七天日出时间趋势图")
    },

    updateSunsetChart () {
      let hour = this.sunset.map( data =>  data.substr(0,2) )
      let min = this.sunset.map( data => data.substr(3,2) )
      this.drawChart(this.week,min,(value,index) => {
        if(value < 10) 
          return  hour[index]+":0"+value
        return hour[index]+":"+value
      },"未来七天日落时间趋势图")
    },
    
    updateAirChart() {
      this.drawChart(this.week,this.air,'{value}',"未来七天空气污染指数趋势图")
    },

    updateWeekTem() {
      this.drawChart(this.week,this.tem,'{value}℃',"未来七天气温变化趋势图")
    },

    changeDayIndex(index) {   // 改变主要显示天气
      this.dayIndex = index;
    },

    drawChart(paramX, paramY,formatter,title) {             // 绘制图表
        let test = this.chartTem = this.tem.map(curValue => {
          return curValue.slice(0, -1);
        });

      // 更新图表信息
        this.option = {

          //字体颜色
          color: ["#ffffff"],

          // 设置相对于父元素的位置
          grid: {
            bottom: 20,
            left: 50,
            right: 30,
          },

          // 标题
          title: {
            text: title,
            left: "center",
            top: 10,
            textStyle: {
              color: "rgba(255,255,255,1)"
            }
          },

          // x轴相应参数
          xAxis: [  
            {
              type: "category",
              data: paramX,   // this.week
              show: true,
              axisPointer: {
                show: true,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                color: "rgba(255,255,255,1)",
              },
            },
          ],

          // y轴相应参数
          yAxis: [
            {
              type: "value",
              show: true,
              scale: true,    // 自适应
              minInterval: 1, // 只显示整数
              axisPointer: {
                show: true,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                color: "rgba(255,255,255,1)",
                formatter: formatter  // 格式化操作，可以是字符串也可以是函数
              },
            },
          ],

          series: [
            {
              data: paramY, // this.chartTem
              type: "line",
            },
          ],
        };
      
      myChart.setOption(this.option);
    },

    getIconPath(index) {   // 获取未来天气的图标，如果没有这个index作为参数，其实可以写到computed里面
      if(this.wea_img[index] === undefined){          // 接口数据没有请求过来的那一瞬间，先设置一个默认图标
        return require("assets/img/icon/lei.svg")
      }
      return require("assets/img/icon/"+this.wea_img[index]+".svg")
    },
  },

  computed: {
    bgPath() {
      if(this.wea_img.length == 0) {      // 接口数据没有请求过来的那一瞬间，先设置一个默认图标
        return require('assets/img/bg/lei1.jpg')
      }
      let ext = this.isDay ? 1 : 0;
      return require("assets/img/bg/"+this.wea_img[this.dayIndex]+ext+'.jpg')
    },

    iconTodayPath() {
      if(this.wea_img.length == 0) {      // 接口数据没有请求过来的那一瞬间，先设置一个默认图标
        return require("assets/img/icon/leiToday.svg")
      }
      return require("assets/img/icon/"+this.wea_img[this.dayIndex]+"Today.svg")
    },
  },

  mounted() {     // dom挂载完毕后，可以通过getElementById找到对应的dom元素，将对应的元素绑定到echarts上
    myChart = echarts.init(document.getElementById("chart")); // 绑定chart元素并生成实例
    this.updateCity(); // 获取接口数据

    // document.getElementById("bg-img").addEventListener("webkitAnimationStart", () => {    // 背景监听动画结束，为了切换图片时候能够再次触发动画
    //   setTimeout(() => {
    //     document.getElementById("bg-img").style.animationPlayState = "paused";
    //   },2000)
    // });
  },
};
</script>

<style>
@import "assets/css/weatherforecast.css";
</style>
