import * as types from './mutation-types'

const actions = {
  [types.CourseCounterAdd] ({ commit }, param) {
    commit(types.CourseCounterAdd, param)
  },
  [types.CourseCounterDec] ({ commit }) {
    commit(types.CourseCounterDec)
  }
}
export {actions}
