import * as types from './mutation-types'
const mutations = {
  [types.CourseCounterAdd] (state, num) {
    console.log(num)
    state.count += num.num
    state.addnum ++
  },
  [types.CourseCounterDec] (state) {
    state.count --
  }
}
export { mutations }
