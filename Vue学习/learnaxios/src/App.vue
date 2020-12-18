<template>
  <div id="app"></div>
</template>

<script>
import axios from "axios"; // 导入axios

export default {
  name: "App",
  components: {},
};

// 直接使用axios，其中参数是一个对象，返回值是一个Promise，并且内部封装了resolve函数，也就是说，对于拿到数据之后的success函数，可以直接在返回值后面写then函数
// axios({
//   url: "http://httpbin.org",
//   params: {
//     // 对于get请求，可以把参数放在url中，但是那样显得url太长了，也不好扩充，所以单独用params写，axios会自动完成拼接
//     name: "hsj",
//     age: 18,
//     height: 1.88,
//   },
//   method: "get",
// }).then((data) => {
//   console.log(data);
// });

// 如果一个事件依赖多个请求，那么我们需要等所有请求结束之后才能开始这个事件
// 在promise中可以用all方法实现，而axios返回的对象其实就是一个promise，所以，axios也有all方法，用法一样
// axios
//   .all([
//     // 参数是一个数组，里面装着很多axios对象
//     axios({
//       url: "http://httpbin.org",
//       methods: "post",
//     }),
//     axios({
//       url: "http://httpbin.org",
//       methods: "get",
//     }),
//   ])
//   .then((results) => {
//     console.log(results);
//   });

// const info = {      // 这里演示一下对象的解构，其实数组也是可以解构的，但是一般数组通过遍历的方式来拿到其中的内容，不会采用解构的方式
//   name: "hsj",
//   age: 18,
//   height: 1.88,
// };
// const { name, age, height } = info;
// console.log(name);
// console.log(age);
// console.log(height);

// axios
//   .all([
//     axios({
//       url: "http://httpbin.org",
//       methods: "post",
//     }),
//     axios({
//       url: "http://httpbin.org",
//       methods: "get",
//     }),
//   ])
//   .then(
//     axios.spread((res1, res2) => {
//       // 返回的results的数量和all中定义的axios的数量是一致的
//       // 在then方法中，可以不直接写results，而是使用axios.spread方法对“返回结果数组”进行拆分，在下面的使用中就可以直接使用拆分后的结果了
//       console.log(res1);
//       console.log(res2);
//     })
//   );

// axios.defaults.baseURL = "http://httpbin.org"; // 通过axios.defaults.XX进行默认值的设置，避免代码冗余
// axios.defaults.timeout = 5000; // 毫秒为单位

// axios({
//   url: "", // 在axios.defaults.baseURL 中设置了默认的url地址，所以这里直接写后面的路径即可，因为后面没有路径所以填“”，避免冗余代码
//   methods: "get",
// }).then((result) => {
//   console.log(result);
// });

// 直接使用全局的defaults是不好的，在需要请求其他URL的数据的时候，axios还是会给我们拼接上之前设置的baseURL
// 解决办法： 通过axios.create方法生成axios实例，在每个实例里面定义baseURL和timeout这些参数，而不同的请求调用不同的实例即可
// const instance1 = axios.create({
//   baseURL: "http://httpbin.org",
//   timeout: 5000,
// });

// const instance2 = axios.create({
//   baseURL: "xxxx",
//   timeout: 3000,
// });

// 因为create返回值就是一个axios对象，所以直接在instance后面调用方法，传递参数即可
// instance1({
//   url: "/delay/3",
//   method: "post",
// }).then((res) => {
//   console.log(res);
// });

// 同时，在使用all方法的时候可以在内部使用instance代替，毕竟instance就是axios实例
// axios
//   .all([
//     instance1({
//       url: "",
//       method: "get",
//     }),
//     instance1({
//       url: "/delay/3",
//       method: "post",
//     }),
//   ])
//   .then(
//     axios.spread((result1, result2) => {
//       console.log(result1);
//       console.log(result2);
//     })
//   );

// 在实际开发过程中，为了避免第三方软件突然不进行维护等情况而不能使用，在我们的代码中不能过多的依赖第三方插件，比如axios，那么我们就需要对axios进行封装
// 封装的过程实际上就是在一个专门的地方去产生instance对象，然后在组件中只需要去导入那个对象就可以，到时候如果第三方出现问题，直接去改封装的内容就可以
import { request } from "./network/request";
request({
  url: "",
  method: "get",
  params: {
    appid: "22266748",
    appsecret: "pTIzTk6N",
    version: "v1",
    city: "武汉",
    vue: "1",
  },
}).then((result) => {
  console.log(result);
});
</script>
<style></style>
