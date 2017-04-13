import * as types from '../mutation-types'
import {productsinfo} from '../../info/product/productinfo'
var inittotal = 0
const initdata = {}
productsinfo.map((key, index) => {
  inittotal += key.Quality * key.price
  initdata[key.id] = key.Quality
})
const state = {
  total: inittotal
}

// getters
const getters = {}

// actions
const actions = {
  [types.ProductQualityAdd] ({ commit }, param) {
    commit(types.ProductQualityAdd, param)
  },
  [types.ProductQualityDec] ({ commit }, param) {
    commit(types.ProductQualityDec, param)
  }
}
// mutations
const mutations = {
  [types.ProductQualityAdd] (state, num) {
    if (num.Quality >= initdata[num.id]) {
      return false
    }
    ++num.Quality
    state.total += 1 * num.price
  },
  [types.ProductQualityDec] (state, num) {
    if (num.Quality <= 0) {
      return false
    }
    --num.Quality
    state.total -= 1 * num.price
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
