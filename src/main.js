import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import FontAwesomeIcon from './assets/fontaAwesome'

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router)

app.mount('#app')
