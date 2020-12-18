<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.id" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap; /* 如果不设置"包裹"的话，flex布局默认所有元素都挤在一行，如果想分行显示，就给每个flex布局下的元素都设置宽度，并且布局设置成"包裹" */
  justify-content: space-around;
}
</style>
