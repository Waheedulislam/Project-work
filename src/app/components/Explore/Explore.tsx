"use client";
import { useModal } from "@/app/context/ModalContext";
import exploreArray from "@/app/data/explore-section.json";
import { useMatchMedia } from "@/app/lib/hooks/useMatchMedia";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward, IoCheckmark } from "react-icons/io5";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperHandler } from "../../lib/hooks/useSwiperHandler";

const Explore: React.FC = () => {
  const { closeExplore, id } = useModal();
  const { isMobile576, isMobile768, isDesktop1600 } = useMatchMedia();
  const [isInteracting, setIsInteracting] = useState(false);
  const exploreData = exploreArray.find((el) => el.id === id);
  const moreThanOneSlides = exploreData && exploreData.slides.length > 1;
  const { handleNext, handlePrev, swiperRef } = useSwiperHandler(
    !!(id && !isInteracting && moreThanOneSlides)
  );

  useEffect(() => {
    if (id) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [id]);

  return (
    <AnimatePresence>
      {!!id && exploreData && (
        <motion.div
          initial={{ opacity: 0, y: -400 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -400 }}
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 100
          }}
          className="fixed top-0 left-0 bottom-0 right-0 z-[1000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 "
          id="modal-project"
          role="dialog"
        >
          <div className="relative w-full h-full overflow-y-auto overflow-x-hidden md-custom:!overflow-x-hidden bg-white shadow-lg">
            <button
              className="absolute cursor-pointer text-2xl text-gray-600 top-3 right-3 2xl-1600:right-7 2xl-1600:top-7 group flex flex-col p-3 gap-2 z-[1] hover:opacity-60 transition-opacity"
              onClick={closeExplore}
            >
              <X size={isDesktop1600 ? 50 : 25} className="text-[#538074]" />
            </button>
            <div className="modal-content">
              <div className="container min-h-[100vh] flex items-center !mx-0 mobile:!mx-auto">
                <div className="row align-items-md-center align-items-xxl-start !flex !items-center w-screen mobile:w-auto px-4">
                  <div className="col-md-6 w-[40%] mobile:w-full !p-0 flex flex-col xl-1200:space-y-6 2xl-1600:space-y-9">
                    <h2
                      className={clsx(
                        "h2 text-decoration text-[50px] xl:text-[4.0625rem] !pl-0 mobile:!pl-[1.1em] !pt-9 mobile:!pt-0 md-custom:mt-4 md-custom:pt-0",
                        !moreThanOneSlides && "mobile:mt-[5.4rem]"
                      )}
                    >
                      {exploreData.title}
                    </h2>
                    <div className="group-1 flex items-center">
                      <div className="h5">Client:</div>
                      <img src={exploreData.clientLogo.img} alt="client logo" />
                    </div>
                    <h5>{exploreData.description1}</h5>
                    <div className="row row-content-3 !my-5 space-y-2">
                      <div className="col-sm-6 col-lg-5 mobile:mb-[-.94rem]">
                        <ul className="list list-marked flex flex-col gap-3 h5 !leading-[1.3]">
                          {exploreData.list
                            .slice(0, Math.ceil(exploreData.list.length / 2))
                            .map((el, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <IoCheckmark color="#ee6451" />
                                <span>{el}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="col-sm-6 col-lg-5 mobile:mb-[-.94rem]">
                        <ul className="list list-marked h5 flex flex-col gap-3 !leading-[1.3]">
                          {exploreData.list.length >= 2 &&
                            exploreData.list
                              .slice(-Math.floor(exploreData.list.length / 2))
                              ?.map((el, i) => (
                                <li key={i} className="flex items-center gap-1">
                                  <IoCheckmark color="#ee6451" />
                                  <span>{el}</span>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                    <blockquote className="quote quote-simple border-l-8 px-3 lg-992:p-[0_1.5em_0] mt-5 2xl-1600:mt-10 border-[#b9e1d7]">
                      <q className=" !text-orange h3 flex-grow">
                        {exploreData.myGoal}
                      </q>
                    </blockquote>
                    <h5>{exploreData.description2}</h5>
                  </div>
                  <div className="col-md-6 col-xxl-5 offset-xxl-1 !h-full py-[1.87rem] mobile:!w-[500px]">
                    <div className="relative !flex !items-center w-full 2xl-1600:!w-auto 2xl-1600:mr-[-10rem]">
                      {moreThanOneSlides && (
                        <>
                          <button
                            className="absolute hover:text-orange duration-200 transition-colors right-[-.8rem] mobile:right-[-1.5rem] shadow-xl top-1/2 transform -translate-y-1/2 text-gray-800 bg-white p-3 rounded-full z-40"
                            onClick={handleNext}
                          >
                            <IoArrowForward size={22} />
                          </button>

                          <button
                            className="absolute hover:text-orange duration-200 transition-colors left-[-.8rem] mobile:left-[-1.5rem] shadow-xl top-1/2 transform -translate-y-1/2 text-gray-800 bg-white p-3 rounded-full z-40"
                            onClick={handlePrev}
                          >
                            <IoArrowBack size={22} />
                          </button>
                        </>
                      )}
                      <Swiper
                        grabCursor={moreThanOneSlides}
                        spaceBetween={20}
                        slidesPerView={
                          isMobile768 && !isMobile576 && moreThanOneSlides
                            ? 2
                            : 1
                        }
                        ref={swiperRef}
                        className={clsx(
                          "!flex !items-center !overflow-hidden w-full mobile-400:w-[500px] md-custom:h-full md-custom:w-full [&_>_.swiper-wrapper]:!items-center",
                          moreThanOneSlides && "mobile:h-72"
                        )}
                        loop={true}
                        onTouchStart={() => setIsInteracting(true)}
                        onTouchEnd={() => setIsInteracting(false)}
                        navigation={false}
                        autoplay={{
                          delay: 1000,
                          disableOnInteraction: false
                        }}
                      >
                        {(isMobile768 &&
                        !isMobile576 &&
                        exploreData.slides.length < 4
                          ? [...exploreData.slides, ...exploreData.slides]
                          : exploreData.slides
                        ).map((slide, index) => (
                          <SwiperSlide
                            className="!flex !items-center"
                            key={index}
                          >
                            <div className="w-full relative thumbnail">
                              <div className="thumbnail-media !flex !items-center">
                                <img
                                  className="thumbnail-img"
                                  src={slide.img}
                                  alt="media"
                                  width="651"
                                  height="773"
                                />
                                <div className="thumbnail-tags text-centeritems-start md-custom:text-start md-custom:block w-[95%]">
                                  {slide.tags.map((tag, i) => (
                                    <a
                                      key={i}
                                      className="tag bg-white"
                                      href={tag.link}
                                    >
                                      {tag.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Explore;
