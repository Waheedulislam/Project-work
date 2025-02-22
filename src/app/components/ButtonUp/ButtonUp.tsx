import clsx from "clsx";
import { IoIosArrowUp } from "react-icons/io";

interface ButtonUpProps {
  className?: string;
  isShow?: boolean;
}

export const ButtonUp = ({ className, isShow }: ButtonUpProps) => {
  return (
    <a href="#" className={clsx("to-top", isShow && "show", className)}>
      <IoIosArrowUp size={20} />
    </a>
  );
};
