<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt=""  class="back">
      </div>
      
      <div slot="center" class="title">
        <div v-for="(title, index) in titles" :key="title.id" class="title-item"  
        :class="{active: currentIndex === index}"
        @click="itemClick(index)">
          {{ title }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar"

export default {
  components: {
    NavBar
  },

  data() {
    return{
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("navBarClick", index)
    },

    backClick() {
      this.$router.back()  // this.$router.go(-1)也是一样的效果
    }
  },
}
</script>

<style>
  .title {
    display: flex;
    font-size: 15px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 12px;
  }

</style>