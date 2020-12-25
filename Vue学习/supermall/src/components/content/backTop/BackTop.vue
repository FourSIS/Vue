<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style>
.back-top {
  /* fixed 定位，可以让图片保持在右下角的位置 */
  position: fixed;   
  right: 8px;
  bottom: 55px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>
