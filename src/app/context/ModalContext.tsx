"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  id?: number;
  openExplore: (id: number) => void;
  closeExplore: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [id, setId] = useState<number>();

  const openExplore = (id: number) => {
    setId(id);
  };
  const closeExplore = () => setId(undefined);

  return (
    <ModalContext.Provider
      value={{
        id,
        openExplore,
        closeExplore
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
