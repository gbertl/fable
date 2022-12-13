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
      className={`bg-dark h-[2px] w-full ${
        activeIndex === index ? 'cursor-auto' : 'opacity-10'
      }`}
    ></button>
  );
};

export default SwiperBullet;
