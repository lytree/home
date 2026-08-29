import { defineVaporComponent, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel } from 'swiper/modules';
import siteLinks from '@/assets/siteLinks.json';
import { cn } from '@/utils/cn';
import styles from './Links.module.css';
import 'swiper/css';

interface SiteLink {
  icon?: string;
  name?: string;
  link: string;
}

export default defineVaporComponent({
  setup() {
    const siteLinksList = computed<SiteLink[][]>(() => {
      const result: SiteLink[][] = [];
      for (let i = 0; i < siteLinks.length; i += 6) {
        const subArr = siteLinks.slice(i, i + 6) as SiteLink[];
        result.push(subArr);
      }
      return result;
    });

    const jumpLink = (data: SiteLink) => {
      window.open(data.link, '_blank');
    };

    onMounted(() => {
      console.log(siteLinks);
    });

    if (!siteLinks[0]) return <div />;

    return (
      <div class={styles.links}>
        <div class={cn(styles.line, 'my-8 mx-1 flex items-center text-1.1rem')}>
          <Icon icon="fa:link" height={20} width={20} />
          <span class={cn(styles.title, 'ml-2 text-1.15rem')}>网站列表</span>
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
          {siteLinksList.value.map((site, index) => (
            <SwiperSlide key={index}>
              <div
                class={cn(
                  styles.linkAll,
                  'flex flex-wrap w-[calc(100%+20px)] -ml-2.5 -mr-2.5',
                )}
              >
                {site.map((item, idx) => (
                  <div
                    key={`${index}-${idx}`}
                    class={cn(idx < 3 ? 'mb-5' : '', 'w-[33.333%] px-2.5 shrink-0')}
                  >
                    <div
                      class={cn(
                        styles.item,
                        'cards h-25 w-full flex flex-row items-center justify-center px-2.5',
                      )}
                      onClick={() => jumpLink(item)}
                    >
                      <Icon icon={item.icon || 'fa:link'} width="32" height="32" />
                      <span class={cn(styles.name, 'text-hidden ml-2 text-1.1rem')}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
          <div class="swiper-pagination" />
        </Swiper>
      </div>
    );
  },
});
