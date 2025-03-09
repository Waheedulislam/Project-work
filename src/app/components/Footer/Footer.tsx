"use client";
import React from "react";
import { BiLogoMessenger } from "react-icons/bi";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { useEmailForm } from "@/app/lib/useEmailForm";
import { Message } from "../Message";
import { RiLoader4Fill } from "react-icons/ri";
import { CgCheck } from "react-icons/cg";
import footer from "@/app/data/footer.json";
import messenger from "@/app/data/messenger.json";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const {
    emailError,
    handleEmailChange,
    handleSubmit,
    isPending,
    isSubmitted,
    email,
  } = useEmailForm();

  return (
    <>
      <section className="footer footer-top context-dark bg-800">
        <div className="row justify-content-center justify-content-lg-start flex justify-center lg:justify-start">
          <div className="col-sm-6 col-xxl-5">
            <div className="relative">
              <a className="absolute right-0 top-0" href={messenger.link}>
                <div className="custom-button !p-0 mobile:!p-[.13rem] 2xl-1600:!p-[1.14rem] group">
                  <BiLogoMessenger className="custom-icon m-4 text-[2.8rem] 2xl-1600:text-[5.7rem]" />
                </div>
              </a>

              <img
                className="image w-full h-full"
                src="images/image-11-787x516.jpg"
                alt="coffee"
                width="787"
                height="516"
              />
            </div>
          </div>
          <div className="col-md-10 col-lg-6 col-xl-5 col-xxl-3 offset-xxl-1">
            <div className="footer-inner">
              <div className="logo mb-6 2xl-1600:mb-10">
                <div className="relative">
                  <div className="text-white">
                    <div className=" navbar-panel">
                      <button
                        className="navbar-switch "
                        data-multi-switch=""
                      ></button>
                      <div className="navbar-logo mb-8">
                        <a className="navbar-logo-link " href="#">
                          <img
                            src={footer.logo.src}
                            alt={"logo"}
                            width="114"
                            height="33"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-row justify-end mt-1 mobile-400:flex-row"
                data-aos="fade-up"
                data-aos-duration="2500"
                data-aos-anchor-placement="bottom-bottom"
                data-form-output="newsletter-sample"
                data-form-type="subscribe"
                data-animate=""
              >
                <div className="form-group w-full flex items-center col-span-2">
                  <input
                    className="form-control form-control-sm form-control-has-validation form-control-last-child h-14 px-3 !py-[1.7rem] border"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    data-constraints="@Email @Required"
                    id="regula-generated-932748"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <span className="form-validation">{emailError}</span>
                </div>
                <button
                  className="btn-secondary font-medium !w-[9rem] mobile-425:!w-[11rem] 2xl-1600:!w-[12.5rem]  mx-auto py-[.7rem] mobile-400:mt-0 mobile-400:py-0 px-6 pr-28 !text-[1rem] lg-992:w-full "
                  type="submit"
                >
                  Subscribe
                </button>
              </form>

              <div
                className="form-output snackbar snackbar-primary"
                id="newsletter-sample"
              ></div>
              <div className="row row-20 row-content">
                <div
                  className="col-6 col-sm-4 col-xl-6 animated fadeInUp"
                  data-aos="fade-up"
                  data-aos-duration="2500"
                  data-aos-anchor-placement="bottom-bottom"
                  data-animate=""
                >
                  <h5>E-mail</h5>
                  <p>
                    <a href={`mailto:${footer.email.link}`}>
                      {footer.email.title}
                    </a>
                  </p>
                </div>
                <div
                  className="col-6 col-sm-4 col-xl-6 animated fadeInUp"
                  data-aos="fade-up"
                  data-aos-duration="2500"
                  data-aos-anchor-placement="bottom-bottom"
                  data-animate=""
                >
                  <h5>Phone</h5>
                  <p>
                    <a href={`tel:${footer.phone.link}`}>
                      {footer.phone.title}
                    </a>
                  </p>
                </div>
                <div
                  className="col-6 col-sm-4 col-xl-6 animated fadeInUp"
                  data-aos="fade-up"
                  data-aos-duration="2500"
                  data-aos-anchor-placement="bottom-bottom"
                  data-animate=""
                >
                  <h5>Address</h5>
                  <p>{footer.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer footer-bottom context-dark bg-800 py-8 2xl-1600:p-[4rem_0_7rem]">
        <div className="container">
          <div
            className="row row-20 animated fadeIn flex !items-center !transition-all !duration-300 mobile:!px-0 !px-4 xl-1200:pt-6 pb-2 xl-1200:pb-8"
            data-animate=""
          >
            <div className="col-md-7 col-xl-6  !transition-all !duration-300 p-1 mobile:!pb-5">
              <div className="group-80x15 leading-[2]">
                {footer.social.map((s, i) => (
                  <a key={i} className="image-link" href={s.link}>
                    <img
                      className="image opacity-30 hover:opacity-100 transition-all duration-300 ease-in-out "
                      src={s.img}
                      alt={s.title}
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className="col-md-5 col-xl-6 font-thin">
              <p className="rights opacity-40 text-blue-100">
                {footer.copyright}
              </p>
            </div>
          </div>
        </div>
        <Message
          Icon={<RiLoader4Fill size={25} className="animate-spin" />}
          className="bottom-8"
          isShow={isPending}
          message={"Pending"}
        />
        <Message
          Icon={<CgCheck size={25} className="font-bold" />}
          className="bottom-8"
          isShow={isSubmitted}
          message={"Successfully sent!"}
        />
      </footer>
    </>
  );
};

export default Footer;
