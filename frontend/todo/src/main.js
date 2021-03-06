// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import 'element-ui/lib/theme-default/index.css';
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueMomentJS, moment);
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  render: h => h(App),
  components: { App }
})
