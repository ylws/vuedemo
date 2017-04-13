import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Home from '@/components/home/home'
import Course from '@/components/course/course'
import Product from '@/components/product/product'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/course',
      name: 'Course',
      component: Course
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    }
  ]
})
