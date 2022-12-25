import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

import HeroPopover from './HeroPopover';
import { HeroProduct } from '../../typings.d';
import axios from '../../axios';
import { useQuery } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import { HiPencil, HiPlusCircle } from 'react-icons/hi2';
import { useAuth0 } from '@auth0/auth0-react';
import { useCheckAdminRole } from '../../hooks';
import HeroProductModalForm from './HeroProductModalForm';

const HeroSlider = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(min-width: 576px)' });

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState('');

  const { data: heroProducts } = useQuery<HeroProduct[]>(
    'heroProducts',
    async () => {
      const { data } = await axios.get('/hero-products');
      return data;
    }
  );

  const { isAuthenticated } = useAuth0();
  const isAdmin = useCheckAdminRole();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [currentHeroProduct, setCurrentHeroProduct] = useState<HeroProduct>();

  return (
    <>
      {isAuthenticated && isAdmin && (
        <button
          className="text-xl"
          onClick={() => {
            document.body.classList.add('hide-scrollbar');
            setCurrentHeroProduct(undefined);
            setIsFormOpen(true);
          }}
        >
          <HiPlusCircle />
        </button>
      )}

      <Swiper
        className="hero__slider"
        slidesPerView={isDesktop ? 9 : isTablet ? 6 : isMobile ? 3 : 2}
        spaceBetween={3}
      >
        {heroProducts
          ?.sort((a, b) => a.priorityOrder - b.priorityOrder)
          .map((p, idx) => (
            <SwiperSlide
              key={idx}
              onMouseEnter={() => {
                if (p.product) {
                  setIsHovered(true);
                  setHoveredId(p._id);
                }
              }}
              onMouseLeave={() => {
                if (p.product) {
                  setIsHovered(false);
                  setHoveredId('');
                }
              }}
            >
              {isAuthenticated && isAdmin && (
                <button
                  className="text-xs text-white p-1 bg-black rounded-full absolute top-0 right-3"
                  onClick={() => {
                    document.body.classList.add('hide-scrollbar');
                    setCurrentHeroProduct(p);
                    setIsFormOpen(true);
                  }}
                >
                  <HiPencil />
                </button>
              )}

              <img src={p.imageUrl} alt="" />

              <AnimatePresence>
                {p.product && isHovered && hoveredId === p._id && (
                  <HeroPopover productId={p.product as string} />
                )}
              </AnimatePresence>
            </SwiperSlide>
          ))}
      </Swiper>

      <AnimatePresence>
        {isFormOpen && (
          <HeroProductModalForm
            setIsFormOpen={setIsFormOpen}
            currentHeroProduct={currentHeroProduct}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSlider;
