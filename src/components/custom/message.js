import { createApp } from 'vue'
import Message from './Message.vue'
import './message.css'

// 消息实例列表
const instances = []
// 消息计数
let seed = 1

// 关闭所有消息
const closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

// 创建消息实例
const createMessage = (options) => {
  // 处理字符串参数
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  // 合并默认配置
  const defaultOptions = {
    duration: 3000,
    type: 'info',
    showClose: false,
    offset: 16,
    placement: 'top',
    grouping: false
  }

  const opts = { ...defaultOptions, ...options }
  const id = `message_${seed++}`

  // 计算偏移量
  let verticalOffset = opts.offset
  instances.forEach(instance => {
    verticalOffset += instance.$el.offsetHeight + 16
  })

  // 创建容器
  const container = document.createElement('div')
  container.className = `el-message-container el-message-container--${opts.placement}`
  container.style.zIndex = 2001
  document.body.appendChild(container)

  // 创建应用实例
  const app = createApp(Message, {
    ...opts,
    id,
    offset: verticalOffset,
    onClose: () => {
      // 从实例列表中移除
      const index = instances.findIndex(instance => instance.id === id)
      if (index !== -1) {
        instances.splice(index, 1)
      }
      // 重新计算其他消息的偏移量
      const removedHeight = container.offsetHeight
      instances.forEach((instance, i) => {
        if (i >= index) {
          const el = instance.$el
          el.style.top = `${parseInt(el.style.top) - removedHeight - 16}px`
        }
      })
      // 调用用户自定义的关闭回调
      if (opts.onClose) {
        opts.onClose()
      }
      // 清理DOM
      setTimeout(() => {
        app.unmount()
        document.body.removeChild(container)
      }, 300)
    }
  })

  const instance = app.mount(container)
  instance.id = id
  instance.$el.style.zIndex = 2001
  instance.$el.classList.add('is-visible')
  instances.push(instance)

  // 暴露关闭方法
  instance.close = () => {
    instance.visible = false
  }

  return instance
}

// 主方法
const message = (options) => {
  return createMessage(options)
}

// 各种类型的快捷方法
message.info = (message, options = {}) => {
  return createMessage({ ...options, message, type: 'info' })
}

message.success = (message, options = {}) => {
  return createMessage({ ...options, message, type: 'success' })
}

message.warning = (message, options = {}) => {
  return createMessage({ ...options, message, type: 'warning' })
}

message.error = (message, options = {}) => {
  return createMessage({ ...options, message, type: 'error' })
}

message.primary = (message, options = {}) => {
  return createMessage({ ...options, message, type: 'primary' })
}

// 关闭所有消息的方法
message.closeAll = closeAll

export default message