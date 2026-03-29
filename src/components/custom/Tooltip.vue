<template>
  <div class="custom-tooltip-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <div class="tooltip-trigger">
      <slot></slot>
    </div>
    <div class="custom-tooltip" :class="[`tooltip-${placement}`, { 'tooltip-show': visible }]">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  placement: {
    type: String,
    default: 'top'
  },
  showArrow: {
    type: Boolean,
    default: true
  }
})

const visible = ref(false)

const showTooltip = () => {
  visible.value = true
}

const hideTooltip = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.custom-tooltip-container {
  position: relative;
  display: inline-block;
}

.custom-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 9999;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  white-space: nowrap;

  &.tooltip-show {
    opacity: 1;
    transform: translateY(0);
  }

  &.tooltip-top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);

    &.tooltip-show {
      transform: translateX(-50%) translateY(0);
    }

    .tooltip-arrow {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top: 6px solid rgba(0, 0, 0, 0.8);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
  }

  &.tooltip-bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);

    &.tooltip-show {
      transform: translateX(-50%) translateY(0);
    }

    .tooltip-arrow {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: 6px solid rgba(0, 0, 0, 0.8);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
  }

  &.tooltip-left {
    right: 100%;
    top: 50%;
    transform: translateX(10px) translateY(-50%);

    &.tooltip-show {
      transform: translateX(0) translateY(-50%);
    }

    .tooltip-arrow {
      top: 50%;
      right: -12px;
      transform: translateY(-50%);
      border-left: 6px solid rgba(0, 0, 0, 0.8);
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }

  &.tooltip-right {
    left: 100%;
    top: 50%;
    transform: translateX(-10px) translateY(-50%);

    &.tooltip-show {
      transform: translateX(0) translateY(-50%);
    }

    .tooltip-arrow {
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      border-right: 6px solid rgba(0, 0, 0, 0.8);
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }

  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
  }

  .tooltip-content {
    padding: 4px 8px;
  }
}
</style>