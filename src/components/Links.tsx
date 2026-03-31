import { defineComponent, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
// 可前往 https://iconify.design 自行挑选并在此处引入
import { mainStore } from '@/store';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel } from 'swiper/modules';
import siteLinks from '@/assets/siteLinks.json';
import CustomRow from '@/components/custom/Row.tsx';
import CustomCol from '@/components/custom/Col.tsx';
import styles from './Links.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();

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
    const jumpLink = (data) => {
      if (data.name === '音乐' && store.musicClick) {
        if (typeof $openList === 'function') $openList();
      } else {
        window.open(data.link, '_blank');
      }
    };
    onMounted(() => {
      console.log(siteLinks);
    });

    return () => (
      <div v-if={siteLinks[0]} class={styles.links}>
        <div class={styles.line}>
          <Icon icon="fa:link" size={20} />
          <span class={styles.title}>网站列表</span>
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
              <CustomRow class={styles.linkAll} gutter={20}>
                {site.map((item, idx) => (
                  <CustomCol span={8} key={idx}>
                    <div
                      class={[styles.item, 'cards'].join(' ')}
                      style={idx < 3 ? 'margin-bottom: 20px' : null}
                      onClick={() => jumpLink(item)}
                    >
                      <Icon icon={item.icon || "fa:link"}  width="32" height="32" />
                      <span class={[styles.name, 'text-hidden'].join(' ')}>{item.name}</span>
                    </div>
                  </CustomCol>
                ))}
              </CustomRow>
            </SwiperSlide>
          ))}
          <div class="swiper-pagination" />
        </Swiper>
      </div>
    );
  }
});