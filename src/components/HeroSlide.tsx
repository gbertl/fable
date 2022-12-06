import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMediaQuery } from 'react-responsive';

import hero1 from '../assets/images/hero-1.png';
import hero2 from '../assets/images/hero-2.png';
import hero3 from '../assets/images/hero-3.png';
import hero4 from '../assets/images/hero-4.png';
import hero5 from '../assets/images/hero-5.png';
import hero6 from '../assets/images/hero-6.png';
import hero7 from '../assets/images/hero-7.png';
import hero8 from '../assets/images/hero-8.png';
import hero9 from '../assets/images/hero-9.png';

const HeroSlide = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(min-width: 576px)' });

  return (
    <Swiper
      className="hero__images"
      slidesPerView={isDesktop ? 9 : isTablet ? 6 : isMobile ? 3 : 2}
      spaceBetween={3}
      loop={true}
      centeredSlides={true}
    >
      {[hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9].map(
        (heroImg) => (
          <SwiperSlide>
            <img src={heroImg} alt="" />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};

export default HeroSlide;
