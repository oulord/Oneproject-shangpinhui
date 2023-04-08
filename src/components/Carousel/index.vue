<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引包
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],

  data() {
    return {};
  },

  watch: {
    list: {
      immediate: true, //立即监听：为什么watch监听不到list，因为这个数据从来没有变化过（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
      handler(newValue, oldValue) {
        // 虽然监听的数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        this.$nextTick(() => {
          //在ListContainer中使用swiper时：为什么在mounted当中是不可以的，在这里为什么可以？
          // 因为：第一次书写轮播图的时候，是在当前逐渐内部发请求，、动态渲染结构（前台至少服务器需要回来），因此在ListContainer中不能直接写
          // 现在为什么可以？因为请求父组件发的，父组件通过props传递过来的数据，而且结构都已经有了的情况下执行mounted
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
</style>