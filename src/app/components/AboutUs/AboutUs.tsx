"use client";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import about from "@/app/data/about-section.json";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      once: true
    });
  }, []);

  return (
    <section
      className="section section-md bg-left-1 text-center mobile:text-start text-sm-left relative"
      id="about-me"
    >
      <div className="bg-item overflow-hidden hidden md:flex relative">
        <img
          src="images/bg-pattern-1.jpg"
          data-aos="fade-right"
          data-aos-anchor-placement="center-bottom"
          alt=""
          className="relative z-0 w-[600px]"
        />
      </div>

      <div className="container relative sm:text-start">
        <div className="row row-30">
          <div className="col-sm-6 p-5">
            <div
              className=""
              data-animate=""
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
            >
              <div className="relative inline-block">
                <div className="absolute z-0  top-[-8%] left-[-8%] mobile:top-[-1.5rem] mobile:left-[-1.5rem] xl-1200:-top-24 xl-1200:-left-24 w-[200px] h-[200px] bg-[#FDF7F1]"></div>
                <img
                  className="image overflow-hidden relative mobile:p-0 w-[310px] mobile:w-auto"
                  src={about.img}
                  alt="author"
                  width="424"
                  height="491"
                />
              </div>
            </div>
          </div>
          <div
            className="col-sm-6"
            data-aos="fade-in"
            data-aos-anchor-placement="center-bottom"
            data-animate=""
          >
            <h2 className="text-decoration">About me</h2>
            <h5>{about.title}</h5>
            <h5>{about.description}</h5>
            <div className="btn-group-1">
              <a className="btn" href={about.sendMessageLink}>
                Send message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
