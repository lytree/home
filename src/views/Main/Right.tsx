import { defineVaporComponent } from 'vue';
import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Right.module.css';

import Func from '@/views/Func';
import Hitokoto from '@/components/Hitokoto';
import Link from '@/components/Links';

export default defineVaporComponent({
  setup() {
    const store = useMainStore();

    return (
      <div class={cn(styles.right, !store.mobileOpenState && styles.hidden)}>
        <Func />
        <Hitokoto />
        <Link />
      </div>
    );
  },
});
