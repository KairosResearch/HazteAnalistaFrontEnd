"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

const PrivyBox = () => {
  const { login } = usePrivy();
  return (
    <Button onClick={login} className="w-full mt-5 mx-auto">
      Entra
    </Button>
  );
};

export default PrivyBox;
