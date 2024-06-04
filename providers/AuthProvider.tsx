'use client';

import { PrivyProvider } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { handleLogin } from '@/actions/login';
import { handleRegister } from "@/actions/register";

function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      onSuccess={
        (user, isNewUser) => {
          console.log("User logged in", user);
          console.log("Is new user?", isNewUser);
          const id = user?.id;
          const name = user?.wallet?.address 
            || user?.google?.email 
            || user?.email?.address 
            || user?.twitter?.username
            || user?.github?.username
            || user?.linkedin?.name
            || user?.discord?.username;

          
          const foo = async () => {
            try {
              if(isNewUser){
                const data = await handleRegister(id, name);
                if(data === true){
                  router.push('/dashboard')
                } else {
                  alert('Error: ' + data)
                }
  
              } 
              //If user is not a new user:
              else {
                const data = await handleLogin(id, name);
                if(data){
                  router.push('/dashboard')
                } else {
                  console.log('error al loguear usuario')
                }
              }   
            } catch (error) {
                alert('Error al logear al usuario')
            }
            //If user is a new user (to register in db):
          }
          foo();
        }

      }
    >
      {children}
    </PrivyProvider>
  );
}

export default PrivyProviderWrapper;