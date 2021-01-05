<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      message: "",
      isShow: false,
    }
  },

  methods: {

    show(message="默认信息",time=2000) {
      this.message = message;
      this.isShow = true;

      setTimeout( () => {
        this.isShow = false
        this.message = ''
      },time)

     
    }
  },
}
</script>

<style>
 .toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%,-50%);    /* 这里的百分比是以本元素的大小，不是父元素的大小为基准 */
  z-index: 999;

  border-radius: 20px;
  background-color: rgba(0, 0, 0, .75);
  color: #fff;
 }
</style>