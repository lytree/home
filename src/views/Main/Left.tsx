import { defineComponent } from 'vue';
import { useMainStore } from '@/store/index.ts';
import Message from '@/components/Message.tsx';
import SocialLinks from '@/components/SocialLinks.tsx';
import { cn } from '@/utils/cn';
import styles from './Left.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    
    return () => (
      <div class={cn(styles.left, store.mobileOpenState && styles.hidden)}>
        <Message />
        <SocialLinks />
      </div>
    );
  }
});