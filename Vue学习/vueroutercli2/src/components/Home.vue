<template>
  <div>
    <h2>我是Home</h2>
    <h2>我是Home的内容，哈哈哈</h2>
    <router-link to="/home/news" tag="button">新闻</router-link>
    <router-link to="/home/messages" tag="button">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      path: "/home/news",
    };
  },
  methods: {},
  // created() {
  //   console.log("Home Created");
  // },
  // destroyed() {
  //   console.log("Home Destoryed");
  // },
  activated() {
    //处于活跃状态时，回调activated函数
    this.$router.push(this.path); //改变路由
    console.log("activated");
  },
  deactivated() {
    console.log("deactivated");
  },
  beforeRouteLeave(to, from, next) {
    this.path = this.$route.path;
    next();
  },
};
</script>

<style></style>
