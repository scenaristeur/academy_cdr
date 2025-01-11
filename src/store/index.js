import { createStore } from 'vuex'
import config from './modules/config'
import solid from './modules/solid'
import solid_data from './modules/solid_data'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    config,
    solid,
    solid_data,
  },
})
