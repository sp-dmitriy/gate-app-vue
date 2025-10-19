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
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Готов к работе</h2>
          <p class="text-gray-600">Нажмите кнопку для открытия</p>
        </div>


       <QButton />

    
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QHeader from './components/QHeader.vue'
import QButton from './components/QButton.vue'
import QStatus from './components/QStatus.vue'

const items = ref([
  {  
    type: 'server',
    title: 'Сервер',
    status: 1,
  },
  {  
    type: 'node',
    title: 'Узел #1',
    status: 0,
  }
])


</script>