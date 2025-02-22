"use client";
import React from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import blurbData from "@/app/data/blurb-section.json";

const Blurb = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <section className="section bg-800 context-dark text-center">
        <div className="row-bordered">
          <div className="row no-gutters  ">
            {blurbData.map((blurb, i) => {
              return (
                <div key={i} className="col-sm-4">
                  <article
                    className="blurb animated fadeIn"
                    data-aos="fade-in"
                    data-animate=""
                    data-aos-delay={i * 150}
                  >
                    <div className="icon blurb-icon thin-icon-satelite flex justify-center items-center">
                      <span className="blurb-item-icon font-[1000] pl-3">
                        {blurb.content}
                      </span>
                    </div>
                    <div className="blurb-title h4">{blurb.title}</div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blurb;
