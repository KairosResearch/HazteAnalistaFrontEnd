'use client';
import React from 'react'
import Lessons from '@/components/shared/Lessons';
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


const HomePage = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  

  return (
    <div className='px-4'>
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
      
      <Lessons />

      {/* <section className="seguimiento">
        <h1
          className='text-2xl font-bold'
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

      </section> */}
      
    </div>
  )
}

export default HomePage