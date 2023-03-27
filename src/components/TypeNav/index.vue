<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 运用了事件委派：将 .all 和 .sort 的事件委派给了父亲 div -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派 + 编程式导航 实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-CategoryName="c1.categoryName"
                    :data-Category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级，三级分类，使用JS对二三级分类进行显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-CategoryName="c2.categoryName"
                          :data-Category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-CategoryName="c3.categoryName"
                            :data-Category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 这种引入方式：是把 lodash 全部功能函数引入
// import _ from "lodash";
// 进行优化：按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",

  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },

  // 组件挂载完毕：可以向服务器发送请求
  mounted() {
    // 通知vuex发送请求，获取数据，存储于仓库中
    // 添加命名空间写法： this.$store.dispatch("home/categoryList");
    this.$store.dispatch("categoryList");
    // console.log(this.$store.state.home.categoryList);

    // 当组件挂载完毕，让show属性变为false
    // 如果不是Home组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },

  methods: {
    // 鼠标进入修改响应式数据 currentIndex 属性
    // changeIndex(index) {
    //   // index：鼠标移上某一个一级分类的元素的索引值
    //   // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //   // 非正常情况（用户操作很快）：本身全部的一级分类都应给触发鼠标进入，但是经过测试，只有部分h3触发了
    //   // 就是由于用户的行为过快，导致浏览器反应不过来，如果当前回调函数中有一个大量业务，有可能出现卡顿现象
    //   this.currentIndex = index;
    // },
    // 别使用箭头函数，否则 this 会丢失 https://blog.csdn.net/qq_40988677/article/details/121421615
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 一级分类鼠标移除的事件回调
    leaveIndex() {
      // 鼠标移除 currentIndex，变回 -1
      this.currentIndex = -1;
    },

    // 进行路由跳转的方法
    // 最好的解决方案：编程式导航 + 事件委派
    // 利用事件委派存在一些问题：1、是把全部的子节点 【h3、dt、dl、em】的事件委派给父节点，但是点击a标签的时候，才回进行路由跳转
    // 怎么能确定点击的一定是a标签？即使能确定点击的是a标签，如何区分是一级、二级、三级分类的标签？
    goSearch(event) {
      // this.$router.push('/search')
      // 解决第一个问题方案：把子节点当中的 a 标签，加上自定义属性 data-categoryName，其余的子节点不加
      let element = event.target;
      // 获取到当前触发的这个事件的节点【h3、a、dt、dl】，需要带有 data-categoryname 这样的节点（一定是a标签）
      // console.log(element);
      // 节点有一个属性 dataset 属性，可以获取节点的自定义属性与属性值
      // console.log(element.dataset);
      // {v-18b3c0cc: '', categoryname: '图书、音像、电子书刊', category1id: '1'}
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 进行判断：如果标签身上拥有 categoryname 属性一定是a标签
      if (categoryname) {
        // 如何判断是一级分类、二级分类、三级分类？再添加一个自定义属性进行判断
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 整理完参数
        location.query = query;
        // console.log(query);
        // 路由跳转
        this.$router.push(location);
      }
    },

    // 当鼠标移入的时候，让商品列表进行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    // 当鼠标离开的时候，让商品分类列表进行隐藏
    leaveShow() {
      if (this.$route.path != "/home") {
        this.currentIndex = -1;
        this.show = false;
      }
    },
  },

  computed: {
    // 添加命名空间写法： ...mapState('home',['categoryList']

    // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    // 注入一个参数state，其实即为大仓库中的数据
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to{
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active{
      transition:all .5s linear
    }
  }
}
</style>