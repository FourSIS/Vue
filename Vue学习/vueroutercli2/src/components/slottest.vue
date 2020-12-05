<template>
  <div>
    <slot name="left" :leftData="replace"><span>左边</span></slot>
    <slot name="center" :centerData="replace"><span>中间</span></slot>
    <slot name="right" :rightData="replace"><span>右边</span></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      replace: "替换",
    };
  },
};
</script>

<style></style>
