import BackTop  from "components/content/backTop/BackTop"
import { debounce } from "./utils"

// 通过混入，减少代码冗余
export const imageListenerMixin = {
  data() {
    return {
      imageListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    this.imageListener = () => {
      this.refresh()
    }
    this.$bus.$on("imageLoad", this.imageListener)
  },
}

// 回到顶部的混入封装，这里的封装其实是不完全的，还有一个判断逻辑没有混入进来 ———— 监听scroll的position.y，小于某个值的时候显示按钮，反之不显示
// 这个逻辑还是放在了每个用到backTop的组件内部去实现了，只有一行代码
// 当然可以把一行代码单独抽成一个函数，然后把函数定义在mixin中，视图组件中只需要调用对应的函数就可以。不过这里没有这么做，感觉差别不大
export const backTopMixin = {
  data() {
    return{
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      // 这里是直接对组件进行原生事件监听，例如点击事件需要使用@click.native
      // 使用了.native相当于"在组件内部进行@click监听，然后$emit返回，然后在父组件进行监听emit" 
      // console.log(this.$refs.scroll.message);   // 通过this.refs.AAA.bb 可以获取AAA组件中的bb数据
      // this.$refs.scroll.scroll.scrollTo(0,0,500)    // 通过调用scroll组件内部  绑定在content上的的scroll对象  的scrollTo(x,y,time)方法进行跳转
      this.$refs.scroll.scrollTo(0,0)   // 这里调用的是组件内部进行过封装的scrollTo方法，time属性进行过默认值的设置，如果不传time,就是500ms
    },
  },
}