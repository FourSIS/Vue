<template>
  <div class="check-button" :class="{checked: checked}">
    <img src="~assets/img/shopcard/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",

  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },

  methods: {
  },
}
</script>

<style>
  .check-button {
    border: 2px solid #aaa;
    border-radius: 50px;
  }

  .checked {
    background-color: red;
    border: 2px solid red;
  }
</style>