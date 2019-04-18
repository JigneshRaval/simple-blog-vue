import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

/* new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app'); */

// instatinat the vue instance
new Vue({
  // define the selector for the root component
  el: '#app',
  // pass the template to the root component
  template: '<App/>',
  // declare components that the root component can access
  components: { App },
  // pass in the router to the Vue instance
  router,
  store,
  render: (h) => h(App),
}).$mount('#app'); // mount the router on the app
