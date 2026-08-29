import { defineVaporComponent } from 'vue';
import { Toaster as SonnerToaster } from 'vue-sonner';

export const Toaster = defineVaporComponent({
  props: {
    position: { type: String, default: 'top-center' },
    toastOptions: { type: Object, default: () => ({}) },
  },
  setup(props) {
    return (
      <SonnerToaster
        position={props.position as 'top-center'}
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '25px',
            padding: '12px 20px',
            marginBottom: '10px',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          duration: 3000,
          ...((props.toastOptions as Record<string, unknown>) ?? {}),
        }}
      />
    );
  },
});
