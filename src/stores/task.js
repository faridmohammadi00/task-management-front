import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await axios.get('/api/tasks')
        this.tasks = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createTask(taskData) {
      try {
        const response = await axios.post('/api/tasks', taskData)
        this.tasks.push(response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async updateTask(taskId, taskData) {
      try {
        const response = await axios.put(`/api/tasks/${taskId}`, taskData)
        const index = this.tasks.findIndex(task => task.id === taskId)
        if (index !== -1) {
          this.tasks[index] = response.data
        }
        return response.data
      } catch (error) {
        throw error
      }
    },

    async deleteTask(taskId) {
      try {
        await axios.delete(`/api/tasks/${taskId}`)
        this.tasks = this.tasks.filter(task => task.id !== taskId)
      } catch (error) {
        throw error
      }
    }
  },

  getters: {
    filteredTasks: (state) => (status = null) => {
      if (!status) return state.tasks
      return state.tasks.filter(task => task.status === status)
    }
  }
}) 