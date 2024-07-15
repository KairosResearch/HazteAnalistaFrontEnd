"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import {useAuthLoadingStatus} from "@/hooks/useLoading";
import Loading from "../shared/Loading";

const PrivyBox = () => {
  const { login } = usePrivy();
  const { isLoading } = useAuthLoadingStatus();
  return (
    <>
       <Button onClick={login} className="w-full mt-5 mx-auto">
        Entra
      </Button>
      {
        isLoading && <Loading />
      }
    </>
   
  );
};

export default PrivyBox;
