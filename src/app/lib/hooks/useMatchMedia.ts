import { useState, useLayoutEffect } from "react";

const queries = [
  "(max-width: 576px)",
  "(min-width: 577px) and (max-width: 767px)",
  "(min-width: 768px) and (max-width: 992px)",
  "(min-width: 993px)",
  "(min-width: 1600px)"
];

export const useMatchMedia = (): { [key: string]: boolean } => {
  const [values, setValues] = useState<boolean[]>([]);

  useLayoutEffect(() => {
    if (typeof window === undefined) return;
    const mediaQueryLists = queries.map((query) => matchMedia(query));
    const getValues = () => mediaQueryLists.map((mql) => mql.matches);
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));
    setValues(getValues());

    return () =>
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handler)
      );
  }, []);

  return [
    "isMobile576",
    "isMobile768",
    "isTablet",
    "isDesktop",
    "isDesktop1600"
  ].reduce(
    (acc, scr, i) => ({
      ...acc,
      [scr]: values[i]
    }),
    {}
  );
};
