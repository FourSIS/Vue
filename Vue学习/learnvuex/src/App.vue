<template>
  <div id="app">
    <h2>当前计数值：{{ $store.state.counter }}</h2>
    <button @click="increase(5)">+5</button>
    <button @click="decrease(5)">-5</button>
    <vuex1></vuex1>
  </div>
</template>

<script>
import vuex1 from "./components/vuex1";
import * as types from "./store/mutations-type"; // 全部引入就要起个别名，要不然就得用对象一个一个引入

export default {
  name: "App",
  components: {
    vuex1,
  },
  methods: {
    increase(adder) {
      this.$store.commit(types.INCREASE, adder); // 这里记住，不管是$router还是$store1，如果不是在template里面使用，一定前面是有this的，因为他们是vue实例里面注册的内容
    },
    decrease(subtracter) {
      this.$store.commit(types.DECREASE, subtracter); // 所有对store1.state数据的修改操作一定记得要经过mutation，否则devtools中没有记录，这里通过commit去调用mutation的函数
    },
  },
};
</script>

<style></style>
