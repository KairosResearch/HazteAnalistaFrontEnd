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

import { tableData } from '@/lib/data';
import { Badge } from '../ui/badge';
import DialogItem from './DialogItem';
//import {useStateContext}  from '@/contexts/ContextProvider';



const Dashboard = () => {
  return (
    <Table className="border border-grey-light">
      <TableHeader className=''>
        <TableRow className='divide-x divide-y divide-grey-light bg-dark-grey'>
          <TableHead colSpan={1}>Proyecto</TableHead>
          <TableHead className="md:text-center" colSpan={9}>Protocolos</TableHead>
        </TableRow>
        <TableRow className='divide-x divide-y divide-gray-200'>
          <TableHead className=''>Proyecto</TableHead>
          <TableHead>Ticket</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Metodo 4E</TableHead>
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
          <TableRow className='divide-x-2 divide-y-2 divide-green-dark' key={data.proyectName}>
            <TableCell className="font-medium border-2 border-green-dark relative">
              <p>
                {data.proyectName}
                <DialogItem mode="edit" />
              </p>
            </TableCell>
            <TableCell>
              {data.ticket}

            </TableCell>
            <TableCell>
              <Badge 
                variant='secondary'
                color={
                (data.tipo === 'Reflexion') ? 'red' : (data.tipo === 'Narrativa') ? 'green' :  'blue'
              }>{data.tipo}
              </Badge>
              </TableCell>
            <TableCell>
              <Badge color={
                (data.theE === 'Evaluar') ? 'red' : (data.theE === 'Encontrar') ? 'green' : (data.theE === 'Estudiar') ? 'blue' : (data.theE === 'Ejecutar') ? 'yellow' : 'blue'
              }>
                {data.theE}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant='outline'
                color={
                (data.theE === 'Evaluar') ? 'red' : (data.theE === 'Encontrar') ? 'green' : (data.theE === 'Estudiar') ? 'blue' : (data.theE === 'Ejecutar') ? 'yellow' : 'blue'
              }>
              {data.decision}
              </Badge>
            </TableCell>
            <TableCell>
              {data.cap}

            </TableCell>
            <TableCell>
              <Badge 
                variant='destructive'
                color={
                (data.rango === 'Blue Chips') ? 'blue' : (data.rango === 'Mid Caps') ? 'yellow' : (data.rango === 'Large Caps') ? 'green' : 'brown'
              }>
              {data.rango}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge 
                variant='outline'
                color={
                (data.theE === 'Evaluar') ? 'red' : (data.theE === 'Encontrar') ? 'green' : (data.theE === 'Estudiar') ? 'blue' : (data.theE === 'Ejecutar') ? 'yellow' : 'blue'
              }>
              {data.sector}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge color={
                (data.theE === 'Evaluar') ? 'red' : (data.theE === 'Encontrar') ? 'green' : (data.theE === 'Estudiar') ? 'blue' : (data.theE === 'Ejecutar') ? 'yellow' : 'blue'
              }>
              {data.exchange}
              </Badge>
            </TableCell>
            <TableCell>
          
              {data.fecha}
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Dashboard