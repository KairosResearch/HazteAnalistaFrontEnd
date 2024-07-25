'use server'
import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-column h-screen justify-center items-center">
      <Loader size="200px" className="animate-spin-slow" />
    </div>
  );
};

export default Loading;
