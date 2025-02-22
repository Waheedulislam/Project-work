import { RefObject, useEffect, useState } from "react";

type TypeOut = {
  isShow: boolean;
  handleShow: () => void;
};

export const useOutside = (
  initialIsVisible: boolean,
  targets: RefObject<HTMLElement>[],
  controllers: RefObject<HTMLElement>[]
): TypeOut => {
  const [isShow, setIsShow] = useState(initialIsVisible);

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const isClickOutsideTargets = targets.every(
      (ref) => ref.current && !ref.current.contains(event.target as Node)
    );

    const isClickOutsideControllers = controllers.every(
      (ref) => ref.current && !ref.current.contains(event.target as Node)
    );

    if (isClickOutsideTargets && isClickOutsideControllers) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [targets, controllers]);

  return { isShow, handleShow };
};
