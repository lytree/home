<template>
  <div class="custom-collapse-item">
    <div class="collapse-item-header" @click="handleClick">
      <span>{{ title }}</span>
      <div class="collapse-item-arrow" :class="{ 'arrow-rotate': isActive }">
        ▼
      </div>
    </div>
    <transition name="collapse">
      <div class="collapse-item-content" v-show="isActive">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  name: {
    type: [String, Number],
    default: ''
  }
})

const collapseContext = inject('collapseContext')

const isActive = computed(() => {
  const modelValue = collapseContext.modelValue
  if (Array.isArray(modelValue)) {
    return modelValue.includes(props.name)
  }
  return modelValue === props.name
})

const handleClick = () => {
  const { modelValue, accordion, updateModelValue } = collapseContext
  
  if (accordion) {
    updateModelValue(isActive.value ? '' : props.name)
  } else {
    if (Array.isArray(modelValue)) {
      const newValue = isActive.value
        ? modelValue.filter(item => item !== props.name)
        : [...modelValue, props.name]
      updateModelValue(newValue)
    } else {
      updateModelValue(isActive.value ? '' : props.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-collapse-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .collapse-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    span {
      font-size: 15px;
    }

    .collapse-item-arrow {
      font-size: 12px;
      transition: transform 0.3s ease;

      &.arrow-rotate {
        transform: rotate(180deg);
      }
    }
  }

  .collapse-item-content {
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.05);
  }
}

.collapse-enter-active,
.collapse-leave-active {
  transition: height 0.3s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  height: 0;
  overflow: hidden;
}
</style>