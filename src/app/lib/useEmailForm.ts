import { ChangeEvent, FormEvent, useState } from "react";
import { apiHandler } from "./api";

export const useEmailForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(
      validateEmail(value) ? "" : "Please enter a valid email address"
    );
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      setEmailError("This field is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    setIsPending(true);
    setEmailError("");

    try {
      const res = await apiHandler.subscribe(email);
      if (res && res.ok) {
        setIsSubmitting(false);
        setIsPending(false);
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        setIsSubmitting(false);
        setIsPending(false);
        console.error("Form submition failed");
      }
    } catch (err) {
      setIsSubmitting(false);
      setIsPending(false);
      console.error(err);
    }
  };

  return {
    handleEmailChange,
    handleSubmit,
    emailError,
    isSubmitting,
    isSubmitted,
    isPending,
    email
  };
};
