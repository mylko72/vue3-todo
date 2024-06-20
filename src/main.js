import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import util from './plugins/util';
import todo from './plugins/todo';
import '@/assets/scss/global.css';
// import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(util);
app.use(todo);

app.mount('#app');
