import { MdChevronRight } from 'react-icons/md';
import { useSwiper } from 'swiper/react';

const SwiperNextButton = ({ className }: { className: string }) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className={`absolute top-1/2 right-4 -translate-y-1/2 z-[9999] bg-white p-2 text-dark text-xl rounded-full ${className}`}
      disabled={swiper.isEnd}
    >
      <MdChevronRight />
    </button>
  );
};

export default SwiperNextButton;
