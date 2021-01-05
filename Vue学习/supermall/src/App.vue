<template>
  <div id="app">
    <!-- keep-alive 中的 exclude 属性匹配的是组件中的名字，如果组件中没有name属性，那么exclude和include不会生效 -->
    <keep-alive exclude="Details"> 
      <router-view/>
    </keep-alive>
    <tab-bar/>
  </div>
</template>

<script>
import TabBar from "components/content/tabbar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    TabBar,
  },
};
</script>
 
<style>
@import "assets/css/base.css";
</style>
