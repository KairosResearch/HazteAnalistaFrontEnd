'use client';
import React from 'react'
//Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"





//Context (menu)
import {useStateContext}  from '@/contexts/ContextProvider';
//Data

const HomePage = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  

  return (
    <div className=''>
      {/* Hamburger de arriba para colapsar sidebar */}
      <button
        className='hidden md:block'
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <svg
          className="w-8 h-8 mt-2 ml-2"
          fill="none"
          stroke="#319383" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Seccion de lecciones*/}
      <section className='lecciones p-3' id='lecciones-main-page'>
        <div className="md:flex">
          <h1 className='text-4xl font-bold'>
            Lecciones:
          </h1>
          <div className="relative w-52">
            <input type="text" className="w-10/12 pr-2.5 input-field"/>
            <svg xmlns="http://www.w3.org/2000/svg" style={{transform: 'translateY(-50%)'}} className="absolute right-5 top-[50%] w-6 h-6" 
                viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className='md:m-60 p-12'>
        <Carousel>
          <CarouselContent>
          <CarouselItem className='md:basis-1/3'>
            <Card>
              <CardHeader>
                <img src="https://via.placeholder.com/150" alt="Card Image" />

              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              
            </Card>
          </CarouselItem>
            <CarouselItem className='md:basis-1/3'>

              <Card>
                <CardHeader>
                  <img src="https://via.placeholder.com/150" alt="Card Image" />

                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                
              </Card>
            </CarouselItem>
            
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        </div>
        

      </section>

      <section className="seguimiento">
        <h1
          className='text-4xl font-bold'
        >Dashboard de seguimiento:</h1>
        <Table>
          
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </section>
      
    </div>
  )
}

export default HomePage