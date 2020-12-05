<template>
  <div class="tab-bar-item">
    <div @click="itemClick">
      <div v-if="!isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
    </div>

    <!-- 这里本来可以直接放slot，来显示item-text，但是如果直接写，没有办法绑定样式（到时候slot会被实际标签替换掉），所以用div嵌套，为了写样式 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    path: {
      type: String,
      required: true,
    },
    activeColor: {
      type: String,
      default: "red",
    },
  },

  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },

  computed: {
    isActive() {
      // 用活跃路由的path跟当前item的path进行对比(通过indexOf方法)，找到返回0，未找到返回-1，这样可以找到当前对应的活跃路由，去修改他的图标和字体颜色
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style>
.tab-bar-item {
  /* flex: 1 可以实现item之间的均等分 */
  flex: 1;
  text-align: center;

  /* 一般tabbar的高度被定义为49px是最让人舒服的 */
  height: 49px;

  font-size: 14px;
}
/* 选中tab-bar-item中的img标签，设置标签的长和宽，也就是图片的长和宽 */
.tab-bar-item img {
  height: 24px;
  width: 24px;

  /* 图片和tabbar的上端留出一些距离 */
  margin-top: 3px;

  /* 默认图片和下面的文字是会有3px的间隔，通过vertical-align：middle可以去掉中间的空格，让图片和文字靠近，好看些 */
  vertical-align: middle;
}
</style>
