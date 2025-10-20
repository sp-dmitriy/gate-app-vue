<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-[500px] mx-auto bg-white min-h-screen">
      <QHeader />

      <!-- Статусы -->
      <div class="p-6 bg-gray-50 border-b">
        <div class="flex justify-center space-x-8">
          <QStatus 
            v-for="(item, idx) in items"
            :key="idx"
            :item="item"
          />
        </div>
      </div>

      <!-- Основной контент -->
      <div class="p-6 flex flex-col justify-center min-h-[calc(100vh-260px)]">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ statusMessage.title }}</h2>
          <p class="text-gray-600">{{ statusMessage.description }}</p>
        </div>

        <QButton :isGateOpen="isGateOpen" :disabled="isButtonDisabed" @onClick="handleGateToggle" />

        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
          {{ error }}
        </div>

      </div>
        
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import QHeader from './components/QHeader.vue'
import QButton from './components/QButton.vue'
import QStatus from './components/QStatus.vue'

import GateService from './api/services/gate.js'
import StatusService from './api/services/status.js'

const ITEM_TYPES = {
  SERVER: 'server',
  NODE: 'node'
}

const items = reactive([
  {  
    type: ITEM_TYPES.SERVER,
    title: 'Сервер',
    status: 0,
  },
  {  
    type: ITEM_TYPES.NODE,
    title: 'Узел #1',
    status: 0,
  }
])

const error = ref(null)
const isLoading = ref(false)
const isGateOpen = ref(false)
const isButtonDisabed = ref(false)

const statusMessage = computed(() => {
  if (isLoading.value) {
    return {
      title: 'Загрузка...',
      description: 'Получение статуса системы'
    }
  }
  
  return {
    title: 'Готов к работе',
    description: `Нажмите кнопку для ${isGateOpen.value ? 'закрытия' : 'открытия'}`
  }
})

const handleGateToggle = async (val) => {

  error.value = null
  try {
    isButtonDisabed.value = true
    if (val) {
      const { data } = await GateService.openGate()
      console.log(data.status)
      isGateOpen.value = !!data.status
    } else {
      const { data } = await GateService.closeGate()
      console.log(data.status)
      isGateOpen.value = !!data.status
    }

  } catch (err) {
    error.value = `Ошибка при ${isGateOpen.value ? 'открытии' : 'закрытии'} ворот: ${err.message}`
    console.error('Gate operation error:', err)
  } finally {
    isButtonDisabed.value = false
  }
}

const getStatusServer = async () => {
  try {
    const { data } = await StatusService.getStatusServer()
    const serverItem = items.find(item => item.type === ITEM_TYPES.SERVER)
    if (serverItem) {
      serverItem.status = data.code
    }
  } catch (err) {
    console.error('Server status error:', err)
    throw err
  }
}

const getStatusNode = async () => {
  try {
    const { data } = await StatusService.getStatusNode()
    const nodeItem = items.find(item => item.type === ITEM_TYPES.NODE)
    if (nodeItem) {
      nodeItem.status = data.code
    }
  } catch (err) {
    console.error('Node status error:', err)
    throw err
  }
}

const updateAllStatuses = async () => {
  error.value = null
  try {
    isLoading.value = true
    await Promise.all([
      getStatusServer(),
      getStatusNode()
    ])
  } catch (err) {
    error.value = 'Ошибка при получении статусов'
    console.error('Status update error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(async() => {
  await updateAllStatuses()
  if(items[0].status === 0) {
    console.log('wwww')
  }
})
</script>