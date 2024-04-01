import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const Login = () => {
  return (

        <div className="bg-[#2c2c2c] p-10 rounded-lg shadow-md w-full">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10 text-center">Registro</h2>
            <form>
                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label> */}
                    <Input className=" bg-grey-light text-[#2c2c2c]  shadow appearance-none border rounded md:w-4/5 md:mx-auto py-2 px-3 
                        leading-tight focus:outline-none focus:shadow-outline" 
                        type="email"
                        name="email" 
                        placeholder='Email'
                    />
                </div>
                <div className="mb-8">
                <Input 
                    placeholder='Crear usuario'
                    className="shadow appearance-none border rounded md:w-4/5 md:mx-auto py-2 px-3 text-[#2c2c2c] mb-3 leading-tight 
                    focus:outline-none focus:shadow-outline bg-grey-light" 
                    type="text" 
                    name="username" />
                </div>
                <div className="mb-8">
                <Input 
                    placeholder='Crear contraseña'
                    className="shadow appearance-none border rounded md:w-4/5 md:mx-auto py-2 px-3 text-[#2c2c2c] mb-3 leading-tight 
                    focus:outline-none focus:shadow-outline bg-grey-light" 
                    type="password" 
                    name="createPassword" />
                </div>
                <div className="mb-8">
                <Input 
                    placeholder='Confirmar contraseña'
                    className="shadow appearance-none border rounded md:w-4/5 md:mx-auto py-2 px-3 text-[#2c2c2c] mb-3 leading-tight 
                    focus:outline-none focus:shadow-outline bg-grey-light" 
                    type="password" 
                    name="confirmPassword" />
                </div>
                
                
                <div className="flex items-center justify-center">
                    <Button className="bg-green-dark hover:bg-inherit text-white py-2 px-8 md:py-6 md:px-9 rounded focus:outline-none focus:shadow-outline md:text-xl" type="submit">
                       Registrarme
                    </Button>
                </div>
               
                    
                
            </form>
        </div>
    
  );
}

export default Login;