//Imports for the component.
//React
import React from "react";

const InputSearcher = () => {
  return (
    <div className="relative md:w-auto mt-2 md:mt-0">
      <input
        type="text"
        className="block w-full bg-transparent border-b-2 focus:border-green-light border-green-dark 
               text-grey-light placeholder-grey-light transition-colors duration-200 ease-in-out p-2 "
        placeholder="Busca una lección..."
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "translateY(-50%)" }}
        className="absolute right-5 top-[50%] w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#edf4fb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
};

export default InputSearcher;
