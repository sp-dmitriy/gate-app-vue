<template>
    <button 
        class="w-full py-6 text-white rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        :class="buttonClasses"
        :disabled="disabled"
        @click="handleClick"
    >
        <div class="flex items-center justify-center space-x-3">
        <IconOpen />
        <span class="text-2xl font-bold tracking-wide">{{ isGateOpen ? 'ЗАКРЫТЬ' : 'ОТКРЫТЬ' }}</span>
        </div>
    </button>
</template>

<script setup>
import { computed } from 'vue'
import IconOpen from './icons/IconOpen.vue'
import IconClose from './icons/IconClose.vue'

const props = defineProps({
  isGateOpen: {
    type: Boolean,
    required: true,
    default: () => false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: () => false
  }
})

const emit = defineEmits(['onClick'])

const buttonClasses = computed(() => {
    return props.isGateOpen
      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
})
  
const handleClick = () => {
  if (!props.disabled) {
    emit('onClick', props.isGateOpen ? 0 : 1)
  }
}

</script>
