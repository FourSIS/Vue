<template>
  <div id="shopcard">
    <shopcard-nav-bar />

    <scroll id="shopcard-scroll" ref="scroll">
      <shopcard-list></shopcard-list>
    </scroll>

    <shopcard-bottom-bar />
  </div>
</template>

<script>

import shopcardNavBar from "./childComps/shopcardNavBar"
import shopcardList from "./childComps/shopcardList"
import shopcardBottomBar from "./childComps/shopcardBottomBar"

import scroll from "components/content/scroll/Scroll"

export default {
  components: {
    shopcardNavBar,
    shopcardList,
    shopcardBottomBar,

    scroll
  },

  activated() {
    this.$refs.scroll.refresh()
  },
};
</script>

<style>
  #shopcard-scroll {
    height: calc(100vh - 44px - 49px - 40px);
    width: 100vw;
    overflow: hidden;
  }
</style>
