<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/tabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>
