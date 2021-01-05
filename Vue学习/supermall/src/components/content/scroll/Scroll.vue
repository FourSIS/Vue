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
    }
  },

  props: {
    probeType: {
      type: Number,  
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    }
  },

  mounted() {
    // 生成scroll对象 
    this.scroll = new BScroll(this.$refs.wrapper, {    // 获取scroll需要绑定的wrapper的时候，不要用Query去查找，容易绑定成同名的其他元素，直接用this.$ref.XXX进行特定匹配
      probeType: this.probeType,
      click: true,        // 用于控制scroll中的div这样的元素是否可以被点击，默认是false，不可以点击
      pullUpLoad: this.pullingUp,
      observeDOM: true,   // 用于动态改变bscroll的高度变化，相当于在img的@load事件中，通过事件总线$bus发送事件，并且在Home中监听
    });

    // 监听scroll滑动
    if(this.probeType != 0 && this.probeType != 1) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll",position)
      })
    }

    // 监听下拉事件
    if(this.pullUpLoad) {
      this.scroll.on("touchEnd", ( position ) => {        // 最新的bs已经取消了pullingUp监听事件，现在可以使用touchEnd
        // 手指移开屏幕的时候
        // 如果现在的Y值足够低，那么加载更多
        if( position.y < this.scroll.maxScrollY -30) {    // 使用touchEnd，基于当前位置和最大位置的对比判断是否需要加载，并且不需要finish
          this.$emit("touchEnd")
        }
      })
    }
  },
  
  methods: {
    // 如果在调用这些方法的时候，这个组件并没有被挂载，那么scroll就不存在，这个时候调用他的任何方法肯定都是错的
    // 所以在运行的时候就会报错，那么这个时候如果我们通过与运算进行一个前置判断，那么当第一个条件为null的时候，后面的语句就不会被执行
    // 最终的返回值也只是一个Null不会出现错误
    scrollTo(x, y, time = 500) {    // 直接在参数上进行赋值，表示设置默认值
      this.scroll && this.scroll.scrollTo(x, y, time)   
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }

  },
};
</script>

<style></style>
