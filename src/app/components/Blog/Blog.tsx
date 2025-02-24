"use client";
import React from "react";
import "aos/dist/aos.css";
import "animate.css";
import AOS from "aos";
import { useEffect } from "react";
import blogPosts from "@/app/data/blog-section.json";
import clsx from "clsx";

const Blog = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <section className="section section-md bg-right" id="blog">
      <div className="bg-item-1 overflow-hidden hidden md:flex">
        <img
          className="h-full"
          src="images/bg-pattern-1.jpg"
          alt="background"
        />
      </div>
      <div className="bg-item-2 bg-secondary"></div>
      <div className="container">
        <h2
          className="text-decoration text-center text-sm-left animated fadeIn mobile:text-start"
          data-aos="fade-in"
          data-aos-anchor-placement="bottom-bottom"
          data-animate=""
        >
          My Blog
        </h2>

        <div className="post-container">
          {blogPosts.map((post, i) => (
            <div
              key={post.title + i}
              className="post post-side "
              data-aos={clsx(i % 2 === 0 ? "fade-left" : "fade-right")}
              data-aos-anchor-placement="top-bottom"
              data-aos-offset="220"
              data-animate=""
            >
              <a className="post-media" href={post.link}>
                <img
                  className="post-img"
                  src={post.img}
                  alt={post.title}
                  width="287"
                  height="239"
                />
              </a>
              <div className="post-body">
                <div className="post-meta">
                  <div className="post-meta-item">
                    <div className="post-date h5">April 25, 2020</div>
                  </div>
                </div>
                <div className="post-title h4">
                  <a href={post.link}>{post.title}</a>
                </div>
                <div className="post-text">{post.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
