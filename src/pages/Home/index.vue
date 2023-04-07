<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- floorList 是一个数组，里面有两个对象 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },

  data() {
    return {};
  },

  mounted() {
    //派发floor组件的action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },

  computed:{
    ...mapState({
        floorList:state=>state.home.floorList
    })
  },

  methods: {},
};
</script>

<style lang="less" scoped>
</style>