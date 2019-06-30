import vue from 'vue'
import Vuex from 'vuex'
import { getUser, setUser } from '../utils/auth'
vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: getUser()
  },
  mutations: {
    changeUser (state, user) {
      Object.assign(state.user, user)
      setUser(state.user)
    }
  }
})
export default store
