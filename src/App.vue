<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在Login、Register是隐藏的 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  mounted(){
    // 派发一个 action 获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
  components: {
    Header,
    Footer,
  },
};
</script>
