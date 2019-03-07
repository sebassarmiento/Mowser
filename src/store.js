import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_url: 'https://api.themoviedb.org/3',
    currentSearch: '',
    api_key: '27ac9e17aedf0948e23c514b81abc672',
    currentPreview: null
  },
  getters: {

  },
  mutations: {
    ADD_CURRENT_PREVIEW: (state, preview) => {
      console.log('Preview adding called', preview)
      state.currentPreview = preview
    }
  },
  actions: {

  }
})
