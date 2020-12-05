<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <HelloWorld>
      <template slot="left" slot-scope="slot">
        <span>{{ slot.replaceMessage }}</span>
      </template>
    </HelloWorld>

    <HelloWorld>
      <template slot="center" slot-scope="slot">
        <span>{{ slot.replaceMessage }}</span>
      </template>
    </HelloWorld>

    <HelloWorld>
      <template slot="right" slot-scope="slot">
        <span>{{ slot.replaceMessage }}</span>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
