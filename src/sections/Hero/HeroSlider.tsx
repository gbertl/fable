import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

import HeroPopover from './HeroPopover';
import { HeroProduct } from '../../typings';
import axios from '../../axios';

const HeroSlider = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(min-width: 576px)' });

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState(0);

  const [heroProducts, setHeroProducts] = useState<HeroProduct[]>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/heroProducts');
      setHeroProducts(data);
    })();
  }, []);

  return (
    <>
      <Swiper
        className="hero__slider"
        slidesPerView={isDesktop ? 9 : isTablet ? 6 : isMobile ? 3 : 2}
        spaceBetween={3}
        maxBackfaceHiddenSlides={0}
      >
        {heroProducts?.map((p, idx) => (
          <SwiperSlide
            key={idx}
            onMouseEnter={() => {
              if (p.id) {
                setIsHovered(true);
                setHoveredId(p.id);
              }
            }}
            onMouseLeave={() => {
              if (p.id) {
                setIsHovered(false);
                setHoveredId(0);
              }
            }}
          >
            <img src={p.heroImage} alt="" />
            {p.id && isHovered && hoveredId === p.id && (
              <HeroPopover productId={p.id} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlider;
