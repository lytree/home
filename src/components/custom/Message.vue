<template>
  <div 
    class="el-message" 
    :class="[
      `el-message--${type}`, 
      { 
        'is-closable': showClose,
        'el-message--plain': plain,
        'is-visible': visible
      }
    ]"
    :style="messageStyle"
  >
    <div class="el-message__content">
      <i class="el-message__icon" v-if="!icon">
        <span class="message-icon-text">{{ iconText }}</span>
      </i>
      <component :is="icon" class="el-message__icon" v-else />
      <span v-if="!dangerouslyUseHTMLString">{{ message }}</span>
      <span v-else v-html="message"></span>
      <template v-if="showClose">
        <i class="el-message__closeBtn el-icon-close" @click="close">×</i>
      </template>
      <template v-if="grouping && repeatNum > 1">
        <span class="el-message__group-count">{{ repeatNum }}</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  message: {
    type: [String, Object],
    default: ''
  },
  type: {
    type: String,
    default: 'info'
  },
  plain: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 3000
  },
  showClose: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    default: null
  },
  offset: {
    type: Number,
    default: 16
  },
  placement: {
    type: String,
    default: 'top'
  },
  grouping: {
    type: Boolean,
    default: false
  },
  repeatNum: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)
const timer = ref(null)

const iconText = computed(() => {
  const iconMap = {
    info: 'ℹ',
    success: '✓',
    warning: '!',
    error: '✗',
    primary: 'ℹ'
  }
  return iconMap[props.type] || 'ℹ'
})

const messageStyle = computed(() => {
  const style = {}
  if (props.placement === 'top') {
    style.top = `${props.offset}px`
  } else if (props.placement === 'bottom') {
    style.bottom = `${props.offset}px`
  }
  return style
})

const close = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
    if (props.onClose) {
      props.onClose()
    }
  }, 300)
}

onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    timer.value = setTimeout(() => {
      close()
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
})
</script>

<style lang="scss" scoped>
.el-message {
  padding: 12px 20px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.4) !important;
  color: #409eff !important;
  display: flex;
  align-items: center;
  z-index: 2001;
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.3s ease;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  position: relative;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  &.is-closable {
    padding-right: 30px;
  }

  &.el-message--info {
    background: rgba(0, 0, 0, 0.4) !important;
    color: #409eff !important;
  }

  &.el-message--success {
    background: rgba(0, 0, 0, 0.4) !important;
    color: #67c23a !important;
  }

  &.el-message--warning {
    background: rgba(0, 0, 0, 0.4) !important;
    color: #e6a23c !important;
  }

  &.el-message--error {
    background: rgba(0, 0, 0, 0.4) !important;
    color: #f56c6c !important;
  }

  &.el-message--primary {
    background: rgba(0, 0, 0, 0.4) !important;
    color: #909399 !important;
  }

  &.el-message--plain {
    background: rgba(0, 0, 0, 0.4) !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
    color: #303133 !important;
  }

  &.el-message--plain.el-message--info {
    color: #409eff !important;
  }

  &.el-message--plain.el-message--success {
    color: #67c23a !important;
  }

  &.el-message--plain.el-message--warning {
    color: #e6a23c !important;
  }

  &.el-message--plain.el-message--error {
    color: #f56c6c !important;
  }

  &.el-message--plain.el-message--primary {
    color: #909399 !important;
  }

  .el-message__content {
    display: flex;
    align-items: center;

    .el-message__icon {
      margin-right: 10px;
      font-size: 16px;

      .message-icon-text {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .el-message__closeBtn {
      font-size: 12px;
      opacity: 0.7;
      cursor: pointer;
      transition: opacity 0.3s;
      margin-left: 10px;

      &:hover {
        opacity: 1;
      }
    }

    .el-message__group-count {
      margin-left: 10px;
      padding: 0 6px;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>