import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMediaQuery } from 'react-responsive';

import HeroPopover from './HeroPopover';
import { useState } from 'react';
import { products } from '../data';

const HeroSlide = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(min-width: 576px)' });

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState(0);

  return (
    <>
      <Swiper
        className="hero__images"
        slidesPerView={isDesktop ? 9 : isTablet ? 6 : isMobile ? 3 : 2}
        spaceBetween={3}
        maxBackfaceHiddenSlides={0}
      >
        {products.map((p) => (
          <SwiperSlide
            key={p.id}
            onMouseEnter={() => {
              setIsHovered(true);
              setHoveredId(p.id);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredId(0);
            }}
          >
            <img src={p.heroImage} alt="" />
            {isHovered && hoveredId === p.id && p.name && (
              <HeroPopover productId={p.id} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlide;
