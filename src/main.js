import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App).use(router)
//app.config.globalProperties.apiUrl = 'https://fragrant-frost-2657.fly.dev/api/v1';
app.config.globalProperties.apiUrl = 'http://192.168.178.58:8090/api/v1';

app.use(Toast);
app.mount('#app')