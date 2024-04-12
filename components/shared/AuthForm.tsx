"use client"
import React, {useState} from "react"
import { useRouter } from "next/navigation"


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
    passowrd: "",
    newPassword: "",
    rememberMe: false
    
  };
//Debounce
import { debounce } from "@/lib/utils"
//Redirect
import { redirect } from "next/navigation"
import { postLogin } from "@/services/backend/login"
import { postRegister } from "@/services/backend/register"
export const authFormSchema = z.object({
    name: z.string({ required_error: "El campo 'Nombre' no puede estar vacío." }),
    email: z.string({ required_error: "El campo 'email' no puede estar vacío." }),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .refine(password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password), {
            message: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.",
        }),
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
    //Router
    const router = useRouter()
    const [disabled, setDisabled] = useState(false)
    const initialValues = defaultValues;

    //Defining the form
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: initialValues
    })
      // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof authFormSchema>) {
        setDisabled(true)
        if (type === 'login') {
            console.log('User loggeado: ', {values})
            try {
                const response = await postLogin(values)
                
                console.log('Token: ', {response})
                
                router.push('/dashboard')
                
            } catch (err){
                console.error(err)
            }
        } else {
            console.log('User registrado: ', {values})
            try {
                const response = await postRegister(values)
                const {access_token} = response;
                console.log('Token: ', {access_token})
                
                redirect('/dashboard')
                
            } catch (err){
                console.error(err)
            }
        }
            
        setDisabled(false)
        
    }
  
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} action="">
            <div className="w-4/5 mx-auto flex-row items-center justify-center">
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
                                        <Input {...field} type="email" />
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
                                        <Input {...field} type="password" />
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
                                        <Input {...field} type="password" />
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