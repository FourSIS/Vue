<template>
  <div id="category">
    <button class="btn">按钮</button>
    <div class="wrapper">
      <ul class="content">
        <button class="btn">按钮</button>
        <li>分类列表1</li>
        <li>分类列表2</li>
        <li>分类列表3</li>
        <li>分类列表4</li>
        <li>分类列表5</li>
        <li>分类列表6</li>
        <li>分类列表7</li>
        <li>分类列表8</li>
        <li>分类列表9</li>
        <li>分类列表10</li>
        <li>分类列表11</li>
        <li>分类列表12</li>
        <li>分类列表13</li>
        <li>分类列表14</li>
        <li>分类列表15</li>
        <li>分类列表16</li>
        <li>分类列表17</li>
        <li>分类列表18</li>
        <li>分类列表19</li>
        <li>分类列表20</li>
        <li>分类列表21</li>
        <li>分类列表22</li>
        <li>分类列表23</li>
        <li>分类列表24</li>
        <li>分类列表25</li>
        <li>分类列表26</li>
        <li>分类列表27</li>
        <li>分类列表28</li>
        <li>分类列表29</li>
        <li>分类列表30</li>
        <li>分类列表31</li>
        <li>分类列表32</li>
        <li>分类列表33</li>
        <li>分类列表34</li>
        <li>分类列表35</li>
        <li>分类列表36</li>
        <li>分类列表37</li>
        <li>分类列表38</li>
        <li>分类列表39</li>
        <li>分类列表40</li>
        <li>分类列表41</li>
        <li>分类列表42</li>
        <li>分类列表43</li>
        <li>分类列表44</li>
        <li>分类列表45</li>
        <li>分类列表46</li>
        <li>分类列表47</li>
        <li>分类列表48</li>
        <li>分类列表49</li>
        <li>分类列表50</li>
        <li>分类列表51</li>
        <li>分类列表52</li>
        <li>分类列表53</li>
        <li>分类列表54</li>
        <li>分类列表55</li>
        <li>分类列表56</li>
        <li>分类列表57</li>
        <li>分类列表58</li>
        <li>分类列表59</li>
        <li>分类列表60</li>
        <li>分类列表61</li>
        <li>分类列表62</li>
        <li>分类列表63</li>
        <li>分类列表64</li>
        <li>分类列表65</li>
        <li>分类列表66</li>
        <li>分类列表67</li>
        <li>分类列表68</li>
        <li>分类列表69</li>
        <li>分类列表70</li>
        <li>分类列表71</li>
        <li>分类列表72</li>
        <li>分类列表73</li>
        <li>分类列表74</li>
        <li>分类列表75</li>
        <li>分类列表76</li>
        <li>分类列表77</li>
        <li>分类列表78</li>
        <li>分类列表79</li>
        <li>分类列表80</li>
        <li>分类列表81</li>
        <li>分类列表82</li>
        <li>分类列表83</li>
        <li>分类列表84</li>
        <li>分类列表85</li>
        <li>分类列表86</li>
        <li>分类列表87</li>
        <li>分类列表88</li>
        <li>分类列表89</li>
        <li>分类列表90</li>
        <li>分类列表91</li>
        <li>分类列表92</li>
        <li>分类列表93</li>
        <li>分类列表94</li>
        <li>分类列表95</li>
        <li>分类列表96</li>
        <li>分类列表97</li>
        <li>分类列表98</li>
        <li>分类列表99</li>
        <li>分类列表100</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"; // BS在顺滑滚动的同时还提供了弹簧效果

export default {
  // created() {      // 翻车现场： created函数是"组件创建好了"之后的回调，但是这个时候并没有形成dom，所以这里找".wrapper"是无效的
  //   new BScroll(".wrapper", {});
  // },

  mounted() {
    // BS正确使用的位置应该是在mounted中，这里面所有的class，div各种dom都已经存在了
    // probeType参数值为0和1的时候表示"不侦查"
    // 参数值为2的时候表示"只侦查按住的滑动，不侦查惯性滑动"
    // 参数值为3的时候表示"既侦查按住的滑动，也侦查惯性滑动"
    const scroll = new BScroll(".wrapper", {
      probeType: 3, // probe：侦查
      click: true, // 在better-scroll中，默认click是false，在bs范围内是监听不到点击事件的
      pullUpLoad: true,
    });

    // 调用BScroll的on方法，进行scroll的监听，这里的第一个字符串是监听的方法的名称，官方已经规定好，可以去官网看文档
    // scroll.on("scroll", (position) => {
    //   console.log(position);
    // });

    // document.querySelector(".btn").addEventListener("click", function () {
    //   // 原生js监听按钮点击事件
    //   console.log("------------");
    // });

    scroll.on("pullingUp", () => {
      console.log("下拉加载更多"); // 这里可以出发"下拉加载更多"，但是只能触发一次

      setTimeout(() => {
        scroll.finishPullUp(); // 调用pullup完成函数，之后才能再次触发新的"下拉加载更多"
      }, 1000);
    });
  },
};
</script>

<style scoped>
/* 
使用原生css实现局部滚动，首先必须有确定的高度，其次需要将y轴设置成滚动，那么overflow的部分会自动hidden
.content {
  height: 200px;
  background-color: red;

  overflow-y: scroll;
} */

.wrapper {
  height: 200px;
  background-color: red;

  overflow: hidden;
}
</style>
