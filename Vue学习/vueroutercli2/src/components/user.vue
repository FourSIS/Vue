<template>
  <div>
    <h2>我是user组件</h2>
    <h2>我是user组件的内容，嘻嘻嘻</h2>
    <h2>url中的变量名为：{{ userId }}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    userId() {
      return this.$route.params.userId; //this.$route可以拿到对应的活跃路由，其中params可以拿到活跃路由的path中对应的绑定变量
    },
  },
  created() {
    console.log("user Created");
  },
  destroyed() {
    console.log("user destoryed");
  },
};
</script>

<style></style>
