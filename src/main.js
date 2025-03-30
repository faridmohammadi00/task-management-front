import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})

// Configure axios
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.common['Accept'] = 'application/json'

// If there's a token in localStorage, add it to axios headers
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Create Pinia instance
const pinia = createPinia()

// Create app
const app = createApp(App)

// Use plugins
app.use(pinia)  // Make sure Pinia is installed before accessing stores
app.use(router)
app.use(vuetify)

// Check token validity before mounting the app
const authStore = pinia.state.value.auth
if (authStore?.token) {
  authStore.checkToken().finally(() => {
    app.mount('#app')
  })
} else {
  app.mount('#app')
}
