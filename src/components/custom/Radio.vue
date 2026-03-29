<template>
  <label class="custom-radio" :class="[`radio-${size}`, { 'radio-checked': isChecked, 'radio-bordered': border }]">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="handleChange"
      class="radio-input"
    />
    <span class="radio-inner"></span>
    <span class="radio-label" v-if="$slots.default">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    default: ''
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  border: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'default'
  }
})

const radioGroupContext = inject('radioGroupContext', null)

const isChecked = computed(() => {
  if (radioGroupContext) {
    return radioGroupContext.modelValue === props.value
  }
  return false
})

const size = computed(() => {
  if (radioGroupContext) {
    return radioGroupContext.size
  }
  return props.size
})

const name = computed(() => {
  return `radio-${Date.now()}`
})

const handleChange = (event) => {
  if (radioGroupContext) {
    radioGroupContext.updateModelValue(props.value)
  }
}
</script>

<style lang="scss" scoped>
.custom-radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;

  &.radio-bordered {
    padding: 8px 16px;
    border: 2px solid transparent;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &.radio-checked {
      border-color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .radio-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .radio-inner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    margin-right: 8px;
    position: relative;
    transition: all 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.3s ease;
    }
  }

  .radio-label {
    color: #fff;
    font-size: 14px;
  }

  &.radio-checked {
    .radio-inner {
      border-color: #fff;

      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  &.radio-large {
    .radio-inner {
      width: 20px;
      height: 20px;

      &::after {
        width: 10px;
        height: 10px;
      }
    }

    .radio-label {
      font-size: 16px;
    }
  }

  &.radio-small {
    .radio-inner {
      width: 14px;
      height: 14px;

      &::after {
        width: 6px;
        height: 6px;
      }
    }

    .radio-label {
      font-size: 12px;
    }
  }
}
</style>