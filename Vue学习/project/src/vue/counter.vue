<template>
  <div>
    <h2 class="counter">当前计数：{{ counter }}</h2>
    <button @click="increase">+</button>
    <button @click="decrease" :disabled="counter <= 0">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
};
</script>

<style>
.counter {
  color: blue;
}
</style>
