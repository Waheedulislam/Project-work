import { useEffect, useRef } from "react";
import { SwiperRef } from "swiper/react";

export const useSwiperHandler = (isAutoplay: boolean) => {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  useEffect(() => {
    if (isAutoplay) {
      const interval = setInterval(() => {
        swiperRef.current?.swiper.slideNext();
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isAutoplay]);

  return { handlePrev, handleNext, swiperRef };
};
