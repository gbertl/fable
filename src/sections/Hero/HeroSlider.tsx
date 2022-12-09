import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMediaQuery } from 'react-responsive';

import HeroPopover from './HeroPopover';
import { useState } from 'react';
import { products } from '../../data';
import productHeroA from '../../assets/images/product-hero-a.png';
import productHeroB from '../../assets/images/product-hero-b.png';
import productHeroC from '../../assets/images/product-hero-c.png';
import productHeroD from '../../assets/images/product-hero-d.png';
import productHeroE from '../../assets/images/product-hero-e.png';

const heroProducts = [
  products.find((p) => p.id == 2),
  { id: null, heroImage: productHeroA },
  products.find((p) => p.id == 6),
  { id: null, heroImage: productHeroB },
  products.find((p) => p.id == 8),
  products.find((p) => p.id == 4),
  { id: null, heroImage: productHeroC },
  { id: null, heroImage: productHeroD },
  { id: null, heroImage: productHeroE },
];

const HeroSlide = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(min-width: 576px)' });

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState(0);

  return (
    <>
      <Swiper
        className="hero__slider"
        slidesPerView={isDesktop ? 9 : isTablet ? 6 : isMobile ? 3 : 2}
        spaceBetween={3}
        maxBackfaceHiddenSlides={0}
      >
        {heroProducts.map((p, idx) => (
          <SwiperSlide
            key={idx}
            onMouseEnter={() => {
              if (p?.id) {
                setIsHovered(true);
                setHoveredId(p.id);
              }
            }}
            onMouseLeave={() => {
              if (p?.id) {
                setIsHovered(false);
                setHoveredId(0);
              }
            }}
          >
            <img src={p?.heroImage} alt="" />
            {p?.id && isHovered && hoveredId === p.id && (
              <HeroPopover productId={p.id} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlide;
