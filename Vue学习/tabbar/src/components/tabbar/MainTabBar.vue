<template>
  <tab-bar>
    <!-- 动态传入path用于路由跳转，动态传入activeColor，用于自定义活跃字体的颜色，默认为红色 -->
    <tab-bar-item path="/home" activeColor="red">
      <img src="~assets/img/TabBar/home.svg" alt="" slot="item-icon" />
      <img src="~assets/img/TabBar/home_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="~assets/img/TabBar/category.svg" alt="" slot="item-icon" />
      <img src="~assets/img/TabBar/category_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcard">
      <img src="~assets/img/TabBar/shopcard.svg" alt="" slot="item-icon" />
      <img src="~assets/img/TabBar/shopcard_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="~assets/img/TabBar/profile.svg" alt="" slot="item-icon" />
      <img src="~assets/img/TabBar/profile_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/tabbar/TabBar";
import TabBarItem from "components/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style></style>
