<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="text-h5 text-center">Register</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="form.name"
          label="Name"
          required
          prepend-icon="mdi-account"
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          required
          prepend-icon="mdi-email"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
          prepend-icon="mdi-lock"
        ></v-text-field>

        <v-text-field
          v-model="form.password_confirmation"
          label="Confirm Password"
          type="password"
          required
          prepend-icon="mdi-lock-check"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          color="primary"
          :loading="loading"
          class="mt-4"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link to="/login">Already have an account? Login</router-link>
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

const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await auth.register(form.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script> 