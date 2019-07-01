import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    files: [],
    metadata: {},
    summary: {},
  },
  getters: {
    cops(state) {
      let cops = {};
      state.files.forEach((f, idx) => {
        f.offenses.forEach((o) => {
          if (!(o.cop_name in cops)) cops[o.cop_name] = [];
          cops[o.cop_name].push({row: idx, path: f.path});
        });
      });
      return cops;
    }
  },
  mutations: {
    LOAD_JSON(state, data) {
      state.summary = data.summary;
      state.metadata = data.metadata;
      state.files = data.files.filter((f) => f.offenses.length > 0);
    }
  },
  actions: {}
});
