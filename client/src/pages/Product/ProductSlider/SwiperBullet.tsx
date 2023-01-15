import { useSwiper } from 'swiper/react';

const SwiperBullet = ({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: number;
}) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={`p-3 relative w-full before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-dark before:h-[2px] before:w-full ${
        activeIndex === index ? 'cursor-auto' : 'opacity-10'
      }`}
    ></button>
  );
};

export default SwiperBullet;
