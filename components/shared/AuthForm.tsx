"use client"
import React, {useEffect, useState} from "react"
import { useRouter } from "next/navigation"

//Server Actions
import { handleLogin } from "@/actions/login"
import { handleRegister } from "@/actions/register"

// Utils
import {errorHandlerAuthForm, defaultValuesAuthForm} from "@/utils"

//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
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
import { Input } from "../ui/input"
import Loading from "./Loading"



import { useUserData } from "@/hooks/useUserData"

//Types:
import { AuthDataFormProps } from "@/index"

//Schema for the form
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
    
});


//The form

const AuthForm = ({type}: AuthDataFormProps) => {
    const [error, setErrorForm] = useState('')
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    //User data
    // const {setUserId} = useUserData()
    //Router
    const router = useRouter()

    //Defining the form
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: defaultValuesAuthForm,
    })

    //Validate if password fields' values are the same

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
        setLoading(true)
        //HandleSubmit para cuando usuario se logueará
        if (type === 'login') {
            const {rememberMe, newPassword, name, ...rest} = values;
            if (!Object.values(rest).every(value => value)) {
                setErrorForm('Todos los campos son requeridos');
            } else {
                console.log('Intento de login con: ', {values})
                try {
                    
                    const data = await handleLogin(values)
                    

                    if (!data.error){
                        // setUserId(data.id)
                        router.push('/dashboard')
                    } else {
                       const errMessage = errorHandlerAuthForm(data.error);
                       setErrorForm(errMessage as string);                    
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
                    const data = await handleRegister(rest)
                    console.log('Data final al recibir el formulario:', data)
                    if(data === `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`){
                        setErrorForm('Este correo ya está en uso!')
                    } else if(data === 'fetch failed'){
                        setErrorForm('Servidor no responde!')
                    } else {
                        router.push('/completed')
                    }
                } catch (err){
                    console.error(err)
                }
                form.reset();
            }
            
        }
        setLoading(false)
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
                {type === 'register' && (
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className="w-full mt-6" >
                                <FormLabel> Name</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" onFocus={() => setErrorForm('')}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

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

                {type === 'register' && (
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
                )}
            </div>

            {loading && <Loading />}

            <div className="flex justify-center mt-8">
                <Button 
                    disabled={disabled}
                    type="submit" 
                    variant='secondary' 
                    className={`w-4/5 font-bold 
                        ${!disabled ? 'bg-gray-400' : 'bg-[#2c2c2c]'}
                    `}
                >
                    {type === 'login' ? 'Inicio' : 'Registrar'}
                </Button>
            </div>
        </form>
    </Form>
)
}


export default AuthForm;