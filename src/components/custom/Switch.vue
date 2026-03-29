<template>
  <div class="custom-switch" :class="{ 'switch-active': modelValue }" @click="handleClick">
    <div class="switch-core">
      <div class="switch-button" :class="{ 'button-active': modelValue }"></div>
      <div class="switch-icons" v-if="inlinePrompt">
        <component :is="activeIcon" v-if="activeIcon" class="switch-icon active" />
        <component :is="inactiveIcon" v-if="inactiveIcon" class="switch-icon inactive" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  activeIcon: {
    type: Object,
    default: null
  },
  inactiveIcon: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleClick = () => {
  const newValue = modelValue === props.activeValue ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style lang="scss" scoped>
.custom-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;

  .switch-core {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    transition: all 0.3s ease;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
  }

  .switch-button {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .switch-icons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
    pointer-events: none;

    .switch-icon {
      font-size: 12px;
      color: #fff;
      transition: all 0.3s ease;

      &.active {
        opacity: 0;
        transform: translateX(-10px);
      }

      &.inactive {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  &.switch-active {
    .switch-core {
      background-color: rgba(52, 199, 89, 0.8);

      &::before {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    .switch-button {
      transform: translateX(24px);
    }

    .switch-icons {
      .switch-icon {
        &.active {
          opacity: 1;
          transform: translateX(0);
        }

        &.inactive {
          opacity: 0;
          transform: translateX(10px);
        }
      }
    }
  }
}
</style>