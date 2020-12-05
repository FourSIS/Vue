<template>
  <div>
    <h2>当前计数：{{ counter }}</h2>
    <button @click="increase">+</button>
    <button @click="decrease" :disabled="counter <= 0">-</button>
    <slot name="left" :replaceMessage="replaceMessage"><span>左边</span></slot>
    <slot name="center" :replaceMessage="replaceMessage"><span>中间</span></slot>
    <slot name="right" :replaceMessage="replaceMessage"><span>右边</span></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      replaceMessage: "replace",
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
