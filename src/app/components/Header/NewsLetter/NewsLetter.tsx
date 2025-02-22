import React from "react";
import { Message } from "../../Message";

import { RiLoader4Fill } from "react-icons/ri";
import { CgCheck } from "react-icons/cg";
import { useEmailForm } from "@/app/lib/useEmailForm";

interface NewsLetterProps {
  openNewsPopover: boolean;
  newsRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

const NewsLetter: React.FC<NewsLetterProps> = ({
  openNewsPopover,
  newsRef,
  className
}) => {
  const {
    emailError,
    handleEmailChange,
    handleSubmit,
    isPending,
    isSubmitted,
    email
  } = useEmailForm();

  return (
    <div
      id="news"
      ref={newsRef}
      className={`lg:top-0 lg:left-20 flex flex-col justify-center items-center  lg:items-start lg:h-[308px] lg:w-[700px] w-[688px] sm:px-24 py-4 transition-all duration-300  bg-white bg-opacity-45 lg:bg-cream drop-shadow-lg lg:drop-shadow-none z-100 ${
        openNewsPopover ? "translate-y-0" : " -translate-y-[200%]"
      } ${className}`}
    >
      <div className="navbar-contact-title h4">Join My Newsletter</div>
      <form
        onSubmit={handleSubmit}
        className="rd-form-inline rd-mailform rd-form w-[510px]"
        data-form-output="newsletter-navbar"
        data-form-type="subscribe"
        method="post"
        noValidate
      >
        <div className="form-group flex">
          <input
            className="form-control form-control-sm form-control-has-validation form-control-last-child mb-2"
            type="email"
            name="email"
            placeholder="E-mail"
            data-constraints="@Email @Required"
            id="regula-generated-984968"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="form-validation">{emailError}</span>
        </div>
        <button
          className="btn btn-sm btn-primary !bg-orange before:!bg-[#111235] h-[3.5rem]"
          type="submit"
        >
          Subscribe
        </button>
      </form>
      <div
        className="form-output snackbar snackbar-primary"
        id="newsletter-navbar"
      ></div>

      <Message
        Icon={<RiLoader4Fill size={25} className="animate-spin" />}
        className="bottom-4 left-9"
        isShow={isPending}
        message={"Pending"}
      />
      <Message
        Icon={<CgCheck size={25} className="font-bold" />}
        className="bottom-4 left-9"
        isShow={isSubmitted}
        message={"Successfully sent!"}
      />
    </div>
  );
};

export default NewsLetter;
