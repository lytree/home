import { useEffect, useState } from 'react';
import { Error } from '@icon-park/react';
import { getHitokoto } from '@/api';
import { cn } from '@/utils/cn';
import styles from './Hitokoto.module.scss';

interface HitokotoData {
  text: string;
  from: string;
}

export default function Hitokoto() {
  const [hitokotoData, setHitokotoData] = useState<HitokotoData>({
    text: '这里应该显示一句话',
    from: '無名',
  });

  const getHitokotoData = async () => {
    try {
      const result = await getHitokoto();
      setHitokotoData({
        text: result.hitokoto,
        from: result.from,
      });
    } catch {
      setHitokotoData({
        text: '这里应该显示一句话',
        from: '無名',
      });
    }
  };

  useEffect(() => {
    getHitokotoData();
  }, []);

  return (
    <div className={cn(styles.hitokoto, 'cards w-full h-full')} onClick={getHitokotoData}>
      <div className={styles.content}>
        <span className={styles.text}>{hitokotoData.text}</span>
        <span className={styles.from}>-「&nbsp;{hitokotoData.from}&nbsp;」</span>
      </div>
    </div>
  );
}