import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { usePrivy } from "@privy-io/react-auth";
import { useLogout } from "@privy-io/react-auth";

import { useRouter } from "next/navigation";

import SearcherResults from "./SearcherResults";
import LinkAccounts from "./LinkAccounts";
import { deleteCookieUserId } from "@/utils/auth/cookies";

interface PopoverFormProps {
  usage: "searcher" | "userinfo";
}

const PopoverForm = ({ usage }: PopoverFormProps) => {
  const router = useRouter();
  const { user, logout } = usePrivy();
//   const [logoutSuccess, setLogoutSuccess] = React.useState(false);
  const wallet = user?.wallet?.address || user?.email?.address;
  const name = user?.wallet?.address 
  || user?.google?.email 
  || user?.email?.address 
  || user?.twitter?.username
  || user?.github?.username
  || user?.linkedin?.name
  || user?.discord?.username;

    const onLogout = async () => {    
        const a = await deleteCookieUserId();
        if(a){
            await logout();
            router.push("/");
        } 
    }


//   useEffect(() => {
//     if (logoutSuccess) {
//       const deleteCookie = async () => {
//         const success = await deleteCookieUserId();
//         if (success === true) {
//           router.push("/");
//         }
//       };
//       deleteCookie();
//     }
//   }, [logoutSuccess, router]);

//   const { logout } = useLogout({
//     onSuccess: () => {
//       setLogoutSuccess(true);
//     },
//   });

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="px-3 py-2">
        {usage === "userinfo" && (
          <div>
            <div className="flex flex-col justify-center gap-3">
              <div className="flex gap-1">
                <h2>Hola, </h2>
                {wallet ? (
                  <h2>
                    {wallet?.length ?? 0 > 10
                      ? `${wallet?.substring(0, 5)}...${wallet?.substring(wallet?.length - 3)}`
                      : wallet}
                  </h2>
                ) : (
                  <h2>{name}</h2>
                )}
              </div>

              {/* <LinkAccounts /> */}
              <p>Bienvenido a tu plataforma de mundo crypto!</p>
              <div className="flex justify-center mt-1 ">
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="w-2/5 "
                  onClick={onLogout}
                >
                  Cerrar sesion
                </Button>
              </div>
            </div>
          </div>
        )}

        {usage === "searcher" && <SearcherResults />}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverForm;
