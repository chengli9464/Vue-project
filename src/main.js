import { createApp } from 'vue'
import pinia from '@/store/index'
import App from '@/App.vue'
import '/src/styles/index.css'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import '@/styles/element/index.scss'

const app =createApp(App)

// element plus icon图标导入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
