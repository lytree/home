import { useEffect, useState } from 'react';
import { useMainStore } from '@/store';

interface BackgroundProps {
  onLoadComplete?: () => void;
}

export default function Background({ onLoadComplete }: BackgroundProps) {
  const setImgLoadStatus = useMainStore((state) => state.setImgLoadStatus);

  const [bgUrlValue, setBgUrlValue] = useState('');
  const [imgTimeoutValue, setImgTimeoutValue] = useState<number | undefined>(undefined);

  const bgRandom = Math.floor(Math.random() * 10 + 1);

  const changeBg = () => {
    setBgUrlValue(`https://api.isoyu.com/bing_images.php`);
  };

  useEffect(() => {
    changeBg();
  }, []);

  const imgLoadComplete = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('图片加载完成');
    const timeout = setTimeout(
      () => {
        setImgLoadStatus(true);
      },
      Math.floor(Math.random() * (600 - 300 + 1)) + 300
    );
    setImgTimeoutValue(timeout);
  };

  const imgAnimationEnd = () => {
    console.log('壁纸动画完成');
    onLoadComplete?.();
  };

  const imgLoadError = () => {
    console.error('壁纸加载失败，尝试默认图片');
    setBgUrlValue(`/images/background${bgRandom}.jpg`);
    setImgLoadStatus(true);
  };

  useEffect(() => {
    return () => {
      if (imgTimeoutValue) {
        clearTimeout(imgTimeoutValue);
      }
    };
  }, [imgTimeoutValue]);

  return (
    <div className="absolute top-0 left-0 w-full h-full transition-all z-[-1]" style={{
      backfaceVisibility: 'hidden',
      filter: 'blur(20px) brightness(0.3)',
      transition: 'filter 0.3s, transform 0.3s',
      animation: 'fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      animationDelay: '0.45s'
    }}>
      {bgUrlValue && (
        <img
          src={bgUrlValue}
          className="absolute top-0 left-0 w-full h-full object-cover blur-20 brightness-50"
          style={{
            animation: 'fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          }}
          alt="cover"
          onLoad={imgLoadComplete}
          onError={imgLoadError}
          onAnimationEnd={imgAnimationEnd}
        />
      )}
    </div>
  );
}