import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// createApp(App).use(router).mount('#app')

// vue.prototype.$axios = axios;   // global Var : this.$axios

import vuetify from './plugins/vuetify'
import store from './plugins/store'

import axios from './plugins/axios'


const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(vuetify);
app.use(store);



app.mount('#app');


