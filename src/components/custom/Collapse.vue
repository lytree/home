<template>
  <div class="custom-collapse">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
  accordion: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value) => {
  emit('update:modelValue', value)
}

provide('collapseContext', {
  modelValue: props.modelValue,
  accordion: props.accordion,
  updateModelValue
})
</script>

<style lang="scss" scoped>
.custom-collapse {
  border-radius: 8px;
  overflow: hidden;
}
</style>