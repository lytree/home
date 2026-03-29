<template>
  <div class="custom-card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  shadow: {
    type: String,
    default: 'default'
  }
})
</script>

<style lang="scss" scoped>
.custom-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .card-header {
    padding: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .card-body {
    padding: 20px;
  }
}
</style>