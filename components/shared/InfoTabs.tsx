import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import Image from 'next/image'


const InfoTabs = () => {
  return (
    <Tabs defaultValue="description" >
                <TabsList className='pl-0 md:pl-1'>
                  <TabsTrigger 
                    className='pl-0'
                    value="description">Descripcion</TabsTrigger>
                  <TabsTrigger value="links">Links</TabsTrigger>
                  <TabsTrigger value="finance">Financiamiento</TabsTrigger>
                  <TabsTrigger value="analyzis">Analisis</TabsTrigger>
                  
                </TabsList>
                <TabsContent value="description">
                  <h2 className='text-xl md:text-2xl font-bold mb-3'>Descripcion</h2>
                  <div 
                    className='border rounded-sm p-2
                     bg-primary-foreground/80 text-dark-grey
                     w-[96%] mx-auto '>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt sapiente necessitatibus reprehenderit voluptas assumenda, 
                      voluptates sequi laudantium delectus vel earum perspiciatis accusamus. Aperiam corporis eum dolorum minima nostrum, nobis architecto.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt sapiente necessitatibus reprehenderit voluptas assumenda, 
                      voluptates sequi laudantium delectus vel earum perspiciatis accusamus. Aperiam corporis eum dolorum minima nostrum, nobis architecto.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="links">
                <h2 className='text-xl md:text-2xl font-bold mb-3'>Links</h2>

                  <ul className='grid gap-3 grid-cols-4'>
                      <li>
                        Icono 1
                      </li>
                      <li>
                        Icono 2
                      </li>
                      <li>
                        Icono 3
                      </li>
                      <li>
                        Icono 1
                      </li>
                      <li>
                        Icono 2
                      </li>
                      <li>
                        Icono 3
                      </li>
                    </ul>
                  
                </TabsContent>
                <TabsContent value="finance">
                  <h2 className='text-xl md:text-2xl font-bold mb-3'>Financiamiento</h2>

                  <section>
                    <h2>Ultima ronda</h2>
                  </section>
                  <section>
                    <h2>
                      Inversionistas 
                    </h2>
                    <ul className='grid gap-3 grid-cols-4'>
                      <li>
                        Inversionista 1
                      </li>
                      <li>
                        Inversionista 2
                      </li>
                      <li>
                        Inversionista 3
                      </li>
                    </ul>
                  </section>
                </TabsContent>
                <TabsContent value="analyzis">
                  <div>
                    <h2 className='text-xl md:text-2xl font-bold mb-3'>Analizis</h2>

                    <Link
                      href="https://www.kairosresearch.xyz/insights/alt-layer"
                      target="_blank"
                      className='underline w-full mx-auto'
                    >Visita nuestro analizis</Link>
                  </div>
                  <Image 
                    src={'/lesson3.webp'}
                    width={300}
                    height={200}
                    alt='Analisis'
                    className='w-4/5 mx-auto'
                  />

                  
                </TabsContent>
              </Tabs>
  )
}

export default InfoTabs