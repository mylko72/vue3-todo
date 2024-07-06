import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import util from './plugins/util';
import todoData from './plugins/todoData';
import '@/assets/scss/global.css';
// import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(util);
app.use(todoData);
// app.provide('todoMode', '');

app.mount('#app');