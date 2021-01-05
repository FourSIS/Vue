<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return{
      isLoad: false,
    }
  },
  

  methods: {
    imageLoad() {
      if(!this.isLoad) {
        this.$emit("swiperImageLoad")   // 轮播图图片加载监听主要是为了计算tabControl的offsetTop，我们加载一张图片之后，轮播图就已经有高度了
        this.isLoad = true              // 所以，这里使用isLoad来进行判断，主要的目的是为了减少$emit的发送次数
      }
    }
  },
};
</script>

<style></style>
