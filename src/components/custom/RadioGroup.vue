<template>
  <div class="custom-radio-group">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String,
    default: 'default'
  },
  textColor: {
    type: String,
    default: '#fff'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const updateModelValue = (value) => {
  emit('update:modelValue', value)
  emit('change', value)
}

provide('radioGroupContext', {
  modelValue: props.modelValue,
  size: props.size,
  textColor: props.textColor,
  updateModelValue
})
</script>

<style lang="scss" scoped>
.custom-radio-group {
  display: flex;
  flex-wrap: wrap;
}
</style>