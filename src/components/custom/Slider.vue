<template>
  <div class="custom-slider">
    <div class="slider-runway" ref="runwayRef" @click="handleClick">
      <div class="slider-track" :style="{ width: `${percentage}%` }"></div>
      <div class="slider-button" :style="{ left: `${percentage}%` }" ref="buttonRef" @mousedown="startDrag"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  showTooltip: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const runwayRef = ref(null)
const buttonRef = ref(null)
const isDragging = ref(false)

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const handleClick = (event) => {
  if (isDragging.value) return
  
  const runwayRect = runwayRef.value.getBoundingClientRect()
  const clickX = event.clientX - runwayRect.left
  const newPercentage = (clickX / runwayRect.width) * 100
  const newValue = Math.round((newPercentage / 100) * (props.max - props.min) / props.step) * props.step + props.min
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const startDrag = (event) => {
  event.preventDefault()
  isDragging.value = true
  
  const handleMouseMove = (e) => {
    if (!isDragging.value) return
    
    const runwayRect = runwayRef.value.getBoundingClientRect()
    let clientX = e.clientX
    
    // 限制在跑道范围内
    if (clientX < runwayRect.left) clientX = runwayRect.left
    if (clientX > runwayRect.right) clientX = runwayRect.right
    
    const clickX = clientX - runwayRect.left
    const newPercentage = (clickX / runwayRect.width) * 100
    const newValue = Math.round((newPercentage / 100) * (props.max - props.min) / props.step) * props.step + props.min
    
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
  // 初始化滑块位置
  if (buttonRef.value) {
    buttonRef.value.style.left = `${percentage.value}%`
  }
})

onUnmounted(() => {
  // 清理事件监听器
  document.removeEventListener('mousemove', () => {})
  document.removeEventListener('mouseup', () => {})
})
</script>

<style lang="scss" scoped>
.custom-slider {
  width: 100%;
  height: 4px;
  position: relative;
  margin: 10px 0;

  .slider-runway {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  }

  .slider-track {
    height: 100%;
    background: #efefef;
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
  }

  .slider-button {
    width: 16px;
    height: 16px;
    background: #efefef;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }

    &:active {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
}
</style>