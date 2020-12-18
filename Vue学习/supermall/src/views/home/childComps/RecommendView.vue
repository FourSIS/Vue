<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;

  width: 100%;
  margin-top: 10px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}

.recommendItem {
  flex: 1;
}

.recommendItem img {
  height: 75px;
  width: 75px;
  margin-bottom: 3px;
}
</style>
