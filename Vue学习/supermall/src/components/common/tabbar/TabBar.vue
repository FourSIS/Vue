<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  /* position: fixed 和 下左右全0 进行配合可以实现将tabbar显示在屏幕最下方并且左右两端贴近两边 */
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;

  /* 在标签栏的上方加上一些阴影，会让tabbar和主题部分的过渡更加自然，不会很突兀 */
  /* box-shadow: x轴偏移 y轴偏移 阴影大小 阴影颜色  两个偏移量的基准是左上角开始偏移，x轴正向往右，y轴正向往下 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.15);
}
</style>
