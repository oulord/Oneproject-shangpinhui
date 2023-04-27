import Vue from 'vue'
import App from './App.vue'

// 引入三级联动组件----注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字 第二个参数：那一个组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

// 引入路由
import router from './router'

// 引入仓库
import store from './store'

// 测试接口
import { reqCategoryList, reqGetSearchInfo } from '@/api';
reqCategoryList();
// console.log(reqGetSearchInfo({}));


// 引入MockServer.js-----mock数据
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // 注册路由信息：当这里书写router的时候，组件身上都拥有 $route,$routers属性
  router,
  // 注册仓库：组件实例的身上会多了一个属性，$store
  store
}).$mount('#app')
