"use client";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { MainContent } from "./MainContent";
import { ModalProvider } from "@/app/context/ModalContext";
import ModalProject from "../Explore/Explore";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "../Loader/Loader";

export const AppLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaderDelay = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(loaderDelay);
  }, []);

  return (
    <ModalProvider>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-white z-[9999]"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      <Header />
      <MainContent />
      <Footer />
      <ModalProject />
    </ModalProvider>
  );
};
