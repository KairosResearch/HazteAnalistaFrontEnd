'use client';
import React, { useEffect } from 'react';

  //import AuthForm from "@/components/shared/AuthForm"
import { useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { handleLogin } from '@/actions/login';
import { useLogin } from '@privy-io/react-auth';

const Login = () => {
  const router = useRouter();
  const {authenticated } = usePrivy();

  const {login} = useLogin({
    onComplete: () => {
  
      router.push('/dashboard')
    },
    onError: (error) => {
      console.log(error)
    }
  });



  if(authenticated){
    router.push('/dashboard')
  }


  // useEffect(() => {
  //   handleLogin(user);
  // }, [user])

  // const handleLoginSubmit = async () => {
  //     login();
  //     router.push('/dashboard')
  // }


  return (

        <div className="bg-[#2c2c2c] p-2 py-5 lg:p-10 rounded-lg shadow-md w-full">
            
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10 text-center">Login</h2>
            <div className=''> 
              <p className="text-center text-white">Bienvenido de nuevo a Kairos Research</p>
              <p className="text-center text-white">Inicia sesión para continuar</p>

            </div>

            <Button
              onClick={login}
              className='w-full mt-5 mx-auto'
            >Login</Button>
            {/**Formulario*/}
            {/* <AuthForm type='login' /> */}
            
            
            {/* <div className="text-center">
              <p className='my-5'>
                <Link href="/forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>
              <p>
                ¿No tienes cuenta?{" "}
                <Link href="/sign-up" className='underline'>
                  Registrate
                </Link>
              </p>
              
            </div> */}
            
        </div>
    
  );
}

export default Login;