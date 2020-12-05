<template>
  <div>
    <h2>当前计数值：{{ counter }}</h2>
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
      this.$emit("counterchange", this.counter);
    },
    decrease() {
      this.counter--;
      this.$emit("counterchange", this.counter);
    },
  },
};
</script>

<style></style>
