import { useEffect, useState } from 'react';
import { useMainStore } from '@/store';
import { Error } from '@icon-park/react';
import ElMessage from '@/components/custom/message';
import { cn } from '@/utils/cn';
import styles from './Background.module.scss';

interface BackgroundProps {
  onLoadComplete?: () => void;
}

export default function Background({ onLoadComplete }: BackgroundProps) {
  const bgUrl = useMainStore((state) => state.coverType);
  const backgroundShow = useMainStore((state) => state.backgroundShow);
  const imgLoadStatus = useMainStore((state) => state.imgLoadStatus);
  const setImgLoadStatus = useMainStore((state) => state.setImgLoadStatus);
  const setCoverType = useMainStore((state) => state.setCoverType);

  const [bgUrlValue, setBgUrlValue] = useState('');
  const [imgTimeoutValue, setImgTimeoutValue] = useState<NodeJS.Timeout | null>(null);

  const bgRandom = Math.floor(Math.random() * 10 + 1);

  const changeBg = (type: string) => {
    if (type == '0') {
      setBgUrlValue(`/images/background${bgRandom}.jpg`);
    } else if (type == '1') {
      setBgUrlValue('https://api.dujin.org/bing/1920.php');
    } else if (type == '2') {
      setBgUrlValue('https://api.vvhan.com/api/wallpaper/views');
    } else if (type == '3') {
      setBgUrlValue('https://api.vvhan.com/api/wallpaper/acg');
    }
  };

  useEffect(() => {
    changeBg(bgUrl);
  }, [bgUrl]);

  const imgLoadComplete = () => {
    const timeout = setTimeout(
      () => {
        setImgLoadStatus(true);
      },
      Math.floor(Math.random() * (600 - 300 + 1)) + 300
    );
    setImgTimeoutValue(timeout);
  };

  const imgAnimationEnd = () => {
    console.log('壁纸加载且动画完成');
    onLoadComplete?.();
  };

  const imgLoadError = () => {
    console.error('壁纸加载失败：', bgUrlValue);
    ElMessage({
      message: '壁纸加载失败,已临时切换回默认',
      icon: h(Error, {
        theme: 'filled',
        fill: '#efefef'
      })
    });
    setBgUrlValue(`/images/background${bgRandom}.jpg`);
  };

  useEffect(() => {
    return () => {
      if (imgTimeoutValue) {
        clearTimeout(imgTimeoutValue);
      }
    };
  }, [imgTimeoutValue]);

  return (
    <div className={cn(styles.cover, 'absolute top-0 left-0 w-full h-full transition-all z-[-1]', backgroundShow && styles.show)}>
      <img
        src={bgUrlValue}
        className={cn(styles.bg, 'absolute top-0 left-0 w-full h-full object-cover')}
        alt="cover"
        onLoad={imgLoadComplete}
        onError={imgLoadError}
        onAnimationEnd={imgAnimationEnd}
      />
    </div>
  );
}