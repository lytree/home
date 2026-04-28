import { defineComponent, computed, useSlots } from 'vue';

export default defineComponent({
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const slots = useSlots();
    
    const colStyle = computed(() => {
      const width = (props.span / 24) * 100;
      const marginLeft = (props.offset / 24) * 100;
      return {
        width: `${width}%`,
        paddingLeft: '10px',
        paddingRight: '10px',
        marginLeft: `${marginLeft}%`,
        boxSizing: 'border-box'
      };
    });
    
    return () => (
      <div class="shrink-0" style={colStyle.value}>
        {slots.default && slots.default()}
      </div>
    );
  }
});