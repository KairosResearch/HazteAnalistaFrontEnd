import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link';

const page = () => {
  const cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push(
      <Link key={i} href={`/lessons/${i}`}>
        <Card  className='relative h-full'>
        
          <CardHeader className='max-h-[20vh]'>
            <img style={{height:'20vh'}} src={'/lesson2.webp'} alt="" />
          </CardHeader>
          <CardContent>
            <p className='text-sm line-clamp-1'>
              Esta es una leccion
            </p>
            <span className='opacity-75 text-xs'>
              08-2-2024
            </span>
          </CardContent>
        </Card>
      </Link>
    );
  }
  return (
    <div className='my-10'>
      <h1 className='text-2xl px-3'>Aprende a hacer análisis </h1>
      <section className='mx-auto my-10 w-full md:w-7/12 p-8  bg-grey-light/20 rounded-sm'>
      <Card className='relative h-full '>
                        <p className='absolute top-[-10px] right-0 p-4 bg-primary' >
                          
                        </p>
                      <CardHeader className='max-h-[20vh]'>
                        
                        <img style={{height:'20vh'}} src={'/lesson3.webp'}  alt="" />
                      </CardHeader>
                      <CardContent>
                          <p className='text-sm line-clamp-1'>
                            Esta es una leccion
                          </p>
                          
                          <span className='opacity-75 text-xs'>
                            08-2-2024
                          </span>
                      </CardContent>
                    </Card>

      </section>
   
    <h1 className='text-2xl px-3'>
            Nuestros modulos de aprndizaje
          </h1>
      <section className='w-10/12 mt-10 md:w-[90%] md:grid grid-cols-3 mx-auto flex flex-col gap-6'>
      
        {
          cards
        }

      </section>
    </div>
  )
}

export default page