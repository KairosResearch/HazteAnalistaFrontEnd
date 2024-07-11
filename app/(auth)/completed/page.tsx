"use client";

import { useEffect } from "react";
import React from "react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

const CompletedRegistration = () => {
  const router = useRouter();
  const { logout } = usePrivy();
  useEffect(() => {
    logout();
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [logout, router]);

  return (
    <div className="bg-[#2c2c2c] p-10 rounded-lg shadow-md flex flex-col flex-center w-120">
      <p className="text-xl md:text-2xl xl:text-3xl font-bold text-center text-green-dark">
        Hubieron problemas!
      </p>
      <p className="text-center  text-white mt-5">
        Este usuario ya existía en nuestra base de datos
      </p>
      <div className="flex justify-center">
        Intenta entrar con otra direccion de correo o de usuario
      </div>

      <div>Redirigiendo....</div>
    </div>
  );
};

export default CompletedRegistration;
