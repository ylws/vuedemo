import Vue from 'vue'
import Vuex from 'vuex'
import {state} from './state'
Vue.use(Vuex)
import {CourseCounterAdd, CourseCounterDec} from './mutation-types'
export default new Vuex.Store({
  state,
  getters: {
    overcount (state) {
      return state.addnum
    },
    dbcount (state, overcount) {
      return state.addnum * 2
    }
  },
  mutations: {
    [CourseCounterAdd] (state, num) {
      state.count += num.num
      state.addnum ++
    },
    [CourseCounterDec] (state) {
      state.count --
    }
  },
  actions: {
    [CourseCounterAdd] ({ commit }, param) {
      commit(CourseCounterAdd, param)
    },
    [CourseCounterDec] ({ commit }) {
      commit(CourseCounterDec)
    }
  }
})
