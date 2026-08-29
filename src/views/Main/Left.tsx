import { defineVaporComponent } from 'vue';
import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Left.module.css';

import Message from '@/components/Message';
import SocialLinks from '@/components/SocialLinks';

export default defineVaporComponent({
  setup() {
    const store = useMainStore();

    return (
      <div
        class={cn(
          styles.left,
          store.mobileOpenState && !store.boxOpenState && styles.hidden,
        )}
      >
        <Message />
        <SocialLinks />
      </div>
    );
  },
});
