import React from 'react';

import AuthForm from "@/components/shared/AuthForm"

const Login = () => {
    
  return (

        <div className="bg-[#2c2c2c] p-10 rounded-lg shadow-md w-full">
            
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10 text-center">Login</h2>
            <p className="text-center text-white">Bienvenido de nuevo a Kairos Research</p>
            <p className="text-center text-white">Inicia sesión para continuar</p>
            <AuthForm type='login' />
        </div>
    
  );
}

export default Login;