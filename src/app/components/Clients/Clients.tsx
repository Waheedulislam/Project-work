"use client";

import myClientsData from "@/app/data/myclients-section.json";
import myClientsLogo from "@/app/data/myclients-section-logo.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { IoArrowDown } from "react-icons/io5";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperHandler } from "../../lib/hooks/useSwiperHandler";
import Image from "next/image";

const Clients = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const { handleNext, handlePrev, swiperRef } = useSwiperHandler(false);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <section className="section section-md bg-left pt-0" id="testimonials">
      <div
        className="bg-item client-background hidden sm:flex bg-image animated fadeInLeftBig"
        data-aos="fade-right"
        data-aos-anchor-placement="center-bottom"
        data-aos-duration="1500"
        style={{ height: "100%" }}
      >
        <Image
          layout="fill"
          objectFit="cover" // or "contain" depending on how you want the image to scale
          src="images/bg-pattern-1.jpg"
          alt="background"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 animated">
            <div className="swiper-separate-container">
              <Swiper
                grabCursor={true}
                touchEventsTarget="container"
                className="flex flex-col justify-end items-center client-object sm:h-[26rem] overflow-hidden w-full lg-992:w-[80%] xl-1200:w-[70%] relative !h-[19rem] mobile-400:!h-64 mobile:p-[2.7rem_1.7rem_6rem_1.7rem] lg-992:!h-[330px] md-custom:!h-[310px] xl-1200:!h-[26rem] 2xl-1600:!h-[29rem]"
                ref={swiperRef}
                spaceBetween={45}
                slidesPerView={1}
                navigation={false}
                loop={true}
                direction="vertical"
                speed={900}
                onSlideChange={(swiper) => {
                  setCurrentSlide(swiper.realIndex);
                }}
              >
                {myClientsData.clients.map((el, index) => (
                  <SwiperSlide className="!flex !items-end" key={index}>
                    <div
                      data-aos="fade-right"
                      data-aos-duration="1200"
                      data-aos-anchor-placement="center-bottom"
                      className="swiper-slide bg-offWhite relative z-10 client-slider overflow-hidden p-[2rem_1rem_2rem_1rem] lg-992:p-[2.2rem_1.4rem_2rem_1.4rem] 2xl-1600:p-[2.4rem_2rem]"
                    >
                      <blockquote className="quote">
                        <q className="quote-text font-thin italic h4 text-black comment-text lg-992::!pt-3 xl-1200:!p-0">
                          {el.quote}
                        </q>
                        <div className="flex gap-4 mt-5 lg-992:mt-10">
                          <img
                            className="rounded-full"
                            src={el.img}
                            alt={el.author}
                            width="67"
                            height="67"
                          />
                          <div className="quote-author-body">
                            <div className="quote-author-name h4">
                              <cite className="text-red-500">{el.author}</cite>
                            </div>
                            <div className="quote-author-meta h6">
                              {el.role}
                            </div>
                          </div>
                        </div>
                      </blockquote>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-separate-navigation">
                <button
                  className="swiper-button swiper-button-prev"
                  onClick={handleNext}
                >
                  <FaArrowUp />
                </button>
                <div className="swiper-pagination swiper-pagination-fraction">
                  <span className="swiper-pagination-current">
                    {String(currentSlide + 1).padStart(2, "0")}
                  </span>
                  /
                  <span className="swiper-pagination-total">
                    {String(myClientsData.clients.length).padStart(2, "0")}
                  </span>
                </div>
                <button
                  className="swiper-button swiper-button-next"
                  onClick={handlePrev}
                >
                  <IoArrowDown />
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 pt-4 md-custom:pt-0 text-sm-left text-center flex flex-col justify-start mobile:text-start">
            <h2
              className="text-decoration animated fadeIn"
              data-aos="fade-in"
              data-aos-anchor-placement="center-bottom"
            >
              My Clients
            </h2>
            <h5
              className="animated fadeIn whitespace-normal text-lg leading-relaxed font-inter px-1"
              data-aos="fade-in"
              data-aos-anchor-placement="center-bottom"
            >
              Read the testimonials submitted by my clients and partners. You
              can fully trust their opinions on my solutions.
            </h5>

            <div
              className="row row-30 row-xxl-50 row-content-2 align-items-center text-center"
              data-aos="fade-in"
              data-aos-anchor-placement="center-bottom"
            >
              {myClientsLogo?.logos?.map((logo) => (
                <div key={logo.id} className="col-xs-6 col-md-4">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
