<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content">
      <swiper :banners="banners"></swiper>
      <recommend :recommends="recommends" />
      <feature />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/content/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import Swiper from "views/home/childComps/HomeSwiper";
import Recommend from "views/home/childComps/RecommendView";
import Feature from "views/home/childComps/FeatureView";

import { getHomeMultiData, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { curPage: 0, list: [] },
        new: { curPage: 0, list: [] },
        sell: { curPage: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    Swiper,
    Recommend,
    Feature,
  },
  methods: {
    /*
     ** 网络请求有关代码
     */
    getHomeMultiData() {
      // 在methods中，对created要用到的函数进行封装，如果是同名的函数，那么在created中要加this
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].curPage + 1; // 拿到当前页码之后，我们要请求的应该是下一页的内容，需要+1
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list); // 将一个数组“塞”到另外一个数组中，用push，并且用...对数组进行解构，一个一个塞进去
        this.goods[type].curPage += 1; // 最后将当前页码+1
      });
    },

    /*
     **  事件监听有关代码
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;

        case 1:
          this.currentType = "new";
          break;

        case 2:
          this.currentType = "sell";
          break;
      }
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 获取轮播图和推荐商品数据
    this.getHomeMultiData();

    // 获取商品数据
    this.getHomeGoods("pop"); // 因为在methods中进行了封装，在created中调用的时候就没有各种复杂的逻辑，只需要提供获取商品的type即可
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px;  子绝父相之后就不需要这个padding了*/
  height: 100vh; /* vh: viewport height 视口高度 => 100vh 表示占据视口的100% */
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  position: absolute; /* 子绝父相，通过绝对布局，将navbar和tabbar的位置挤出去，剩下的就是content显示的位置 */
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  overflow: hidden;
}
</style>
