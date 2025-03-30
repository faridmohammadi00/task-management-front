<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title>{{ isEditing ? 'Edit Task' : 'Create New Task' }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="form.title"
          label="Title"
          required
        ></v-text-field>

        <v-textarea
          v-model="form.description"
          label="Description"
          required
        ></v-textarea>

        <v-select
          v-model="form.status"
          :items="[
            { title: 'In Progress', value: 'in_progress' },
            { title: 'Completed', value: 'completed' }
          ]"
          label="Status"
        ></v-select>

        <v-text-field
          v-model="form.start_date"
          label="Start Date"
          type="date"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.end_date"
          label="End Date"
          type="date"
          required
        ></v-text-field>

        <v-btn
          type="submit"
          block
          color="primary"
          :loading="loading"
          class="mt-4"
        >
          {{ loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task') }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useRouter } from 'vue-router'

const props = defineProps({
  task: {
    type: Object,
    default: () => null
  }
})

const router = useRouter()
const taskStore = useTaskStore()
const loading = ref(false)
const isEditing = computed(() => !!props.task)

const form = ref({
  title: props.task?.title || '',
  description: props.task?.description || '',
  status: props.task?.status || 'in_progress',
  start_date: props.task?.start_date || '',
  end_date: props.task?.end_date || ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    if (isEditing.value) {
      await taskStore.updateTask(props.task.id, form.value)
    } else {
      await taskStore.createTask(form.value)
    }
    router.push('/dashboard')
  } catch (error) {
    console.error('Failed to save task:', error)
  } finally {
    loading.value = false
  }
}
</script> 