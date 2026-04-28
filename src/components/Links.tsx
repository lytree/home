import { useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';
import siteLinks from '@/assets/siteLinks.json';
import { cn } from '@/utils/cn';
import styles from './Links.module.scss';
import 'swiper/css';

export default function Links() {
  const siteLinksList = useMemo(() => {
    const result = [];
    for (let i = 0; i < siteLinks.length; i += 6) {
      const subArr = siteLinks.slice(i, i + 6);
      result.push(subArr);
    }
    return result;
  }, []);

  const jumpLink = (data: { icon?: string; name?: string; link: string }) => {
    window.open(data.link, '_blank');
  };

  useEffect(() => {
    console.log(siteLinks);
  }, []);

  if (!siteLinks[0]) return null;

  return (
    <div className={styles.links}>
      <div className={cn(styles.line, 'my-8 mx-1 flex items-center text-1.1rem')}>
        <Icon icon="fa:link" height={20} width={20} />
        <span className={cn(styles.title, 'ml-2 text-1.15rem')}>网站列表</span>
      </div>
      <Swiper
        modules={[Pagination, Mousewheel]}
        slidesPerView={1}
        spaceBetween={40}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          bulletElement: 'div',
        }}
        mousewheel={true}
      >
        {siteLinksList.map((site, index) => (
          <SwiperSlide key={index}>
            <div className={cn(styles.linkAll, 'flex flex-wrap w-[calc(100%+20px)] -ml-2.5 -mr-2.5')}>
              {site.map((item, idx) => (
                <div className={cn(idx < 3 ? 'mb-5' : '', 'w-[33.333%] px-2.5 shrink-0')}>
                  <div
                    className={cn(styles.item, 'cards h-25 w-full flex flex-row items-center justify-center px-2.5')}
                    onClick={() => jumpLink(item)}
                  >
                    <Icon icon={item.icon || "fa:link"} width="32" height="32" />
                    <span className={cn(styles.name, 'text-hidden ml-2 text-1.1rem')}>{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}