import clsx from "clsx";
import { Message } from "../../Message";
import { RiLoader4Fill } from "react-icons/ri";
import { CgCheck } from "react-icons/cg";
import { useEmailForm } from "@/app/lib/useEmailForm";

interface NewsLetterFullProps {
  className?: string;
  isShow: boolean;
  newsRef?: React.RefObject<HTMLDivElement>;
}

export const NewsLetterFull = ({
  className,
  isShow,
  newsRef
}: NewsLetterFullProps) => {
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
      ref={newsRef}
      className={clsx(
        "newsLetterFull shadow-lg",
        isShow && "newsLetterFullActive",
        className
      )}
    >
      <div className="navbar-contact-title pt-4 h4">Join My Newsletter</div>
      <form
        onSubmit={handleSubmit}
        className="rd-form-inline rd-mailform rd-form px-5"
        noValidate
      >
        <div className="form-group flex">
          <input
            value={email}
            onChange={handleEmailChange}
            className="form-control form-control-sm form-control-has-validation form-control-last-child mobile-400:mb-2"
            type="email"
            name="email"
            placeholder="E-mail"
            data-constraints="@Email @Required"
            id="regula-generated-984968"
          />
          <span className="form-validation">{emailError}</span>
        </div>
        <button
          className="btn btn-sm btn-primary !bg-orange before:!bg-[#111235] mobile-400:h-[52px] !mb-6"
          type="submit"
        >
          Subscribe
        </button>
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
      </form>
    </div>
  );
};
