import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from "./store"
// import 'element-plus/dist/index.css'

console.debug('Build: 2022-02-21 13:37')
console.debug('Info : add partial export')

createApp(App)
    .use(store, key)
    .mount('#app')
