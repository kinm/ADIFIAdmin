export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    SETLIST(state, value) {
      state.list = value
    }
  }
}
