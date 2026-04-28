import { defineComponent, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel } from 'swiper/modules';
import siteLinks from '@/assets/siteLinks.json';
import { cn } from '@/utils/cn';
import styles from './Links.module.scss';

export default defineComponent({
  setup() {
    // 计算网站链接
    const siteLinksList = computed(() => {
      const result = [];
      for (let i = 0; i < siteLinks.length; i += 6) {
        const subArr = siteLinks.slice(i, i + 6);
        result.push(subArr);
      }
      return result;
    });


    // 链接跳转
    const jumpLink = (data: { icon?: string; name?: string; link: any; }) => {
      window.open(data.link, '_blank');
    };
    onMounted(() => {
      console.log(siteLinks);
    });

    return () => (
      <div v-if={siteLinks[0]} class={styles.links}>
        <div class={cn(styles.line, 'my-8 mx-1 flex items-center text-1.1rem')}>
          <Icon icon="fa:link" height={20} width={20} />
          <span class={cn(styles.title, 'ml-2 text-1.15rem')}>网站列表</span>
        </div>
        {/* 网站列表 */}
        <Swiper
          v-if={siteLinks[0]}
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
              <div class={cn(styles.linkAll, 'flex flex-wrap w-[calc(100%+20px)] -ml-2.5 -mr-2.5')}>
                {site.map((item, idx) => (
                  <div class={cn(idx < 3 ? 'mb-5' : '', 'w-[33.333%] px-2.5 shrink-0')}>
                    <div
                      class={cn(styles.item, 'cards h-25 w-full flex flex-row items-center justify-center px-2.5')}
                      onClick={() => jumpLink(item)}
                    >
                      <Icon icon={item.icon || "fa:link"} width="32" height="32" />
                      <span class={cn(styles.name, 'text-hidden ml-2 text-1.1rem')}>{item.name}</span>
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
  }
});