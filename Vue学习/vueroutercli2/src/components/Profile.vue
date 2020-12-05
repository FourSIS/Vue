<template>
  <div>
    <h2>我是profile</h2>
    <h2>Query中的姓名为：{{ $route.query.name }}</h2>
  </div>
</template>

<script>
export default {
  name: "Profile",
  created() {
    console.log("profile created");
  },
  destroyed() {
    console.log("profile destroyed");
  },
};
</script>

<style></style>
