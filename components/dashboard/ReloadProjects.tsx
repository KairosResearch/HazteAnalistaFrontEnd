"use client";
//Imports for the component.
//React
import React, { useState } from "react";
//Next
import Image from "next/image";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";

const ReloadProjects = () => {
  const { setUserTableData } = useUserTableData();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const handleReload = () => {
    setLoading(true);
    setCount(count + 1);
    setUserTableData(["Recargo " + count]);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <Image
      src="/restart-line.svg"
      alt="reload"
      width={30}
      height={30}
      className={`cursor-pointer  ${loading ? "animate-spin" : ""}`}
      onClick={handleReload}
    />
  );
};

export default ReloadProjects;
