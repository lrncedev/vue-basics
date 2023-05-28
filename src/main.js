import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css';

import router from "./routes/index.js";

createApp(App).use(router).mount('#app')
