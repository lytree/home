import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Message.module.scss';
import { Icon } from '@iconify/react';

export default function Message() {
  const boxOpenState = useMainStore((state) => state.boxOpenState);
  const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
  const siteAuthor = import.meta.env.VITE_SITE_AUTHOR;
  
  const getSiteUrl = () => {
    if (siteAuthor.startsWith('http://') || siteAuthor.startsWith('https://')) {
      return siteAuthor.replace(/^(https?:\/\/)/, '').split('.');
    }
    return siteAuthor.split('.');
  };
  const urlParts = getSiteUrl();

  const descriptionText = {
    hello: import.meta.env.VITE_DESC_HELLO,
    text: import.meta.env.VITE_DESC_TEXT,
  };

  const displayText = boxOpenState ? {
    hello: import.meta.env.VITE_DESC_HELLO_OTHER,
    text: import.meta.env.VITE_DESC_TEXT_OTHER,
  } : descriptionText;

  return (
    <>
      <div className={cn(styles.logo, 'flex flex-row items-center animation-fade max-w-115')}>
        <img className={cn(styles.logoImg, 'rounded-full w-28')} src={siteLogo} alt="logo" />
        <div className={cn(styles.name, 'text-hidden w-full pl-5.5 -translate-y-2', urlParts[0].length >= 6 && styles.long)}>
          <span className={cn(styles.bg, 'text-5xl')}>{urlParts[0]}</span>
          <span className={cn(styles.sm, 'ml-1.5 text-2xl')}>{urlParts[1]}</span>
        </div>
      </div>
      <div className={cn(styles.description, 'cards p-4! mt-14! max-w-115')}>
        <div className={cn(styles.content, 'flex justify-between')}>
          <Icon icon="fa:quote-left" height={16} width={16} />
          <div className={cn(styles.text, 'my-3 mx-4 leading-8 mr-auto')}>
            <p>{displayText.text}</p>
          </div>
          <Icon icon="fa:quote-right" height={16} width={16} />
        </div>
      </div>
    </>
  );
}