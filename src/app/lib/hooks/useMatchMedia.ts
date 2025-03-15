import { useState, useLayoutEffect } from "react";

const queries = [
  "(max-width: 576px)",
  "(min-width: 577px) and (max-width: 767px)",
  "(min-width: 768px) and (max-width: 992px)",
  "(min-width: 993px)",
  "(min-width: 1600px)",
];

export const useMatchMedia = (): { [key: string]: boolean } => {
  const [values, setValues] = useState<boolean[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryLists = queries.map((query) => window.matchMedia(query));
    const getValues = () => mediaQueryLists.map((mql) => mql.matches);
    const handler = () => setValues(getValues());

    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));
    setValues(getValues());

    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handler)
      );
    };
  }, []);

  return {
    isMobile576: values[0] || false,
    isMobile768: values[1] || false,
    isTablet: values[2] || false,
    isDesktop: values[3] || false,
    isDesktop1600: values[4] || false,
  };
};
