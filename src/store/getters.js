const getters = {
  overcount (state) {
    return state.addnum
  },
  dbcount (state) {
    return state.addnum * 2
  }
}
export {getters}
