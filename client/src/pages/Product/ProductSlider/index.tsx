import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useState } from "react";

import SwiperPrevButton from "./SwiperPrevButton";
import SwiperNextButton from "./SwiperNextButton";
import SwiperBullet from "./SwiperBullet";

interface Props {
  image: string;
  heroImage: string;
}

const ProductSlider = ({ image, heroImage }: Props) => {
  const [slidesLength, setSlidesLength] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const createBullets = (length: number, activeIndex: number) => {
    let bullets: JSX.Element[] = [];

    for (let x = 0; x < length; x++) {
      bullets.push(
        <li key={x}>
          <SwiperBullet index={x} activeIndex={activeIndex} />
        </li>
      );
    }

    return bullets;
  };

  return (
    <Swiper
      className="w-full h-full"
      effect="fade"
      modules={[EffectFade]}
      onSwiper={(swiper) => setSlidesLength(swiper.slides.length)}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      <SwiperSlide className="w-4/5 bg-gray2 mb-3 lg:mb-0 !flex justify-center items-end">
        <img src={image} alt="" className="object-cover h-[90%] lg:h-[644px]" />
      </SwiperSlide>
      <SwiperSlide className="w-4/5 bg-gray2 mb-3 lg:mb-0 !flex justify-center items-end">
        <img
          src={heroImage}
          alt=""
          className="object-contain h-[90%] lg:h-[644px]"
        />
      </SwiperSlide>

      <SwiperPrevButton
        className={activeIndex === 0 ? "opacity-50 cursor-auto" : ""}
      />
      <SwiperNextButton
        className={
          activeIndex === slidesLength - 1 ? "opacity-50 cursor-auto" : ""
        }
      />

      <ul className="absolute top-1 left-4 z-[9999] w-full grid grid-cols-6 gap-4">
        {createBullets(slidesLength, activeIndex)}
      </ul>
    </Swiper>
  );
};

export default ProductSlider;
