import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  content: {
    offsetTop: null,
    threshold: null,
  },
  sections: [],
  chapters: {},
  sub_chapters: {},
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
})
