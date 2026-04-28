import { defineComponent, computed, useSlots } from 'vue';

export default defineComponent({
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const slots = useSlots();

    const rowStyle = computed(() => {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: `-${props.gutter / 2}px`,
        marginRight: `-${props.gutter / 2}px`
      };
    });

    return () => (
      <div class="w-full" style={rowStyle.value}>
        {slots.default && slots.default()}
      </div>
    );
  }
});