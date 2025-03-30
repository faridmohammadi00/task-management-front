<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          v-model="statusFilter"
          :items="[
            { title: 'All', value: '' },
            { title: 'In Progress', value: 'in_progress' },
            { title: 'Completed', value: 'completed' }
          ]"
          label="Filter by Status"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="searchQuery"
          label="Search tasks"
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <v-alert
      v-else-if="filteredTasks.length === 0"
      type="info"
      text="No tasks found"
    ></v-alert>

    <v-row v-else>
      <v-col
        v-for="task in filteredTasks"
        :key="task.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-text>
            <p>{{ task.description }}</p>
            <v-chip
              :color="task.status === 'completed' ? 'success' : 'warning'"
              class="ma-2"
            >
              {{ task.status }}
            </v-chip>
            <div class="mt-2">
              <div>Start: {{ formatDate(task.start_date) }}</div>
              <div>End: {{ formatDate(task.end_date) }}</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              @click="editTask(task)"
            >
              Edit
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              @click="confirmDelete(task.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useRouter } from 'vue-router'

const router = useRouter()
const taskStore = useTaskStore()
const statusFilter = ref('')
const searchQuery = ref('')

const filteredTasks = computed(() => {
  let tasks = taskStore.filteredTasks(statusFilter.value)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    tasks = tasks.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    )
  }
  return tasks
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const editTask = (task) => {
  router.push(`/tasks/${task.id}/edit`)
}

const confirmDelete = async (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await taskStore.deleteTask(taskId)
  }
}

onMounted(() => {
  taskStore.fetchTasks()
})
</script> 