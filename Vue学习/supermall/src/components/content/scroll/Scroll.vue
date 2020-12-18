<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  mounted() {
    const scroll = new BScroll(this.$refs.wrapper, {
      probeType: 2,
      click: true,
      pullUpLoad: true,
      observeDOM: true,
    });
  },
};
</script>

<style></style>
