import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

import HeroPopover from "./HeroPopover";
import { HeroProduct } from "../../types";
import axios from "../../axios";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { HiPencil, HiPlusCircle } from "react-icons/hi2";
import { useAuth0 } from "@auth0/auth0-react";
import { useCheckAdminRole } from "../../hooks";
import HeroProductModalForm from "./HeroProductModalForm";
import { apiRoutes } from "../../routes";

const HeroSlider = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState("");

  const { data: heroProducts } = useQuery<HeroProduct[]>(
    "heroProducts",
    async () => {
      const { data } = await axios.get(apiRoutes.heroProductList);
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
            setCurrentHeroProduct(undefined);
            setIsFormOpen(true);
          }}
        >
          <HiPlusCircle />
        </button>
      )}

      <Swiper
        className="hero__slider"
        maxBackfaceHiddenSlides={0}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 9,
          },
        }}
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
                  setHoveredId("");
                }
              }}
            >
              {isAuthenticated && isAdmin && (
                <button
                  className="text-xs text-white p-1 bg-black rounded-full absolute top-0 right-3"
                  onClick={() => {
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
