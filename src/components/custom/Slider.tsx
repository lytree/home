import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import styles from './Slider.module.scss';

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    showTooltip: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const runwayRef = ref(null);
    const buttonRef = ref(null);
    const isDragging = ref(false);
    
    const percentage = computed(() => {
      return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
    });
    
    const handleClick = (event) => {
      if (isDragging.value) return;
      
      const runwayRect = runwayRef.value.getBoundingClientRect();
      const clickX = event.clientX - runwayRect.left;
      const newPercentage = (clickX / runwayRect.width) * 100;
      const newValue = Math.round((newPercentage / 100) * (props.max - props.min) / props.step) * props.step + props.min;
      
      emit('update:modelValue', newValue);
      emit('change', newValue);
    };
    
    const startDrag = (event) => {
      event.preventDefault();
      isDragging.value = true;
      
      const handleMouseMove = (e) => {
        if (!isDragging.value) return;
        
        const runwayRect = runwayRef.value.getBoundingClientRect();
        let clientX = e.clientX;
        
        // 限制在跑道范围内
        if (clientX < runwayRect.left) clientX = runwayRect.left;
        if (clientX > runwayRect.right) clientX = runwayRect.right;
        
        const clickX = clientX - runwayRect.left;
        const newPercentage = (clickX / runwayRect.width) * 100;
        const newValue = Math.round((newPercentage / 100) * (props.max - props.min) / props.step) * props.step + props.min;
        
        emit('update:modelValue', newValue);
        emit('change', newValue);
      };
      
      const handleMouseUp = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    
    onMounted(() => {
      // 初始化滑块位置
      if (buttonRef.value) {
        buttonRef.value.style.left = `${percentage.value}%`;
      }
    });
    
    onUnmounted(() => {
      // 清理事件监听器
      document.removeEventListener('mousemove', () => {});
      document.removeEventListener('mouseup', () => {});
    });
    
    return () => (
      <div class={styles.customSlider}>
        <div class={[styles.sliderRunway, 'relative w-full h-full cursor-pointer'].join(' ')} ref={runwayRef} onClick={handleClick}>
          <div class={[styles.sliderTrack, 'absolute top-0 left-0 h-full'].join(' ')} style={{ width: `${percentage.value}%` }}></div>
          <div class={[styles.sliderButton, 'absolute top-1/2 -translate-y-1/2'].join(' ')} style={{ left: `${percentage.value}%` }} ref={buttonRef} onMousedown={startDrag}></div>
        </div>
      </div>
    );
  }
});