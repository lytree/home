import { useState } from 'react';
import socialLinks from '@/assets/socialLinks.json';
import { cn } from '@/utils/cn';
import styles from './SocialLinks.module.scss';

export default function SocialLinks() {
  const [socialTip, setSocialTip] = useState('通过这里联系我吧');

  return (
    <div className={cn(styles.social, 'mt-4 flex items-center justify-between max-w-115 w-full h-10.5 bg-transparent rounded-md backdrop-blur-sm')}>
      <div className={cn(styles.link, 'flex items-center justify-center')}>
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            className="inline-block"
            onMouseEnter={() => setSocialTip(item.tip)}
            onMouseLeave={() => setSocialTip('通过这里联系我吧')}
          >
            <img className={cn(styles.icon, 'mx-3 h-6 transition-transform duration-300 hover:scale-110 active:scale-100')} src={item.icon} height="24" />
          </a>
        ))}
      </div>
      <span className={cn(styles.tip, 'hidden mr-3')}>{socialTip}</span>
    </div>
  );
}