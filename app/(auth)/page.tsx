import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { getLogin } from '@/services/backend/login';

const Login = async () => {
    const login = await getLogin();
    console.log(login);
    
  return (

        <div className="bg-[#2c2c2c] p-10 rounded-lg shadow-md w-full">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10 text-center">Login</h2>
            <form>
                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label> */}
                    <Input className=" bg-grey-light text-[#2c2c2c]  shadow appearance-none border rounded w-full py-2 px-3 
                        leading-tight focus:outline-none focus:shadow-outline md:w-4/5 md:mx-auto
                        " 
                        type="email"
                        name="email" 
                        placeholder='Email'
                    />
                </div>
                <div className="mb-8">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña:
                    </label> */}
                    <Input 
                        placeholder='Contraseña'
                        className="shadow md:w-4/5 md:mx-auto appearance-none border rounded w-full py-2 px-3 text-[#2c2c2c] mb-3 leading-tight 
                        focus:outline-none focus:shadow-outline bg-grey-light" 
                        type="password" 
                        name="password" />
                </div>
                <div className="flex items-center justify-center">
                    <Link href='/dashboard'>
                        <Button className="bg-green-dark hover:bg-inherit text-white py-2 px-8 xl:py-6 md:px-9 rounded focus:outline-none focus:shadow-outline md:text-xl" type="submit">
                            Inicio    
                        </Button>
                    </Link>
                    
                </div>
                <div className="flex flex-col items-center justify-between mt-4 md:mt8 ">
                    <Link href="#" className="text-sm md:text-base text-grey-light hover:underline mb-4">
                        Olvidé mi contraseña
                    </Link>
                    <Link href="sign-up" className="text-sm md:text-base underline text-grey-light hover:underline">
                        Crear cuenta...
                    </Link>
                </div>
            </form>
        </div>
    
  );
}

export default Login;