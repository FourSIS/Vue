<template>
  <div id="shopcard">
    <nav-bar id="shopcard-navbar">
      <span slot="center">购物车({{length}})</span>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar
  },

  computed: {
    // 通过vuex提供的mapGetters，将store的getter的数据返回方法映射到计算属性中
    // 映射方法一： 按照原来的名字进行映射
    // ...mapGetters(['cartLength','cartList'])

    // 映射方法二： 按照自定义的名字进行映射
    ...mapGetters({
      length: "cardLength",
      list: 'cardList'
    })
  },
}
</script>

<style>
  #shopcard-navbar {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
</style>