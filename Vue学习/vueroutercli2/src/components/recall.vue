<template>
  <div>
    <h2>从父组件获得的couter为：{{ counter }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style></style>
