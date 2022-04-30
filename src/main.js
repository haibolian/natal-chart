import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'

import install from './useVant'


const app = createApp(App)

app.use(router)

app.mount('#app')

install.call(app)
