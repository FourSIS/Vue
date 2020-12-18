<template>
  <tab-bar>
    <!-- 动态传入path用于路由跳转，动态传入activeColor，用于自定义活跃字体的颜色，默认为红色 -->
    <tab-bar-item path="/home" activeColor="red">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcard">
      <img src="~assets/img/tabbar/shopcard.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/shopcard_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style></style>
