"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ConfirmEmail = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#2c2c2c] p-10 rounded-lg shadow-md flex flex-col flex-center w-120">
      <p className="text-xl md:text-2xl xl:text-3xl font-bold mb-10 text-center text-green-dark">
        Ya casi terminamos
      </p>
      <p className="text-center text-white text-lg md:text-xl xl:text-2xl">
        Confirma tu correo!
      </p>
      {showButton && (
        <Link
          href="/completed"
          className="mt-4 bg-green-dark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirmado!
        </Link>
      )}
    </div>
  );
};

export default ConfirmEmail;
