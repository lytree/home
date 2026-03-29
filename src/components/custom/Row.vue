<template>
  <div class="custom-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  gutter: {
    type: Number,
    default: 0
  }
})

const rowStyle = computed(() => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: `-${props.gutter / 2}px`,
    marginRight: `-${props.gutter / 2}px`
  }
})
</script>

<style lang="scss" scoped>
.custom-row {
  width: 100%;
}
</style>