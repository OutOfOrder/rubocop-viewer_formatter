import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const state = {
  files: [],
  metadata: {},
  summary: {},
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug,
});

if (module.hot) {
  module.hot.accept([
    './getters',
    './mutations',
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      mutations: require('./mutations'),
    });
  });
}
export default store;
