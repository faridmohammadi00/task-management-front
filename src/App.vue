<script setup>
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

// Use storeToRefs for reactive state
const { isAuthenticated, user } = storeToRefs(authStore)

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-title>Task Management</v-app-bar-title>
        <v-spacer></v-spacer>
        <template v-if="isAuthenticated">
          <v-btn to="/dashboard" text>
            <v-icon start>mdi-view-dashboard</v-icon>
            Dashboard
          </v-btn>
          <v-btn to="/tasks/new" text>
            <v-icon start>mdi-plus</v-icon>
            New Task
          </v-btn>
          
          <!-- User Info Menu -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" text>
                <v-icon start>mdi-account</v-icon>
                {{ user?.name }}
                <v-icon end>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-icon start>mdi-email</v-icon>
                  {{ user?.email }}
                </v-list-item-title>
              </v-list-item>
              
              <v-divider></v-divider>
              
              <v-list-item @click="logout">
                <v-list-item-title class="text-error">
                  <v-icon start color="error">mdi-logout</v-icon>
                  Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}

.v-list-item__title {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
