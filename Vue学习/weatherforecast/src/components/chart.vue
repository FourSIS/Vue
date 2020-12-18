<template>
  <div id="chart">
    <button @click="updataChart">更新图表</button>
  </div>
</template>

<script>
// 基于准备好的dom，初始化echarts实例
var myChart = $echarts.init(document.getElementById("chart"));

export default {
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: this.week,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.wea,
            type: "line",
          },
        ],
      },
    };
  },
  methods: {
    updateChart() {
      myChart.setOption(option);
    },
  },
};
</script>

<style></style>
