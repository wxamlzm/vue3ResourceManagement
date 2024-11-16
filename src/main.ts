import './assets/main.css'
// 引入全局样式
import 'ant-design-vue/dist/reset.css'; 

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 引入 ant-design-vue
import Antd from 'ant-design-vue';

const app = createApp(App)

// 使用 ant-design-vue
app.use(Antd);
app.use(createPinia())
app.use(router)

app.mount('#app')
