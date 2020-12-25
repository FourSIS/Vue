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
  data() {
    return{
      scroll: null,
      message: "hsj"    // 用于调试
    }
  },

  props: {
    probeType: {
      type: Number,
      default: 0,
    }
  },

  mounted() {
    // 生成scroll对象 
    this.scroll = new BScroll(this.$refs.wrapper, {    // 获取scroll需要绑定的wrapper的时候，不要用Query去查找，容易绑定成同名的其他元素，直接用this.$ref.XXX进行特定匹配
      probeType: this.probeType,
      click: true,        // 用于控制scroll中的div这样的元素是否可以被点击，默认是false，不可以点击
      pullUpLoad: true,
      observeDOM: true,
    });

    // 监听scroll滑动
    this.scroll.on("scroll",(position) => {
      console.log(this.probeType);
      console.log(position);
    })

  },
  
  methods: {
    scrollTo(x, y, time = 500) {    // 直接在参数上进行赋值，表示设置默认值
      this.scroll.scrollTo(x, y, time)
    }


  },
};
</script>

<style></style>
