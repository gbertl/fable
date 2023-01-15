import { MdChevronLeft } from 'react-icons/md';
import { useSwiper } from 'swiper/react';

const SwiperPrevButton = ({ className }: { className: string }) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className={`absolute top-1/2 left-4 -translate-y-1/2 z-[9999] bg-white p-2 text-dark text-xl rounded-full ${className}`}
      disabled={swiper.isBeginning}
    >
      <MdChevronLeft />
    </button>
  );
};

export default SwiperPrevButton;
