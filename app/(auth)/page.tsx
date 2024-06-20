import React from 'react';
import PrivyBox from '@/components/shared/PrivyBox';
import Link from 'next/link';


const Login = () => {



  // useEffect(() => {
  //   if (user) {
  //     const id = user?.id;
  //     const name = user?.wallet?.address 
  //       || user?.google?.name 
  //       || user?.email?.address 
  //       || user?.twitter?.name
  //       || user?.github?.name
  //       || user?.linkedin?.name
  //       || user?.discord?.username;

  //     const foo = async () => {
  //       console.log
  //       const data = await handleLogin(id, name);
  //       console.log('Data del login:  ' , data)
  //       if(data === false){
  //         console.log('Error al logear al usuario')
  //         logout();
  //       }
  //       else{
  //         router.push('/dashboard')
  //       }
  //     }
  //     foo();
  //   }
  // }, [user, logout]);


  // useEffect(() => {
  //   handleLogin(user);
  // }, [user])

  // const handleLoginSubmit = async () => {
  //     login();
  //     router.push('/dashboard')
  // }


  return (

        <div className="bg-[#2c2c2c] p-2 py-5 lg:p-10 rounded-lg shadow-md w-full">

            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10 text-center">Bienvenido al Proyecto Dragon de Kairosresearch</h2>
            <p>En este momento estamos trabajando en el mantenimiento de la pagina... Pronto podrás volver a acceder!</p>

            <Link
              href="https://www.kairosresearch.xyz/"
              className='underline text-white mt-5 text-center'
            >
              KAIROS RESEARCH
            </Link>
            
            {/* <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-10 text-center">Iniciar Sesión</h2>
            <div className=''> 
              <p className="text-center text-white">Bienvenido de nuevo a Kairos Research</p>
              <p className="text-center text-white">Inicia sesión para continuar</p>

            </div>

            <PrivyBox /> */}

            
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