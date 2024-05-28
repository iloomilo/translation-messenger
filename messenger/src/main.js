import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);
app.mount('#app')
