<template>
    <div class="flex flex-col items-center">
        <div class="relative">
            <div  v-if="item.type === 'server'" class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shadow-md">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
            </div>
            <div v-else  class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            </div>
            <!-- Индикатор онлайн -->
            <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white" :class="statusBg"></div>
        </div>
        <span class="text-sm font-medium text-gray-700 mt-2">{{ item.title }}</span>
        <span class="text-xs font-semibold" :class="statusColor">{{ statusTitle }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  item: {
    type: Array,
    required: true,
    default: () => []
  }
})
const statusBg = computed(() => props.item.status ? 'bg-green-500' : 'bg-red-500')
const statusColor = computed(() => props.item.status ? 'text-green-600' : 'text-red-600')
const statusTitle = computed(() => props.item.status ? 'Активен' : 'Неактивен')
</script>