import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isValid: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token && state.isValid
  },

  actions: {
    async checkToken() {
      if (!this.token) {
        this.isValid = false
        return false
      }

      try {
        await axios.get('/api/check-token')
        this.isValid = true
        return true
      } catch (error) {
        this.token = null
        this.user = null
        this.isValid = false
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        return false
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        
        // Handle the new response format
        const { user, access_token, token_type } = response.data
        
        this.user = user
        this.token = access_token
        this.isValid = true
        
        // Store token in localStorage
        localStorage.setItem('token', access_token)
        
        // Set axios default authorization header
        axios.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`
        
        return true
      } catch (error) {
        this.user = null
        this.token = null
        this.isValid = false
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        throw error
      }
    },

    async register(userData) {
      try {
        const response = await axios.post('/api/register', userData)
        this.token = response.data.token
        this.user = response.data.user
        this.isValid = true
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return true
      } catch (error) {
        throw error
      }
    },

    async logout() {
      try {
        await axios.post('/api/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        this.isValid = false
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    }
  }
}) 