import { defineComponent, ref, computed, onMounted, onUnmounted, useSlots } from 'vue';
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
    const slots = useSlots();
    const visible = ref(false);
    const timer = ref(null);
    
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
        class={[
          styles.elMessage, 
          `${styles[`elMessage--${props.type}`]}`,
          props.showClose ? styles.isClosable : '',
          props.plain ? styles[`elMessage--plain`] : '',
          visible.value ? styles.isVisible : ''
        ].filter(Boolean).join(' ')}
        style={messageStyle.value}
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
            <span dangerouslySetInnerHTML={{ __html: props.message }} />
          )}
          {props.showClose && (
            <i class={[styles.elMessageCloseBtn, 'el-icon-close'].join(' ')} onClick={close}>×</i>
          )}
          {props.grouping && props.repeatNum > 1 && (
            <span class={styles.elMessageGroupCount}>{props.repeatNum}</span>
          )}
        </div>
      </div>
    );
  }
});