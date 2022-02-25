import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';
import BootstrapVue3 from 'bootstrap-vue-3'
// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
createApp(App).use(store).use(router).use(BootstrapVue3).mount('#app')

