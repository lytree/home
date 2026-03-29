<template>
  <div class="custom-progress">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${percentage}%` }"></div>
      <div v-if="textInside" class="progress-text">
        {{ percentage }}%
      </div>
    </div>
    <div v-if="!textInside" class="progress-text">
      {{ percentage }}%
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator: (value) => {
      return value >= 0 && value <= 100
    }
  },
  textInside: {
    type: Boolean,
    default: false
  },
  strokeWidth: {
    type: Number,
    default: 10
  }
})
</script>

<style lang="scss" scoped>
.custom-progress {
  width: 100%;
  display: flex;
  align-items: center;

  .progress-bar {
    flex: 1;
    height: v-bind('strokeWidth + "px"');
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    .progress-fill {
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      transition: width 0.3s ease;
    }

    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      font-weight: bold;
      color: #000;
    }
  }

  .progress-text {
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }
}
</style>