import clsx from "clsx";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface ArrayResource {
  name: string;
  path: string;
}

interface ResponiveNavProps {
  openMenu: boolean;
  navItems: ArrayResource[];
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  navRef: React.RefObject<HTMLDivElement>;
  currentSection: string;
  className?: string;
}

const ResponsiveNav: React.FC<ResponiveNavProps> = ({
  openMenu,
  navItems,
  setOpenMenu,
  navRef,
  currentSection,
}) => {
  return (
    <div
      ref={navRef}
      className={`fixed top-[3.9rem] left-0 h-full w-[20rem] bg-offWhite z-40 transform transition-transform  duration-300 xl-1200:hidden mt-0.5 ${
        openMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="flex flex-col list-none gap-6 px-[1.9rem] py-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              onClick={() => setOpenMenu(false)} // Close the menu when an item is clicked
              className={clsx(
                "relative text-2xl text-black hover:text-orange w-fit block",
                item.path === currentSection && "text-orange"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsiveNav;
