"use client";
//Imports for the component.
//React
import React from "react";
import { useLinkAccount } from "@privy-io/react-auth";
//ui neded
// import { Button } from '../ui/button';



const LinkAccounts = () => {
  const { linkEmail, linkWallet, linkDiscord, linkGithub, linkGoogle } =
    useLinkAccount({
      onSuccess: (linkMethod, linkedAccount) => {
        console.log(
          "Se linkeo una cuenta:",
          linkedAccount,
          "con el metodo:",
          linkMethod,
        );
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return (
    <div>
      <div className="grid gap-2 ">
        <div className="space-y-2 ">
          <h2 className="font-bold">Linkear cuenta</h2>
        </div>
        <div className="space-y-2 ">
          <div
            className="cursor-pointer pl-4 p-0 hover:bg-primary/30 rounded-md"
            onClick={linkGoogle}
          >
            Cuenta de Google
          </div>
        </div>
        <div className="space-y-2 ">
          <div
            className="cursor-pointer pl-4 p-0 hover:bg-primary/30 rounded-md"
            onClick={linkEmail}
          >
            Cuenta de Email {" (no google)"}
          </div>
        </div>
        <div className="space-y-2 ">
          <div
            className="cursor-pointer pl-4 p-0 hover:bg-primary/30 rounded-md"
            onClick={linkWallet}
          >
            Dirección de wallet
          </div>
        </div>
        <div className="space-y-2 ">
          <div
            className="cursor-pointer pl-4 p-0 hover:bg-primary/30 rounded-md"
            onClick={linkDiscord}
          >
            Cuenta de Discord
          </div>
        </div>
        <div className="space-y-2 ">
          <div
            className="cursor-pointer pl-4 p-0 hover:bg-primary/30 rounded-md"
            onClick={linkGithub}
          >
            Cuenta de Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkAccounts;
