import { useEffect, useState } from 'react';
import { useMainStore } from '@/store';
import { toast } from 'sonner';
import { cn } from '@/utils/cn';
import styles from './Background.module.scss';

interface BackgroundProps {
  onLoadComplete?: () => void;
}

export default function Background({ onLoadComplete }: BackgroundProps) {
  const backgroundShow = useMainStore((state) => state.backgroundShow);
  const setImgLoadStatus = useMainStore((state) => state.setImgLoadStatus);

  const [bgUrlValue, setBgUrlValue] = useState('');
  const [imgTimeoutValue, setImgTimeoutValue] = useState<number | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const bgRandom = Math.floor(Math.random() * 10 + 1);

  const changeBg = () => {
    setBgUrlValue(`https://api.isoyu.com/bing_images.php`);
  };

  useEffect(() => {
    changeBg();
  }, []);

  const imgLoadComplete = () => {
    setIsLoaded(true);
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
    toast.error('壁纸加载失败,已临时切换回默认');
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
    <div className="absolute top-0 left-0 w-full h-full transition-all z-[-1]">
      <img
        src={bgUrlValue}
        className="absolute top-0 left-0 w-full h-full object-cover blur-10 brightness-50"
        alt="cover"
        onLoad={imgLoadComplete}
        onError={imgLoadError}
        onAnimationEnd={imgAnimationEnd}
      />
    </div>
  );
}