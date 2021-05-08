import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sketches: []
  },
  mutations: {
    setSketches(state, sketches){
      state.sketches = sketches;
    }
  },
  actions: {

    async getSketches({ commit }){
      let resp = await axios.get(`/api/sketches`);
      console.log(resp) 

      commit('setSketches', resp.data)
    },

  },
  modules: {
  }
})
