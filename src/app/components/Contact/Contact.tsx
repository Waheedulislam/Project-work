"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { Message } from "../Message";
import { RiLoader4Fill } from "react-icons/ri";
import { CgCheck } from "react-icons/cg";
import { type FormData } from "@/app/lib/api/api-types";
import { apiHandler } from "@/app/lib/api";

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone: string): boolean => {
    const re = /^[0-9]+$/;
    return re.test(String(phone));
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value === "" ? "This field is required" : "";
      case "email":
        if (value === "") return "This field is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        return "";
      case "phone":
        if (value === "") return "This field is required";
        if (!validatePhone(value)) return "Only numbers are required";
        return "";
      case "message":
        return value === "" ? "This field is required" : "";
      default:
        return "";
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: FormErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    newErrors.name = validateField("name", data.name);
    newErrors.email = validateField("email", data.email);
    newErrors.phone = validateField("phone", data.phone);
    newErrors.message = validateField("message", data.message);

    setErrors(newErrors);

    if (
      newErrors.name === "" &&
      newErrors.email === "" &&
      newErrors.phone === "" &&
      newErrors.message === ""
    ) {
      setIsSubmitting(true);
      setIsPending(true);

      try {
        const response = await apiHandler.sendMessage(data);
        if (response && response.ok) {
          setIsSubmitting(false);
          setIsPending(false);
          setIsSubmitted(true);
          setData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });

          setTimeout(() => {
            setIsSubmitted(false);
          }, 3000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        setIsSubmitting(false);
        setIsPending(false);
        console.error("Error sending form data:", error);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    setIsSubmitted(false);
  };

  return (
    <section className="section section-md bg-100 bg-overlay" id="contact">
      <div className="bg-overlay-item bg-secondary"></div>
      <div className="container">
        <div className="row row-20">
          <div
            className="col-sm-6 animated fadeIn"
            data-aos="fade-in"
            data-aos-anchor-placement="center-bottom"
            data-animate=""
          >
            <h2 className="text-decoration">Get in Touch</h2>
          </div>
          <div
            className="col-sm-6 animated fadeIn"
            data-aos="fade-in"
            data-aos-anchor-placement="center-bottom"
            data-animate=""
          >
            <h5 className="text-dark">
              Feel free to contact me to discuss your next design or branding
              project. I’m open to everything!
            </h5>
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="rd-form rd-form-boxed rd-mailform"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="10000"
          data-aos-offset="200"
          data-form-output="contact-form"
          data-form-type="contact"
          method="post"
          action="components/rd-mailform/rd-mailform.php"
          data-animate=""
        >
          <div className="row row-gutters-20 row-20 row-xxl-40 align-items-center">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label" htmlFor="form-name">
                  Your name
                </label>
                <div className="form-control-wrap">
                  <input
                    className="form-control form-control-has-validation form-control-last-child"
                    id="form-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    data-constraints="@Required"
                    value={data.name}
                    onChange={handleChange}
                  />
                  <span className="form-validation text-sm absolute top-0 right-4 text-red-500">
                    {errors.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label" htmlFor="form-email">
                  Your E-mail
                </label>
                <div className="form-control-wrap">
                  <input
                    className="form-control form-control-has-validation form-control-last-child"
                    id="form-email"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    data-constraints="@Email @Required"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <span className="form-validation text-sm absolute top-0 right-4 text-red-500">
                    {errors.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group relative">
                <label className="form-label" htmlFor="form-phone">
                  Your Phone
                </label>
                <div className="form-control-wrap">
                  <input
                    className="form-control form-control-has-validation form-control-last-child"
                    id="form-phone"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    data-constraints="@Numeric @Required"
                    value={data.phone}
                    onChange={handleChange}
                  />
                  <span className="form-validation text-sm absolute top-0 right-4 text-red-500">
                    {errors.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label className="form-label" htmlFor="form-Message">
                  Your Message
                </label>
                <div className="form-control-wrap">
                  <textarea
                    className="form-control form-control-has-validation form-control-last-child"
                    id="form-Message"
                    name="message"
                    placeholder="Message"
                    data-constraints="@Required"
                    value={data.message}
                    onChange={handleChange}
                  ></textarea>
                  <span className="form-validation absolute text-sm top-0 right-4 text-red-500">
                    {errors.message}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="rd-form-btn text-left">
            <button className="btn" type="submit" disabled={isSubmitting}>
              Send Message
            </button>
          </div>
        </form>

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
        <div
          className="form-output snackbar snackbar-primary"
          id="contact-form"
        ></div>
      </div>
    </section>
  );
};

export default Contact;
