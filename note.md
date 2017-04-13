#install:

$ npm install -g vue-cli
$ vue init webpack-simple my-project
$ cd my-project
$ npm install
$ npm run dev

#Q: #

new vueRouter({mode:'history'})

#Q: 指定a链接 

new vueRouter({linkActiveClass: 'active'})

#Q:点击路由高亮 exact

<router-link :to="{name:'Home'}" exact>首页</router-link>

#Q:export import 参数需要加{}

export {defaultconfig}
import {defaultconfig} from './winconfig.js'

#Q:vuex .vue

#src目录下新建store目录
#新建index.js
#导出vuex
--
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    addnum: 0
  },
  mutations: {
    add (state, num) {
      state.count += num
      state.addnum ++
    },
    dec (state) {
      state.count --
    }
  }
})


#main。js引入store变量，放入new vue

import Vue from 'vue'
import store from './store/index.js'
import App from './App'
import router from './router'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

#home。vue文件书写点击事件

  #多文件响应，引入mapstate
  import { mapState } from 'vuex'
  methods: {
    add () {
      this.$store.commit('add', 10)//调用this.$store触发事件
    },
    dec () {
      this.$store.commit('dec')
    }
  },
  computed: mapState({//多变量导入
    count () {
      return this.$store.state.count//回调计算
    },
    addnum () {
      return this.$store.state.addnum
    }
  })

#Q:VUEX getters  store的计算属性，用于。vue方法中couputed方法的引用
##index.js
getters: {
    overcount (state) {
      return state.addnum
    },
    dbcount (state, overcount) {
      return state.addnum * 2
    }
  },
##home.vue
computed: mapState({
    count () {
      return this.$store.state.count
    },
    addnum () {
      return this.$store.state.addnum
    },
    overcount () {
      return this.$store.getters.overcount
    },
    dbcount () {
      return this.$store.getters.dbcount
    }
  })
  


axios/ajax


