'use client';
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import EditProjectItem from './EditProjectItem';
  


import { tableData } from '@/lib/data';
//import {useStateContext}  from '@/contexts/ContextProvider';



const Dashboard = () => {
  return (
    
        <Table className="divide-y divide-gray-200">
          
          <TableHeader>
            <TableRow className='divide-x divide-gray-700 '>
              <TableHead>Proyecto</TableHead>
              <TableHead>Metodo 4E</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Decisión</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Rango</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Exchange</TableHead>

              <TableHead className="text-right">Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((data) => (
                <TableRow className='divide-x divide-gray-700'key={data.proyectName}>
                    <TableCell className="font-medium relative">
                      <p>
                        {data.proyectName}
                        {/* <span onClick={() => setOpenDialog(true) } className='underline absolute right-2 bottom-2 cursor-pointer text-xs text-green-dark'
                        >Editar</span> */}
                        <EditProjectItem />
                      </p>
                    </TableCell>
                    <TableCell>{data.theE}</TableCell>
                    <TableCell>{data.tipo}</TableCell>
                    <TableCell>{data.decision}</TableCell>
                    <TableCell>{data.cap}</TableCell>
                    <TableCell>{data.rango}</TableCell>
                    <TableCell>{data.sector}</TableCell>
                    <TableCell>{data.exchange}</TableCell>
                    <TableCell className="text-right">{data.fecha}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
    
  )
}

export default Dashboard