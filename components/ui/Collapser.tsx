"use client";
import React from "react";
//Context (menu)
import { useStateContext } from "@/contexts/ContextProvider";

const Collapser = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  return (
    <button
      className="hidden lg:block fixed top-2 left-4 z-50 "
      onClick={() => setActiveMenu(!activeMenu)}
    >
      <svg
        className="w-8 h-8 mt-2 ml-2"
        fill="none"
        stroke="#319383"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

export default Collapser;
