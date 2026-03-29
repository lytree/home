<template>
  <div class="custom-col" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  }
})

const colStyle = computed(() => {
  const width = (props.span / 24) * 100
  const marginLeft = (props.offset / 24) * 100
  return {
    width: `${width}%`,
    paddingLeft: '10px',
    paddingRight: '10px',
    marginLeft: `${marginLeft}%`,
    boxSizing: 'border-box'
  }
})
</script>

<style lang="scss" scoped>
.custom-col {
  flex-shrink: 0;
}
</style>