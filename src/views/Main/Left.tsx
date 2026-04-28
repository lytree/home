import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Left.module.scss';

export default function MainLeft() {
  const mobileOpenState = useMainStore((state) => state.mobileOpenState);
  const boxOpenState = useMainStore((state) => state.boxOpenState);

  return (
    <div className={cn(styles.left, mobileOpenState && !boxOpenState && styles.hidden)}>
      <Message />
      <SocialLinks />
    </div>
  );
}

import Message from '@/components/Message';
import SocialLinks from '@/components/SocialLinks';