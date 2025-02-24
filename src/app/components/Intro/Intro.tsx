"use client";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlay } from "react-icons/fa";
import introData from "@/app/data/intro-section.json";
import { motion } from "framer-motion";
import { fadeIn } from "@/app/lib/animation/variants";

const Intro = () => {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  return (
    <>
      <section className="section intro bg-100">
        <div ref={sectionRef} className="intro-inner mt-16 lg:-mt-8 sm:pl-3">
          <div className="row row-30 align-items-center">
            <div className=" col-md-4 col-xxl-3 offset-xl-1 offset-xxl-2 flex flex-col items-center justify-center md-custom:items-start">
              <h1 className="space-x-2 text-center md:text-start">
                <span className="font-light md-custom:mr-[.7rem]">Hi!</span>
                <span
                  style={{
                    color: "#111235",
                    boxSizing: "border-box",
                  }}
                  className="text-nowrap"
                >
                  I'm <br />a designer
                </span>
              </h1>
              <h3 className="intro-subtitle text-center md:text-start">
                ready to work on the next big project for your business
              </h3>
              <a className="btn max-w-56" data-anchor-link="" href="#contact">
                Get in touch
              </a>
            </div>

            {/* image-section  */}
            <div className="col-sm-6 col-md-5 col-lg-4 col-xxl-4">
              <div className="thumbnail thumbnail-video">
                <div className="thumbnail-media">
                  <img
                    className="thumbnail-img"
                    src={introData.introMe.src}
                    alt="intro photo"
                    width={introData.introMe.width}
                    height={introData.introMe.height}
                  />
                  <a
                    className="thumbnail-icon text-white center-button"
                    href={introData.videoLink}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                  >
                    <FaPlay size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-5 col-md-3 col-xl-2 mobile:!flex !items-center">
              <div className="thumbnail thumbnail-boxed">
                <div className="thumbnail-media">
                  <img
                    className="thumbnail-img"
                    src={introData.introWork.src}
                    alt="intro work"
                    width={introData.introWork.width}
                    height={introData.introWork.height}
                  />
                  <div className="thumbnail-tags">
                    {introData.introWork.tags.map((tag, i) => {
                      return (
                        <a key={i} className="design-effect" href={tag.link}>
                          {tag.title}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="thumbnail-body">
                  <div className="thumbnail-title h5">
                    <a href="#">iStep Co.</a>
                  </div>
                  <div className="thumbnail-text">
                    A UX design project I have recently worked on.
                  </div>
                </div>
              </div>
            </div>
            {/* Social-media-section */}
            <div className="intro-social-container text-md-left !justify-center md-custom:!justify-start xl-1200:!pb-[5rem] 2xl-1600:!pb-[7rem] lg-992:!justify-center">
              <div className="intro-social h5">
                <a
                  className="intro-social-link"
                  href="https://www.instagram.com/"
                >
                  Instagram
                </a>
                <a
                  className="intro-social-link"
                  href="https://www.pinterest.com/"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>
          <div className="intro-bg-text">Boooo</div>
        </div>
        {isClient &&
          createPortal(
            <div
              onClick={() => setIsModalOpen(false)}
              className={clsx("modal", isModalOpen && "active")}
            >
              <div
                className={clsx("modalContent", isModalOpen && "active")}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-w-[855px]">
                  <div className="video-wrapper">
                    <iframe
                      className="w-full"
                      width="560"
                      height="315"
                      src={introData.videoLink}
                      allowFullScreen={false}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </section>
    </>
  );
};

export default Intro;
