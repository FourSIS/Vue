<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navBarClick="navBarClick" ref="navbar"/>
    <scroll class="bs-wrapper" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar"           // 导航栏
import DetailSwiper from "./childComps/DetailSwiper"           // 轮播图
import DetailBaseInfo from "./childComps/DetailBaseInfo"       // 商品基本信息
import DetailShopInfo from  "./childComps/DetailShopInfo"      // 商家信息
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"     // 商品穿着效果
import DetailParamInfo from "./childComps/DetailParamInfo"     // 商品参数信息
import DetailCommentInfo from "./childComps/DetailCommentInfo" // 评论信息
import DetailBottomBar from "./childComps/DetailBottomBar"     // 底部栏

import Scroll from "components/content/scroll/Scroll"          // 调用轮播图组件
import GoodsList from "components/content/goods/GoodsList"     // 调用goodsList组件

import {getDetailInfo, getRecommendInfo, Goods, Shop, GoodsParam} from "network/detail"      // detail数据的网络请求方法
import {debounce} from "common/utils"
import {imageListenerMixin,backTopMixin} from "common/mixin"
import { mapActions } from "vuex"

export default {
  name: "Details",      // name可以用于keep-alive中的exclude和Include匹配，detail页必须在keep-alive中排除，所以一定要有name
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
  },

  data() {
    return{
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      imageListener: null,
      offsetTops: [0,-1000,-2000,-3000],
      currentIndex: 0,
    }
  },

  methods: {
    // store的action映射
    ...mapActions(["addCart"]),

    // 图片加载完毕后，刷新bs的高度，但是实际上observeDOM已经帮我们完成了，这个方法其实是多余的，但是在没有observeDOM的时候是必要的
    imageLoad() {
      this.$refs.scroll.refresh()

      this.offsetTops = []
      this.offsetTops.push(0)
      this.offsetTops.push(this.$refs.param.$el.offsetTop)
      this.offsetTops.push(this.$refs.comment.$el.offsetTop)
      this.offsetTops.push(this.$refs.recommend.$el.offsetTop)
      this.offsetTops.push(Number.MAX_SAFE_INTEGER)   // 最后添加一个最大值，用于后面导航栏联动的 简化判断
      
    },

    navBarClick(index) {
      // 获取到各个部分的offsetTop，并且点击对应选项卡之后，进行跳转
      this.$refs.scroll.scrollTo(0, -(this.offsetTops[index] - 44), 500)
    },

    contentScroll(position) {
      // 1.监听位置，控制顶部选项卡同步联动
      const length = this.offsetTops.length
      for( let i = 0; i < length-1; i++) { 
        if( this.currentIndex !== i && ( -position.y >= this.offsetTops[i] && -position.y < this.offsetTops[i+1])) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        } 
      }

      // 2.监听位置，控制"返回顶部按钮"是否显示
      this.isShowBackTop = (-position.y) > 1000
    },

    addToCart() {
      // 1.获取要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将信息添加到Vuex统一存放
      //   这里不要直接this.$store.cartList.push直接赋值，这样Vue工具是不会记录的，要用commit触发mutations函数
      // 在actions中return new Promise,然后把逻辑代码放在Promise进行，返回Promise对象，在外部调用
      // this.$store.dispatch("addCart",product).then( res => {
      //   console.log(res);
      // })

      // 通过mapActions映射Action之后，可以直接调用
      this.addCart(product).then( res => {
        this.$toast.show(res,1500)
      })
    }
  },

  created() {     // 每次进入Detail的时候都需要执行created方法来获取新的detail，所以我们要在keep-alive中把Detail去掉
    // 1. 拿到对应商品的iid
    this.iid = this.$route.query.iid    // 路由跳转过来的时候用的是query携带参数，那么就用this.$route.query.xxx
    // this.iid = this.$route.params.iid    // 路由跳转过来的时候用的是动态路由携带参数，那么就用this.$route.params.xxx

    // 2. 拿到对应商品的detail
    getDetailInfo( this.iid ).then( res => {

      const data = res.result
      
      // 分为三个阶段：
      // 1. Detail将数据给到组件中
      // 2. 组件内部进行DOM的生成
      // 3. 图片的加载


      // 1. 获取轮播图片
      this.topImages = data.itemInfo.topImages
     
      // 2. 获取商品基本信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
     
      // 3. 获取商家信息
      this.shop = new Shop(data.shopInfo)

      // 4. 展示商品效果
      this.detailInfo = data.detailInfo

      // 5. 查询商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6. 用户评论信息
      if( data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // 7. 获取评论信息
      getRecommendInfo().then( res => {
        this.recommends = res.data.list
      })

      // // 这里仅仅完成了第一个阶段 —— 将数据传送到组件内部，但是组件内部没有进行DOM的加载，更没有加载图片，所以这里拿不到正确的offsetTOp
      // this.offsetTops = []
      // this.offsetTops.push(0)
      // this.offsetTops.push(this.$refs.param.$el.offsetTop)
      // this.offsetTops.push(this.$refs.comment.$el.offsetTop)
      // this.offsetTops.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.offsetTops);

      // // 这里完成了第一和第二个阶段 —— 数据传入，DOM加载， 但是图片并没有加载出来，所以offsetTop也是不对的
      // this.$nextTick( () => {
      //   this.offsetTops = []
      //   this.offsetTops.push(0)
      //   this.offsetTops.push(this.$refs.param.$el.offsetTop)
      //   this.offsetTops.push(this.$refs.comment.$el.offsetTop)
      //   this.offsetTops.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.offsetTops);
      // })
    })
  },

  mixins: [imageListenerMixin,backTopMixin],
  
  mounted() {
  },

  // detail被keep-alive排除，所以没有deactived回调，只有destroyed
  destroyed() {
    this.$bus.$off(this.imageListener)
  },

}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background: #fff;
    
    /* bs的wrapper必须有高度，而我们计算高度的时候会用到100%，这个百分比是相对父元素，也就是#detail的，所以#detail需要一个高度，这里设置为100vh */
    height: 100vh;
  }
  
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .bs-wrapper {
    /* 如果需要通过百分比来计算结果，那么需要用calc函数 */
    height: calc(100% - 44px - 58px);
  }


</style>