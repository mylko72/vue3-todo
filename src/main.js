import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import util from './plugins/util';
import '@/assets/scss/global.css';
// import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(util);

app.mount('#app')
