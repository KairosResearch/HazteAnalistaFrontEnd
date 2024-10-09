"use client";
//Imports for the component.
//React
import React from "react";
import { usePrivy } from "@privy-io/react-auth";
//Ui needed
import { Button } from "@/components/ui/button";
//Hooks
import { useAuthLoadingStatus } from "@/hooks/useLoading";
//components
import Loading from "../shared/Loading";

const PrivyBox = () => {
  const { login } = usePrivy();
  const { isLoading } = useAuthLoadingStatus();
  return (
    <>
    <div className="w-full lg:w-[60%] mt-5 mx-auto">
      <Button onClick={login} className="w-full">
          Entra
        </Button>

    </div>
      
      {isLoading && <Loading />}
    </>
  );
};

export default PrivyBox;
