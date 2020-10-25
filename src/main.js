import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Mindmap from 'vue-mindmap';

import 'vue-mindmap/dist/vue-mindmap.css'

Vue.use(Mindmap)

import drag from "v-drag";
Vue.use(drag);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
