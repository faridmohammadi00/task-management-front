<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="text-h5 text-center">Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          required
          prepend-icon="mdi-email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          prepend-icon="mdi-lock"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          color="primary"
          :loading="loading"
          class="mt-4"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link to="/register">Don't have an account? Register</router-link>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    const credentials = {
      email: email.value,
      password: password.value
    }
    await auth.login(credentials)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    // You might want to show an error message to the user here
  } finally {
    loading.value = false
  }
}
</script> 