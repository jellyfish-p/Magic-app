import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// element plus
import 'element-plus/dist/index.css'

createApp(App).use(router).mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
