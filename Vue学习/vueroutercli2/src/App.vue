<template>
  <div id="app">
    <counter @counterchange="counterchange"></counter>
    <!-- to：链接  tag：渲染成什么标签，默认是a标签  replace：使用replaceState，即不能返回上一页  active：给活跃对象的class名称，可以在router中统一设置LinkActiveClass-->
    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>  -->
    <!--  <router-link to="/about" tag="button" replace active-class="active">关于</router-link>  -->

    <!-- <router-link to="/home" tag="button" replace>首页</router-link> -->
    <!-- <router-link to="/about" tag="button" replace>关于</router-link> -->

    <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link>
    <!-- <router-link :to="'/user/' + name" tag="button">用户</router-link> -->
    <!-- <router-link :to="profile" tag="button">档案</router-link> -->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>
    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
    <recall :counter="counter"></recall>

    <h2>从子组件获得计数值为：{{ counter }}</h2>
    <slottest>
      <span slot="left" slot-scope="a">{{ a.leftData }}</span>
    </slottest>
    <slottest>
      <span slot="center" slot-scope="a">{{ a.centerData }}</span>
    </slottest>
    <slottest>
      <span slot="right" slot-scope="a">{{ a.rightData }}</span>
    </slottest>
  </div>
</template>

<script>
import counter from "./components/counter";
import recall from "./components/recall";
import slottest from "./components/slottest";

export default {
  name: "App",
  components: {
    counter,
    recall,
    slottest,
  },
  data() {
    return {
      counter: 0,
      name: "lisi",
      profile: {
        path: "/profile",
        query: {
          name: "胡世杰",
          height: 1.88,
        },
      },
    };
  },
  methods: {
    userClick() {
      this.$router.push("/user/" + this.name);
    },
    profileClick() {
      this.$router.push({
        path: "/profile",
        query: {
          //pushState的时候，除了提供跳转路径以外还可以填写query相关的内容
          name: "hushijie",
          height: 1.88,
        },
      });
    },
    counterchange(counter) {
      this.counter = counter;
    },
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

.active {
  color: blue;
}
</style>
