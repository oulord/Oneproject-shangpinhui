// 先引入 mockjs 模块
import Mock from "mockjs";
// 把虚拟JSON数据格式引入【JSON数据格式是没有对外暴露的，却可以引入】
// webpack中有些文件是默认对外暴露的：图片、JSON格式
import banner from './banner.json'
import floor from './floor'

// mock数据：第一个参数：请求地址  第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })  //模拟首页大的轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor })