"use client";
import { useOutside } from "@/app/lib/hooks/useOutside";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import navItems from "../../data/header-nav-items.json";
import { ButtonUp } from "../ButtonUp/ButtonUp";
import NewsLetter from "./NewsLetter/NewsLetter";
import { NewsLetterFull } from "./NewsLetter/NewsLetterFull";
import ResponsiveNav from "./ResponsiveNav";
import messenger from "@/app/data/messenger.json";

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const newLetterRef = useRef<HTMLDivElement>(null);
  const newLetterFullRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRefDots = useRef<HTMLButtonElement>(null);
  const buttonNavRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState("");

  const { isShow, handleShow: handleNewPopover } = useOutside(
    false,
    [buttonRef, buttonRefDots],
    [newLetterRef, newLetterFullRef]
  );
  const { isShow: isNavShow, handleShow: handleNavOpen } = useOutside(
    false,
    [buttonNavRef],
    [navRef]
  );

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = navItems.map((item) =>
        document.querySelector(item.path)
      );

      sections.forEach((section, index) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (
            scrollPosition >= sectionTop - 25 &&
            scrollPosition < sectionTop + sectionHeight - 25
          ) {
            setActiveSection(navItems[index].path);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSetSticky = () => {
    const scrolled = window.scrollY > 60;
    setIsSticky(scrolled);
    if (scrolled) {
      sessionStorage.setItem("scrolled", "true");
    } else {
      sessionStorage.removeItem("scrolled");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("scrolled") && !isSticky) {
      setIsSticky(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleSetSticky);
    return () => {
      document.removeEventListener("scroll", handleSetSticky);
    };
  }, []);

  return (
    <>
      <header
        className={clsx(
          "flex justify-between items-stretch transition-all duration-300 bg-white shadow-none xl-1200:bg-offWhite",
          isSticky
            ? "h-15 !bg-white xl-1200:h-[3.3rem] xl-1200:shadow-lg"
            : "h-15 bg-offWhite xl-1200:h-[9rem]",
          "fixed top-0 left-0 right-0 z-50"
        )}
      >
        <NewsLetterFull
          className={"xl-1200:hidden"}
          isShow={isShow}
          newsRef={newLetterFullRef}
        />

        <div className="hidden xl-1200:block relative navbar-cell min-w-[6%]">
          <div
            className={clsx(
              "absolute top-0 left-0 w-full z-50 flex transition-all duration-300",
              isSticky ? "h-full" : "h-[308px]"
            )}
          >
            <div className="flex w-[7.2rem]">
              <button
                ref={buttonRef}
                className="newsLetterButton hover:[&_span]:opacity-60 z-50"
                onClick={handleNewPopover}
              >
                <span className={clsx(isShow && "active")}></span>
              </button>
              <NewsLetter
                openNewsPopover={isShow}
                newsRef={newLetterRef}
                className={
                  isSticky ? "mt-[3.3rem] fixed !left-0" : "fixed block"
                }
              />
            </div>
          </div>
        </div>

        <div
          className={`lg:static flex justify-between navbar-cell !py-[.7rem] px-6 z-10 items-center w-[1300px] ${
            isSticky ? "shadow-lg" : "shadow-lg xl-1200:!shadow-none"
          }`}
        >
          <button ref={buttonNavRef} className="xl-1200:hidden flex">
            <IoMdMenu
              size={40}
              className={`cursor-pointer hover:text-orange duration-200 transition-colors ${openMenu ? "text-orange" : "text-black"}`}
              onClick={handleNavOpen}
            />
          </button>
          <div className="flex items-center justify-center gap-8 !pl-0 2xl-1600:pl-20 z-10 grow xl-1200:grow-0">
            <Link href={"#"}>
              <img src="/logo.png" alt="logo" width={110} height={110} />
            </Link>
          </div>

          <div className="flex items-center py-2">
            <ul className="hidden xl-1200:flex pr-3 list-none gap-8 2xl-1600:gap-[4.4rem] pt-2">
              {navItems.map((item) => {
                return (
                  <li key={item.name} className="flex items-center gap-10">
                    <Link
                      href={item.path}
                      className={clsx(
                        "relative text-xl text-black w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-orange after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left",
                        item.path === activeSection && "after:scale-x-100"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="xl-1200:hidden flex items-center gap-5">
            <button ref={buttonRefDots}>
              <BsThreeDotsVertical
                size={15}
                className="cursor-pointer"
                onClick={handleNewPopover}
              />
            </button>
            <a href={messenger.link}>
              <FaFacebookMessenger
                size={15}
                className="text-orange hover:text-cream cursor-pointer transition-all duration-500"
              />
            </a>
          </div>
          <ResponsiveNav
            currentSection={activeSection}
            openMenu={isNavShow}
            setOpenMenu={setOpenMenu}
            navItems={navItems}
            navRef={navRef}
          />
        </div>
        <div className="hidden w-[5%] xl-1200:flex items-center">
          <a href={messenger.link}>
            <FaFacebookMessenger
              size={30}
              className="text-orange hover:text-cream cursor-pointer transition-all duration-300 navbar-cell"
            />
          </a>
        </div>
      </header>
      <ButtonUp
        isShow={!!(activeSection && navItems[0].path !== activeSection)}
      />
    </>
  );
};

export default Header;
