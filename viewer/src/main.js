import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

if (window.RUBOCOP_DATA) {
  app.$store.commit('LOAD_JSON', window.RUBOCOP_DATA);
}