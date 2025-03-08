"use client";

import { useModal } from "@/app/context/ModalContext";
import explore from "@/app/data/explore-section.json";
import works from "@/app/data/latest-works-section.json";
import { useMatchMedia } from "@/app/lib/hooks/useMatchMedia";
import AOS from "aos";
import "aos/dist/aos.css";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperHandler } from "../../lib/hooks/useSwiperHandler";

const LatestWorks = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const { openExplore } = useModal();
  const { isMobile576, isMobile768, isDesktop1600 } = useMatchMedia();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleNext, handlePrev, swiperRef } = useSwiperHandler(false);

  const [maxScroll, setMaxScroll] = useState(
    works.length ? works.length - 1 : 0
  );

  const stopDoubleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (swiperRef.current) {
      if (isMobile768) {
        setMaxScroll(works.length - 2);
      } else if (isMobile576) {
        setMaxScroll(works.length - 1);
      } else {
        setMaxScroll(works.length - 3);
      }
    }
  }, [isMobile768, isMobile576]);

  return (
    <section
      className="section section-md bg-100 overflow-hidden !flex mobile:!justify-center"
      id="portfolio"
    >
      <div className="container !mx-0 mobile:!mx-6">
        <div className="row row-30 row-lg-50 justify-content-md-between justify-between items-center">
          <div className="col-sm-8 col-md-7 col-xxl-5 w-full">
            <h2
              className="text-decoration animated fadeIn"
              data-aos="fade-in"
              data-aos-anchor-placement="center-bottom"
            >
              Latest works
            </h2>

            <h5
              className="animated fadeIn"
              data-aos="fade-in"
              data-aos-anchor-placement="center-bottom"
            >
              Check out my recent and popular design & branding projects I have
              worked on.
            </h5>
          </div>

          <div className="col-sm-4 col-md-5 col-xxl-3 text-sm-right text-lg-center animated fadeInRight mobile:flex mobile:justify-end lg-992:justify-center">
            <div
              data-aos="fade-left"
              data-aos-anchor-placement="center-bottom"
              className="separate-owl-nav"
            >
              <button
                onDoubleClick={stopDoubleClick}
                onClick={handlePrev}
                type="button"
                className={clsx("owl-prev", currentIndex !== 0 && "owl-ar-h")}
                disabled={currentIndex === 0}
                style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
              >
                <ArrowLeft />
              </button>

              <button
                onDoubleClick={stopDoubleClick}
                type="button"
                onClick={handleNext}
                className={clsx(
                  "owl-next",
                  currentIndex < maxScroll && "owl-ar-h"
                )}
                disabled={currentIndex >= maxScroll}
                style={{
                  opacity: currentIndex >= maxScroll ? 0.3 : 1,
                }}
              >
                <ArrowRight />
              </button>
            </div>
          </div>

          <div className="col-12">
            <div data-aos="fade-in" data-aos-anchor-placement="center-bottom">
              <Swiper
                ref={swiperRef}
                className="mobile:w-[230px] md-custom:w-[450px] lg-992:w-[600px] xl-1200:w-[750px] 2xl-1600:w-[900px] mobile:!overflow-visible !m-0"
                spaceBetween={isDesktop1600 ? 45 : 30}
                slidesPerView={works.length}
                onSlideChange={(swiper) => {
                  setCurrentIndex(swiper.activeIndex);
                }}
                navigation={false}
                allowTouchMove={true}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
              >
                {works.map((work, index) => (
                  <SwiperSlide className="" key={index}>
                    <div className="thumbnail-media sm:!w-full h-auto">
                      <img
                        className="!w-full"
                        src={work.image}
                        alt={work.title}
                        style={{
                          height: isMobile576 ? "auto" : "100%", // Adjust image height accordingly
                        }}
                      />
                      <div className="thumbnail-tags ">
                        {work.tags.map((tag, i) => (
                          <a
                            key={i}
                            className="design-effect tag"
                            href={tag.link}
                          >
                            {tag.title}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="pl-8 pt-4">
                      <div className="thumbnail-title h4">
                        <a href={work.titleLink}>{work.title}</a>
                      </div>
                      {explore.find((data) => data.id === work.id) && (
                        <button
                          onClick={() => openExplore(work.id)}
                          className="thumbnail-link h5"
                          data-toggle="modal"
                          data-target="#modal-project"
                        >
                          Explore
                        </button>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="modal-project"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Project Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="project-details">
                {/* Dynamic content from works data */}
                {works.map((item) => (
                  <div
                    key={item.id}
                    id={`project-${item.id}`}
                    className="project-item"
                  >
                    <h3>{item.title}</h3>
                    <img src={item.image} alt={item.title} />
                    <p>
                      Description: Here goes the description of the project.
                    </p>
                    console.log(object)
                    <div className="tags">
                      {item.tags.map((tag, i) => (
                        <a key={i} href={tag.link} className="tag">
                          {tag.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestWorks;
