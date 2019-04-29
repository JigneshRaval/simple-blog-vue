// main.ts

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import '@/assets/scss/main.scss';

// UIKIT@3.1.1
// ====================
// import '@/assets/scss/custom/style.scss';
import '@/assets/js/uikit.js';

Vue.config.productionTip = false;

// instantiate the vue instance
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
