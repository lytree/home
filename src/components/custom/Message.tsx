import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@/utils/cn';
import styles from './Message.module.scss';

export default defineComponent({
  props: {
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
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(false);
    const timer = ref<any>(null);

    const iconText = computed(() => {
      const iconMap = {
        info: 'ℹ',
        success: '✓',
        warning: '!',
        error: '✗',
        primary: 'ℹ'
      };
      return iconMap[props.type] || 'ℹ';
    });

    const messageStyle = computed(() => {
      const style = {};
      if (props.placement === 'top') {
        style.top = `${props.offset}px`;
      } else if (props.placement === 'bottom') {
        style.bottom = `${props.offset}px`;
      }
      return style;
    });

    const close = () => {
      visible.value = false;
      setTimeout(() => {
        emit('close');
        if (props.onClose) {
          props.onClose();
        }
      }, 300);
    };

    onMounted(() => {
      visible.value = true;
      if (props.duration > 0) {
        timer.value = setTimeout(() => {
          close();
        }, props.duration);
      }
    });

    onUnmounted(() => {
      if (timer.value) {
        clearTimeout(timer.value);
      }
    });

    return () => (
      <div
        class={cn(
          styles.elMessage,
          styles[`elMessage--${props.type}`],
          props.showClose && styles.isClosable,
          props.plain && styles[`elMessage--plain`],
          visible.value && styles.isVisible
        )}
        style={Object.assign({}, messageStyle.value, { position: 'fixed', left: '50%', transform: 'translateX(-50%)' })}
      >
        <div class={styles.elMessageContent}>
          {!props.icon ? (
            <i class={styles.elMessageIcon}>
              <span class={styles.messageIconText}>{iconText.value}</span>
            </i>
          ) : (
            <component is={props.icon} class={styles.elMessageIcon} />
          )}
          {!props.dangerouslyUseHTMLString ? (
            <span>{props.message}</span>
          ) : (
            <span innerHTML={props.message} />
          )}
          {props.showClose && (
            <i class={cn(styles.elMessageCloseBtn, 'el-icon-close')} onClick={close}>×</i>
          )}
          {props.grouping && props.repeatNum > 1 && (
            <span class={styles.elMessageGroupCount}>{props.repeatNum}</span>
          )}
        </div>
      </div>
    );
  }
});