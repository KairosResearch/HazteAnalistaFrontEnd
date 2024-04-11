import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import AuthForm from '@/components/shared/AuthForm';

const Register = () => {
  return (

        <div className="bg-[#2c2c2c] p-10 rounded-lg shadow-md w-full">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10 text-center">Registro</h2>
            <AuthForm
                type='register'
            />
        </div>
    
  );
}

export default Register;