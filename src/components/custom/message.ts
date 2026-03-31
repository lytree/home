import { createApp, App, VNode, ComponentPublicInstance } from 'vue'
import Message from './Message.vue'
import './message.css'

type MessageType = 'info' | 'success' | 'warning' | 'error' | 'primary'
type MessagePlacement = 'top' | 'bottom'

export interface MessageOptions {
  message: string | VNode
  type?: MessageType
  duration?: number
  showClose?: boolean
  offset?: number
  placement?: MessagePlacement
  grouping?: boolean
  onClose?: () => void
}

// Vue 实例类型
type MessageInstance = ComponentPublicInstance<{
  visible: boolean
  message: string | VNode
  repeatNum?: number
}> & {
  id: string
  $el: HTMLElement
  close: () => void
}

let seed = 1
const instances: MessageInstance[] = []

// 单例容器
let container: HTMLElement | null = null

const getContainer = (): HTMLElement => {
  if (!container) {
    container = document.createElement('div')
    container.className = 'el-message-wrapper'
    document.body.appendChild(container)
  }
  return container
}

// 关闭全部
const closeAll = (): void => {
  instances.forEach(i => i.close())
}

// 创建消息
const createMessage = (options: string | MessageOptions): MessageInstance => {
  if (typeof options === 'string') {
    options = { message: options }
  }

  const defaultOptions: Required<Omit<MessageOptions, 'message'>> = {
    duration: 3000,
    type: 'info',
    showClose: false,
    offset: 16,
    placement: 'top',
    grouping: false,
    onClose: () => {}
  }

  const opts: MessageOptions = {
    ...defaultOptions,
    ...options
  }

  const id = `message_${seed++}`

  // grouping
  if (opts.grouping) {
    const existing = instances.find(i => i.message === opts.message)
    if (existing) {
      existing.repeatNum = (existing.repeatNum || 1) + 1
      return existing
    }
  }

  const wrap = document.createElement('div')

  let instance: MessageInstance

  const app: App = createApp(Message, {
    ...opts,
    id,
    onClose: () => {
      const index = instances.findIndex(i => i.id === id)
      if (index === -1) return

      const removed = instances[index]
      const height = removed.$el.offsetHeight

      instances.splice(index, 1)

      // 更新位置
      for (let i = index; i < instances.length; i++) {
        const el = instances[i].$el
        const top = parseInt(el.style.top, 10)
        el.style.top = `${top - height - 16}px`
      }

      opts.onClose?.()

      setTimeout(() => {
        app.unmount()
        wrap.remove()
      }, 300)
    }
  })

  instance = app.mount(wrap) as MessageInstance

  getContainer().appendChild(wrap)

  // 等 DOM 渲染后计算位置
  requestAnimationFrame(() => {
    let offset = opts.offset || 16

    instances.forEach(i => {
      offset += i.$el.offsetHeight + 16
    })

    if (opts.placement === 'top') {
      instance.$el.style.top = `${offset}px`
    } else {
      instance.$el.style.bottom = `${offset}px`
    }
  })

  instance.id = id
  instance.close = () => {
    instance.visible = false
  }

  instances.push(instance)

  return instance
}

// 主函数类型
interface MessageFn {
  (options: string | MessageOptions): MessageInstance
  info: (msg: string | VNode, options?: MessageOptions) => MessageInstance
  success: (msg: string | VNode, options?: MessageOptions) => MessageInstance
  warning: (msg: string | VNode, options?: MessageOptions) => MessageInstance
  error: (msg: string | VNode, options?: MessageOptions) => MessageInstance
  primary: (msg: string | VNode, options?: MessageOptions) => MessageInstance
  closeAll: () => void
}

const message = ((options: string | MessageOptions) => {
  return createMessage(options)
}) as MessageFn

// 快捷方法
;(['info', 'success', 'warning', 'error', 'primary'] as MessageType[]).forEach(type => {
  message[type] = (msg, options = {}) =>
    createMessage({
      ...options,
      message: msg,
      type
    })
})

// 挂载方法
message.closeAll = closeAll

export default message