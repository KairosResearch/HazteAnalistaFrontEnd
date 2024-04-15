"use client"
import React, {useEffect, useState} from "react"
import { useRouter } from "next/navigation"

//Server Actions
import { handleLogin } from "@/actions/login"
import { handleRegister } from "@/actions/register"

//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

//UI needed
import { Button } from "@/components/ui/button"
//import {Badge} from "@/components/ui/badge"
import { Input } from "../ui/input"

//Data
//Data for default values
const defaultValues = {
    name: "",
    email: "",
    password: "",
    newPassword: "",
    rememberMe: false
  };

import { useUserData } from "@/hooks/useUserData"

export const authFormSchema = z.object({
    name: z.string({ required_error: "El campo 'Nombre' no puede estar vacío." }),
    email: z.string({ required_error: "El campo 'email' no puede estar vacío." }),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .refine(password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password), {
            message: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.",
        })
        ,
    newPassword: z.string().optional(),
    rememberMe: z.boolean().optional(),
    //     .refine((newPassword: any, { password, includeNewPassword }: any) => includeNewPassword ? newPassword === password : true, {
    //         message: "Las contraseñas deben coincidir.",
    //         path: ['newPassword'],
    //     }),
    // includeNewPassword: z.boolean().optional(),
});

//Types:
interface AuthDataFormProps {
    type: "login" | "register"; 
}

//The form
const AuthForm = ({type}: AuthDataFormProps) => {
    const [error, setErrorForm] = useState('')
    //User data
    const {setUserId} = useUserData()
    //Router
    const router = useRouter()
    const [disabled, setDisabled] = useState(false);
    
    //const initialValues = defaultValues;

    //Defining the form
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: defaultValues,
    })
    const {setError, watch, clearErrors } = form;
    const password = watch('password');
    const newPassword = watch('newPassword');

    //Watchers
    useEffect(() => {
        if (type === 'register' && password !== newPassword) {
          setError('newPassword', {
            type: 'mismatch',
            message: 'Las contraseñas no coinciden',
          });
        } else {
          clearErrors('newPassword');
        }
      }, [password, newPassword, setError, clearErrors, type]);

    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof authFormSchema>) {
        setDisabled(true)
        //HandleSubmit para cuando usuario se logueará
        if (type === 'login') {
            const {rememberMe, newPassword, name, ...rest} = values;
            if (!Object.values(rest).every(value => value)) {
                setErrorForm('Todos los campos son requeridos');
            } else {
                console.log('Intento de login con: ', {values})
                try {
                    const data = await handleLogin(values)
                    console.log('Data final al recibir el formulario:', data)
                    if (!data.error){
                        setUserId(data.id)
                        router.push('/dashboard')
                    } else {
                        console.error(data.error)
                        if(data.error === 'Credenciales inválidas'){
                            setErrorForm('Credenciales inválidas')                        
                        }
                        if(data.error === 'No se pudo guardar la cookie'){
                            setErrorForm('No se pudo guardar la cookie')
                        }
                        if(data.error === 'Token invalido, no se pudo traer el user data'){
                            setErrorForm('Token invalido, no se pudo traer el user data')
                        }
                        if(data.error === 'Servidor no responde en ruta de getUser'){
                            setErrorForm('Servidor no responde en ruta de getUser')
                        }
                        if(data.error === 'Servidor no responde!'){
                            setErrorForm('Servidor no responde!')
                        }
                    
                    }
                    form.reset();
                } catch (err){
                    console.error('No se pudo llamar el handleLogin')
                }
            }
            
        } 
        //HandleSubmit para cuando usuario se registrará
        else {
            const {rememberMe, newPassword, ...rest} = values;
            if (!Object.values(rest).every(value  => value)) {
                setErrorForm('Todos los campos son requeridos');
            } else {
                console.log('User registrado: ', {rest})
                try {
                    await handleRegister(rest)
                    router.push('/completed')
                    
                } catch (err){
                    console.error(err)
                }
                form.reset();
            }
            
        }
        
        setDisabled(false)
        
    }
  
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} action="">
            <div className="w-4/5 mx-auto flex-row items-center justify-center">
                {error && (
                    <div className="w-full mt-6 bg-red-200 p-2 text-center text-red-700">
                        {error}
                    </div>
                )}
                {
                    type === 'register' && (
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                            <FormItem className="w-full mt-6" >
                                <FormLabel> Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                         />
                    )
                }

                {/**Email */}
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                            <FormItem className="w-full mt-6" >
                                <FormLabel> Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            onFocus={() => setErrorForm('')}
                                            {...field} 
                                            type="email"
                                        />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                         />

                {/**Password */}
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                            <FormItem className="w-full mt-6" >
                                <FormLabel> Contraseña</FormLabel>
                                    <p className="text-xs ">
                                        La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.
                                    </p>
                                    <FormControl>
                                        <Input 
                                        {...field} 
                                        onFocus={() => setErrorForm('')}
                                        type="password" 
                                        />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                         />
                         
                
                {/**New Password */}
                {
                    type === 'register' && (
                        <FormField
                            control={form.control}
                            name='newPassword'
                            render={({ field }) => (
                            <FormItem className="w-full mt-6" >
                                <FormLabel> Repite tu contraseña</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password"  onFocus={() => setErrorForm('')}/>
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                         />
                    )
                }

                
                
               
            </div>

            {/*botones*/}
            <div className="flex justify-center mt-8">
                <Button 
                    disabled={disabled}
                    type="submit" variant='secondary' 
                    className={`w-1/5 font-bold 
                        ${!disabled ? 'bg-gray-400' : 'bg-[#2c2c2c]'}
                    `}>
                    {
                        type === 'login' ? 'Inicio' : 'Registrar'
                    }
                </Button>
            </div>
        </form>
    
    </Form>
  )
}


export default AuthForm;