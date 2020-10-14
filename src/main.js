import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import drag from "v-drag";
Vue.use(drag);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
